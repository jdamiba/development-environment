"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const kernelPicker_1 = require("./kernelPicker");
const constants_1 = require("../common/constants");
const resultView_1 = require("./resultView");
const cellOptions_1 = require("./cellOptions");
const server_1 = require("./server");
const helpers_1 = require("../common/helpers");
const utils_1 = require("../common/utils");
const timers_1 = require("timers");
var progressBar_1 = require("./progressBar");
exports.ProgressBar = progressBar_1.ProgressBar;
const jupyterSchema = 'jupyter-result-viewer';
const previewUri = vscode.Uri.parse(jupyterSchema + '://authority/jupyter');
class JupyterDisplay extends vscode.Disposable {
    constructor(cellCodeLenses, outputChannel) {
        super(() => { });
        this.outputChannel = outputChannel;
        this.disposables = [];
        this.server = new server_1.Server();
        this.disposables.push(this.server);
        this.disposables.push(new kernelPicker_1.KernelPicker());
        this.disposables.push(vscode.commands.registerCommand(constants_1.Commands.Jupyter.Kernel_Options, this.showKernelOptions.bind(this)));
        this.previewWindow = new resultView_1.TextDocumentContentProvider();
        this.disposables.push(vscode.workspace.registerTextDocumentContentProvider(jupyterSchema, this.previewWindow));
        this.cellOptions = new cellOptions_1.CellOptions(cellCodeLenses);
        this.disposables.push(this.cellOptions);
        this.server.on('settings.appendResults', append => {
            vscode.workspace.getConfiguration('jupyter').update('appendResults', append, true)
                .then(() => {
                this.server.sendSetting('settings.appendResults', this.appendResults);
            }, reason => {
                this.outputChannel.appendLine(utils_1.formatErrorForLogging(reason));
                vscode.window.showErrorMessage('Failed to update the setting', 'View Errors')
                    .then(item => {
                    if (item === 'View Errors') {
                        this.outputChannel.show();
                    }
                });
            });
        });
        this.server.on('connected', () => {
            this.clientConnected = true;
            this.server.sendSetting('settings.appendResults', this.appendResults);
        });
    }
    get appendResults() {
        return vscode.workspace.getConfiguration('jupyter').get('appendResults', true);
    }
    setNotebook(nb, canShutdown) {
        this.notebookUrl = (nb && nb.baseUrl) || '';
        this.canShutdown = canShutdown;
    }
    updateVariables(executor) {
        // find all variabels
        let observer = executor("%whos");
        this.server.clearBuffer();
        let reg = /([\w_]+)\s+([\w_]+)\s+(.*)/;
        observer.subscribe(result => {
            var data = [result.data];
            // parse all variables
            let variableText = result.data['text/plain'];
            let lines = variableText.split('\n').slice(2);
            let variables = lines.map(l => {
                let match = l.match(reg);
                return {
                    name: match[1],
                    type: match[2],
                    detail: match[3],
                    value: null
                };
            });
            // find all classes
            let classes = variables.filter(v => v.detail.indexOf('<class') >= 0).map(v => v.name);
            // filter out all functions, modules, class definitions and class instances
            variables = variables.filter(v => v.detail.indexOf('<class') == -1 && v.detail.indexOf('<function') && v.detail.indexOf('<module') && classes.every(c => v.detail.indexOf(c) != 0));
            // get value of all variables
            for (let variable of variables) {
                // TODO: this should probably be configurable via config variables
                let code = `
import pandas as pd
import numpy

pd.set_option('display.max_rows', 500)
numpy.set_printoptions(threshold=10000)

${variable.name}
                `;
                observer = executor(code);
                observer.subscribe(variableResult => {
                    variable.value = variableResult.data['text/plain'] || variableResult.data['text/html'];
                    this.server.sendVariable([variable]);
                });
            }
        });
    }
    showResults(results, executor) {
        return this.server.start().then(port => {
            this.previewWindow.ServerPort = port;
            // If we need to append the results, then do so if we have any result windows open
            let sendDataToResultView = this.server.clientsConnected(2000);
            return sendDataToResultView.then(clientConnected => {
                // If connected to result view, then send results over sockets as they arrive
                if (clientConnected) {
                    this.server.clearBuffer();
                    results.subscribe(result => {
                        this.server.sendResults([result.data]);
                        this.updateVariables(executor);
                    });
                    return Promise.resolve();
                }
                // Wait till we have at least one item to be displayed before opening the results view
                const def = helpers_1.createDeferred();
                this.clientConnected = false;
                results.subscribe(result => {
                    this.server.sendResults([result.data]);
                    // socket is going crazy and cannot distinguish between 'results'/'variable' call so we do the first view after timeout
                    // for some reason all variable calls are batched as "results" call
                    // TODO: Solve how to properly isolate messages
                    timers_1.setTimeout(() => this.updateVariables(executor), 500);
                    if (this.clientConnected) {
                        this.server.clearBuffer();
                        return;
                    }
                    this.launchResultViewAndDisplayResults().
                        then(def.resolve.bind(def)).catch(def.reject.bind(def));
                });
                results.subscribeOnCompleted(() => {
                    if (!def.completed) {
                        def.resolve();
                    }
                });
                return def.promise;
            });
        });
    }
    launchResultViewAndDisplayResults() {
        const def = helpers_1.createDeferred();
        vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two, 'Results')
            .then(() => {
            def.resolve();
        }, reason => {
            def.reject(reason);
            vscode.window.showErrorMessage(reason);
        });
        return def.promise;
    }
    dispose() {
        this.disposables.forEach(d => d.dispose());
    }
    showKernelOptions(selectedKernel) {
        return __awaiter(this, void 0, void 0, function* () {
            let description = '';
            let spec = yield selectedKernel.getSpec();
            if (spec.display_name.toLowerCase().indexOf(spec.language.toLowerCase()) === -1) {
                description = `${spec.name} for ${spec.language}`;
            }
            const options = [
                {
                    label: `Interrupt ${spec.display_name} Kernel`,
                    description: description,
                    command: constants_1.Commands.Jupyter.Kernel.Interrupt,
                    args: [selectedKernel]
                },
                {
                    label: `Restart ${spec.display_name} Kernel`,
                    description: description,
                    command: constants_1.Commands.Jupyter.Kernel.Restart,
                    args: [selectedKernel]
                },
                {
                    label: `Shut Down ${spec.display_name} Kernel`,
                    description: description,
                    command: constants_1.Commands.Jupyter.Kernel.Shutdown,
                    args: [selectedKernel]
                },
                {
                    label: ` `,
                    description: ' ',
                    command: '',
                    args: []
                },
                {
                    label: `Select another ${spec.language} Kernel`,
                    description: ` `,
                    command: constants_1.Commands.Jupyter.Kernel.Select,
                    args: [spec.language]
                }
            ];
            if (this.canShutdown) {
                options.push({
                    label: `Shut Down Notebook`,
                    description: `Notebook running on ${this.notebookUrl}`,
                    command: constants_1.Commands.Jupyter.Notebook.ShutDown,
                    args: []
                });
            }
            return vscode.window.showQuickPick(options).then(option => {
                if (!option || !option.command || option.command.length === 0) {
                    return;
                }
                return vscode.commands.executeCommand(option.command, ...option.args);
            });
        });
    }
}
exports.JupyterDisplay = JupyterDisplay;
//# sourceMappingURL=main.js.map