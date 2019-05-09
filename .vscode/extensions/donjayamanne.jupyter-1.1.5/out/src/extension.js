'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const main_1 = require("./main");
const languageProvider_1 = require("./common/languageProvider");
const main_2 = require("./telemetry/main");
const contracts_1 = require("./telemetry/contracts");
// Required by @jupyter/services
global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
global.requirejs = require('requirejs');
global.WebSocket = require('ws');
const deprecationMessage = 'This extension is no longer being maintained and all of its functionality has been (or will be) placed into the [Microsoft Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python).';
function activate(context) {
    main_2.sendTelemetryEvent(contracts_1.EVENT_LOAD);
    let outputChannel = vscode.window.createOutputChannel('Jupyter');
    context.subscriptions.push(outputChannel);
    let jupyter = new main_1.Jupyter(outputChannel);
    context.subscriptions.push(jupyter);
    vscode.window.showWarningMessage(deprecationMessage);
    return {
        registerLanguageProvider: (language, provider) => {
            languageProvider_1.LanguageProviders.registerLanguageProvider(language, provider);
        },
        hasCodeCells: (document, token) => {
            return jupyter.hasCodeCells(document, token);
        }
    };
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map