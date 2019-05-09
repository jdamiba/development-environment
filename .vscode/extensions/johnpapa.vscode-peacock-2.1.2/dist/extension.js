module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=6)}([function(e,t){e.exports=require("vscode")},function(e,t,r){"use strict";function n(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}Object.defineProperty(t,"__esModule",{value:!0});const o=r(0),i=r(5);n(r(5)),n(r(7)),n(r(8)),n(r(9)),t.getExtension=function(){let e;const t=o.extensions.getExtension(i.extensionId);if(!t)throw new Error("Extension was not found.");return t&&(e=t),e}},function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(o,i){function a(e){try{u(n.next(e))}catch(e){i(e)}}function s(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){e.done?o(e.value):new r(function(t){t(e.value)}).then(a,s)}u((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const o=r(11),i=r(1),a=r(3);function s(e=""){return f(o(e))}function u(e=""){const t=o(e).isLight()?a.getDarkForegroundColorOrOverride():a.getLightForegroundColorOrOverride();return f(o(t))}function c(e="",t=i.ReadabilityRatios.Text){const r=o(e),n=r.triad()[1];let{h:a,s:s,l:u}=n.toHsl();0===s&&(a=60*Math.round(6*u)),s<.15&&(s=i.defaultSaturation);const c=[...Array(16).keys()].map(e=>{const t=o({h:a,s:s,l:e*(1/16)});return{contrast:o.readability(t,r),hex:f(t)}});c.sort((e,t)=>e.contrast-t.contrast);const l=c.find(e=>e.contrast>=t);return l?l.hex:"#ffffff"}function l(e="",t=i.defaultAmountToLighten){return f(o(e).lighten(t))}function d(e,t=i.defaultAmountToLighten){return f(o(e).darken(t))}function f(e){return e.getAlpha()<1?e.toHex8String():e.toHexString()}function g(){const e=Object.assign({},a.getExistingColorCustomizations());return Object.values(i.ColorSettings).forEach(t=>{delete e[t]}),e}t.getColorHex=function(e=""){return f(o(e))},t.getBackgroundColorHex=s,t.getInactiveBackgroundColorHex=function(e=""){const t=o(e);return t.setAlpha(i.inactiveElementAlpha),f(t)},t.getBackgroundHoverColorHex=function(e=""){const t=o(e);return f(t.isLight()?t.darken():t.lighten())},t.getForegroundColorHex=u,t.getInactiveForegroundColorHex=function(e=""){const t=o(u(e));return t.setAlpha(i.inactiveElementAlpha),f(t)},t.getReadableAccentColorHex=c,t.getBadgeBackgroundColorHex=function(e=""){return c(e,i.ReadabilityRatios.UserInterfaceLow)},t.getAdjustedColorHex=function(e="",t){switch(t){case i.ColorAdjustmentOptions.lighten:return l(e);case i.ColorAdjustmentOptions.darken:return d(e);default:return e}},t.getLightenedColorHex=l,t.getDarkenedColorHex=d,t.getRandomColorHex=function(){return f(o.random())},t.getColorBrightness=function(e=""){return o(e).getBrightness()},t.getReadabilityRatio=function(e="",t=""){return o.readability(o(e),o(t))},t.isValidColorInput=function(e){return o(e).isValid()},t.changeColor=function(e=""){return n(this,void 0,void 0,function*(){const t=s(e);i.State.recentColor=t;const r=g(),n=a.prepareColors(t),o=Object.assign({},r,n);return yield a.updateWorkspaceConfiguration(o),t})},t.deletePeacocksColorCustomizations=g},function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(o,i){function a(e){try{u(n.next(e))}catch(e){i(e)}}function s(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){e.done?o(e.value):new r(function(t){t(e.value)}).then(a,s)}u((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const o=r(1),i=r(2),a=r(0),s=r(4),{workspace:u}=a;function c(){return u.getConfiguration(o.Sections.workspacePeacockSection)}function l(e,t){return u.getConfiguration(o.Sections.userPeacockSection).get(e,t)}function d(e,t){return n(this,void 0,void 0,function*(){let r=a.workspace.getConfiguration();const n=`${o.extensionShortName}.${e}`;return s.Logger.info("Updating the user settings with the following changes:"),s.Logger.info(`${n} = ${t}`,!0),yield r.update(n,t,a.ConfigurationTarget.Global)})}function f(e){return l(e,!1)}function g(){return l(o.StandardSettings.DarkForegroundColor,"")}function h(){return l(o.StandardSettings.LightForegroundColor,"")}function v(){return l(o.StandardSettings.KeepForegroundColor,!1)}function m(){return l(o.StandardSettings.KeepBadgeColor,!1)}function p(){const e=o.favoriteColorSeparator;let t=l(o.StandardSettings.FavoriteColors);return{menu:t.map(t=>`${t.name} ${e} ${t.value}`),values:t=t||[]}}function b(){return l(o.StandardSettings.SurpriseMeOnStartup,!1)}function C(){return{activityBar:l(o.AffectedSettings.ActivityBar)||!1,statusBar:l(o.AffectedSettings.StatusBar)||!1,titleBar:l(o.AffectedSettings.TitleBar)||!1}}function y(){return l(o.StandardSettings.ElementAdjustments)||{}}function _(e){return n(this,void 0,void 0,function*(){return yield d(o.StandardSettings.FavoriteColors,e)})}function S(e){return y()[e]}function k(e,t,r=!1){let n=e;if(t){const r=S(t);r&&(n=i.getAdjustedColorHex(e,r))}let o={backgroundHex:n,backgroundHoverHex:i.getBackgroundHoverColorHex(n),foregroundHex:i.getForegroundColorHex(n),inactiveBackgroundHex:i.getInactiveBackgroundColorHex(n),inactiveForegroundHex:i.getInactiveForegroundColorHex(n)};return r&&(o.badgeBackgroundHex=i.getBadgeBackgroundColorHex(n),o.badgeForegroundHex=i.getForegroundColorHex(o.badgeBackgroundHex)),o}function x(){let e=[];const t=Object.values(o.AffectedSettings).map(e=>`${o.extensionShortName}.${e}`),r=Object.values(o.StandardSettings).map(e=>`${o.extensionShortName}.${e}`);return e.push(...t),e.push(...r),e}function B(e){return{[o.ElementNames.activityBar]:e[o.ColorSettings.activityBar_background],[o.ElementNames.statusBar]:e[o.ColorSettings.statusBar_background],[o.ElementNames.titleBar]:e[o.ColorSettings.titleBar_activeBackground]}}function A(e,t){let r;switch(t){case o.ColorAdjustmentOptions.darken:r=o.ColorAdjustmentOptions.lighten;break;case o.ColorAdjustmentOptions.lighten:r=o.ColorAdjustmentOptions.darken;break;default:r=o.ColorAdjustmentOptions.none}return i.getAdjustedColorHex(e,r)}t.getPeacockWorkspaceConfig=c,t.getUserConfig=function(){return u.getConfiguration(o.Sections.userPeacockSection)},t.getCurrentColorBeforeAdjustments=function(){const e=B(c());let{color:t,adjustment:r}=function(e){let t="",r=o.ElementNames.activityBar;e[o.ElementNames.activityBar]?(r=o.ElementNames.activityBar,t=e[r]):e[o.ElementNames.statusBar]?(r=o.ElementNames.statusBar,t=e[r]):e[o.ElementNames.titleBar]&&(r=o.ElementNames.titleBar,t=e[r]);const n=S(r);return{color:t,adjustment:n}}(e),n="";return t&&(n=A(t,r)),n},t.readConfiguration=l,t.updateGlobalConfiguration=d,t.isAffectedSettingSelected=f,t.prepareColors=function(e){const t=v(),r=m();let n=function(e,t){const r={};if(f(o.AffectedSettings.TitleBar)){const n=k(e,o.ElementNames.titleBar);r[o.ColorSettings.titleBar_activeBackground]=n.backgroundHex,r[o.ColorSettings.titleBar_inactiveBackground]=n.inactiveBackgroundHex,t||(r[o.ColorSettings.titleBar_activeForeground]=n.foregroundHex,r[o.ColorSettings.titleBar_inactiveForeground]=n.inactiveForegroundHex)}return r}(e,t),i=function(e,t,r){const n={};if(f(o.AffectedSettings.ActivityBar)){const i=k(e,o.ElementNames.activityBar,!0);n[o.ColorSettings.activityBar_background]=i.backgroundHex,t||(n[o.ColorSettings.activityBar_foreground]=i.foregroundHex,n[o.ColorSettings.activityBar_inactiveForeground]=i.inactiveForegroundHex),r||(n[o.ColorSettings.activityBar_badgeBackground]=i.badgeBackgroundHex,n[o.ColorSettings.activityBar_badgeForeground]=i.badgeForegroundHex)}return n}(e,t,r),a=function(e,t){const r={};if(f(o.AffectedSettings.StatusBar)){const n=k(e,o.ElementNames.statusBar);r[o.ColorSettings.statusBar_background]=n.backgroundHex,r[o.ColorSettings.statusBarItem_hoverBackground]=n.backgroundHoverHex,t||(r[o.ColorSettings.statusBar_foreground]=n.foregroundHex)}return r}(e,t);return Object.assign({},i,n,a)},t.updateWorkspaceConfiguration=function(e){return n(this,void 0,void 0,function*(){return s.Logger.info("Updating the workspace with the following color customizations"),s.Logger.info(e,!0),yield u.getConfiguration().update("workbench.colorCustomizations",e,a.ConfigurationTarget.Workspace)})},t.getDarkForegroundColor=g,t.getDarkForegroundColorOrOverride=function(){return g()||o.ForegroundColors.DarkForeground},t.getLightForegroundColor=h,t.getLightForegroundColorOrOverride=function(){return h()||o.ForegroundColors.LightForeground},t.getKeepForegroundColor=v,t.getKeepBadgeColor=m,t.getFavoriteColors=p,t.getSurpriseMeOnStartup=b,t.getAffectedElements=C,t.getElementAdjustments=y,t.updateElementAdjustments=function(e){return n(this,void 0,void 0,function*(){return yield d(o.StandardSettings.ElementAdjustments,e)})},t.updateKeepForegroundColor=function(e){return n(this,void 0,void 0,function*(){return yield d(o.StandardSettings.KeepForegroundColor,e)})},t.updateKeepBadgeColor=function(e){return n(this,void 0,void 0,function*(){return yield d(o.StandardSettings.KeepBadgeColor,e)})},t.updateSurpriseMeOnStartup=function(e){return n(this,void 0,void 0,function*(){return yield d(o.StandardSettings.SurpriseMeOnStartup,e)})},t.updateDarkForegroundColor=function(e){return n(this,void 0,void 0,function*(){return yield d(o.StandardSettings.DarkForegroundColor,e)})},t.updateLightForegroundColor=function(e){return n(this,void 0,void 0,function*(){return yield d(o.StandardSettings.LightForegroundColor,e)})},t.addNewFavoriteColor=function(e,t){return n(this,void 0,void 0,function*(){const{values:r}=p(),n=[...r,{name:e,value:t}];return yield _(n)})},t.writeRecommendedFavoriteColors=function(e){return n(this,void 0,void 0,function*(){let t=`${o.extensionShortName}: Adding recommended favorite colors to user settings`;s.Logger.info(t),a.window.showInformationMessage(t);const r=function(e){let t=e||o.starterSetOfFavorites;const{values:r}=p();return[...t,...r].filter((e,t,r)=>r.map(e=>e.name).indexOf(e.name)===t)}(e);return yield _(r)})},t.updateFavoriteColors=_,t.getElementAdjustment=S,t.getElementStyle=k,t.getAllSettingNames=x,t.checkIfPeacockSettingsChanged=function(e){return x().some(t=>e.affectsConfiguration(t))},t.getOriginalColorsForAllElements=function(){const e=B(c()),t=y();return{[o.ElementNames.activityBar]:A(e[o.ElementNames.activityBar],t[o.ElementNames.activityBar]),[o.ElementNames.statusBar]:A(e[o.ElementNames.statusBar],t[o.ElementNames.statusBar]),[o.ElementNames.titleBar]:A(e[o.ElementNames.titleBar],t[o.ElementNames.titleBar])}},t.getExistingColorCustomizations=function(){return u.getConfiguration().get(o.Sections.workspacePeacockSection)},t.hasFavorites=function(){return function(){const e=p(),t=y(),r=m(),n=v(),o=b(),i=g(),a=h(),{activityBar:s,statusBar:u,titleBar:c}=C();return{favoriteColors:e,elementAdjustments:t,keepBadgeColor:r,keepForegroundColor:n,surpriseMeOnStartup:o,darkForegroundColor:i,lightForegroundColor:a,affectActivityBar:s,affectStatusBar:u,affectTitleBar:c}}().favoriteColors.values.length},t.updateAffectedElements=function(e){return n(this,void 0,void 0,function*(){return yield d(o.AffectedSettings.ActivityBar,e.activityBar),yield d(o.AffectedSettings.StatusBar,e.statusBar),yield d(o.AffectedSettings.TitleBar,e.titleBar),!0})}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(0);class o{static initialize(){this._outputChannel||(this._outputChannel=n.window.createOutputChannel("Peacock"))}static getChannel(){return this.initialize(),this._outputChannel}static info(e,t){let r="";if("object"==typeof e){let n="";Object.entries(e).map(e=>{n+=`${t?"  ":""}${e[0]} = ${e[1]}\n`}),r=n}else r=(t?"  ":"")+e;this._outputChannel.appendLine(r)}}t.Logger=o,o.initialize()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.extensionShortName="peacock",t.extensionId="johnpapa.vscode-peacock",t.favoriteColorSeparator="->",t.inactiveElementAlpha=.6,t.defaultAmountToLighten=10,t.defaultSaturation=.5,t.peacockGreen="#42b883"},function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(o,i){function a(e){try{u(n.next(e))}catch(e){i(e)}}function s(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){e.done?o(e.value):new r(function(t){t(e.value)}).then(a,s)}u((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const o=r(0),i=r(1),a=r(10),s=r(3),u=r(2),c=r(4),{commands:l,workspace:d}=o;function f(){return n(this,void 0,void 0,function*(){if(i.State.recentColor=s.getCurrentColorBeforeAdjustments(),!i.State.recentColor&&s.getSurpriseMeOnStartup()){const e=`Peacock changed the base accent colors to ${yield a.changeColorToRandomHandler()}, because the setting is enabled for ${i.StandardSettings.SurpriseMeOnStartup}`;o.window.showInformationMessage(e)}})}t.activate=function(e){return n(this,void 0,void 0,function*(){console.log('Extension "vscode-peacock" is now active!'),l.registerCommand(i.Commands.resetColors,a.resetColorsHandler),l.registerCommand(i.Commands.saveColorToFavorites,a.saveColorToFavoritesHandler),l.registerCommand(i.Commands.enterColor,a.enterColorHandler),l.registerCommand(i.Commands.changeColorToRandom,a.changeColorToRandomHandler),l.registerCommand(i.Commands.addRecommendedFavorites,a.addRecommendedFavoritesHandler),l.registerCommand(i.Commands.changeColorToPeacockGreen,a.changeColorToPeacockGreenHandler),l.registerCommand(i.Commands.changeColorToFavorite,a.changeColorToFavoriteHandler),function(e){e.subscriptions.push(c.Logger.getChannel()),e.subscriptions.push(d.onDidChangeConfiguration(function(){return e=>n(this,void 0,void 0,function*(){s.checkIfPeacockSettingsChanged(e)&&i.State.recentColor&&(c.Logger.info(`Configuration changed. Changing the color to most recently selected color: ${i.State.recentColor}`),yield u.changeColor(i.State.recentColor))})}()))}(e),yield function(e){return n(this,void 0,void 0,function*(){let t=i.getExtension(),r=t?t.packageJSON.version:"";const n=`${i.extensionShortName}.starterSetOfFavoritesVersion`;let o=e.globalState.get(n,void 0);if(o!==r)e.globalState.update(n,r),yield s.writeRecommendedFavoriteColors();else{let e=`${i.extensionShortName}: already wrote the favorite colors once`;c.Logger.info(e)}})}(e),yield f()})},t.applyInitialConfiguration=f,t.deactivate=function(){console.log('Extension "vscode-peacock" is now deactive')}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.FavoriteColors="favoriteColors",e.ElementAdjustments="elementAdjustments",e.KeepBadgeColor="keepBadgeColor",e.KeepForegroundColor="keepForegroundColor",e.SurpriseMeOnStartup="surpriseMeOnStartup",e.DarkForegroundColor="darkForegroundColor",e.LightForegroundColor="lightForegroundColor"}(t.StandardSettings||(t.StandardSettings={})),function(e){e.ActivityBar="affectActivityBar",e.StatusBar="affectStatusBar",e.TitleBar="affectTitleBar"}(t.AffectedSettings||(t.AffectedSettings={})),function(e){e.resetColors="peacock.resetColors",e.saveColorToFavorites="peacock.saveColorToFavorites",e.enterColor="peacock.enterColor",e.changeColorToRandom="peacock.changeColorToRandom",e.changeColorToPeacockGreen="peacock.changeColorToPeacockGreen",e.changeColorToFavorite="peacock.changeColorToFavorite",e.addRecommendedFavorites="peacock.addRecommendedFavorites"}(t.Commands||(t.Commands={})),function(e){e.activityBar="activityBar",e.statusBar="statusBar",e.titleBar="titleBar"}(t.ElementNames||(t.ElementNames={})),function(e){e.titleBar_activeBackground="titleBar.activeBackground",e.titleBar_activeForeground="titleBar.activeForeground",e.titleBar_inactiveBackground="titleBar.inactiveBackground",e.titleBar_inactiveForeground="titleBar.inactiveForeground",e.activityBar_background="activityBar.background",e.activityBar_foreground="activityBar.foreground",e.activityBar_inactiveForeground="activityBar.inactiveForeground",e.activityBar_badgeBackground="activityBarBadge.background",e.activityBar_badgeForeground="activityBarBadge.foreground",e.statusBar_background="statusBar.background",e.statusBar_foreground="statusBar.foreground",e.statusBarItem_hoverBackground="statusBarItem.hoverBackground"}(t.ColorSettings||(t.ColorSettings={})),function(e){e.lighten="lighten",e.darken="darken",e.none="none"}(t.ColorAdjustmentOptions||(t.ColorAdjustmentOptions={})),function(e){e.workspacePeacockSection="workbench.colorCustomizations",e.userPeacockSection="peacock"}(t.Sections||(t.Sections={})),function(e){e.DarkForeground="#15202b",e.LightForeground="#e7e7e7"}(t.ForegroundColors||(t.ForegroundColors={})),function(e){e[e.UserInterfaceLow=2]="UserInterfaceLow",e[e.UserInterface=3]="UserInterface",e[e.Text=4.5]="Text"}(t.ReadabilityRatios||(t.ReadabilityRatios={}))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.starterSetOfFavorites=[{name:"Angular Red",value:"#b52e31"},{name:"Auth0 Orange",value:"#eb5424"},{name:"Azure Blue",value:"#007fff"},{name:"C# Purple",value:"#68217A"},{name:"Gatsby Purple",value:"#639"},{name:"Java Blue-Gray",value:"#557c9b"},{name:"JavaScript Yellow",value:"#f9e64f"},{name:"Mandalorian Blue",value:"#1857a4"},{name:"Node Green",value:"#215732"},{name:"React Blue",value:"#00b3e6"},{name:"Something Different",value:"#832561"},{name:"Vue Green",value:"#42b883"}]},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(4);class o{static get recentColor(){return this._recentColor}static set recentColor(e){this._recentColor=e;const t=`Saving the most recently used color ${this._recentColor} to state`;n.Logger.info(t)}}o._recentColor="",t.State=o},function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(o,i){function a(e){try{u(n.next(e))}catch(e){i(e)}}function s(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){e.done?o(e.value):new r(function(t){t(e.value)}).then(a,s)}u((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const o=r(2),i=r(1),a=r(3),s=r(12);t.resetColorsHandler=function(){return n(this,void 0,void 0,function*(){const e=o.deletePeacocksColorCustomizations();i.State.recentColor="";const t=(r=e,Object.keys(r).length?e:void 0);var r;return yield a.updateWorkspaceConfiguration(t)})},t.saveColorToFavoritesHandler=function(){return n(this,void 0,void 0,function*(){const e=a.getCurrentColorBeforeAdjustments(),t=yield s.promptForFavoriteColorName(e);if(t)return yield a.addNewFavoriteColor(t,e)})},t.enterColorHandler=function(e){return n(this,void 0,void 0,function*(){const t=e||(yield s.promptForColor());if(t){if(!o.isValidColorInput(t))throw new Error(`Invalid HEX or named color "${t}"`);return yield o.changeColor(t)}})},t.changeColorToRandomHandler=function(){return n(this,void 0,void 0,function*(){return yield o.changeColor(o.getRandomColorHex())})},t.addRecommendedFavoritesHandler=function(){return n(this,void 0,void 0,function*(){yield a.writeRecommendedFavoriteColors()})},t.changeColorToPeacockGreenHandler=function(){return n(this,void 0,void 0,function*(){return yield o.changeColor(i.peacockGreen)})},t.changeColorToFavoriteHandler=function(){return n(this,void 0,void 0,function*(){const e=yield s.promptForFavoriteColor();o.isValidColorInput(e)&&(yield o.changeColor(e))})}},function(e,t,r){var n;!function(o){var i=/^\s+/,a=/\s+$/,s=0,u=o.round,c=o.min,l=o.max,d=o.random;function f(e,t){if(t=t||{},(e=e||"")instanceof f)return e;if(!(this instanceof f))return new f(e,t);var r=function(e){var t={r:0,g:0,b:0},r=1,n=null,s=null,u=null,d=!1,f=!1;"string"==typeof e&&(e=function(e){e=e.replace(i,"").replace(a,"").toLowerCase();var t,r=!1;if(O[e])e=O[e],r=!0;else if("transparent"==e)return{r:0,g:0,b:0,a:0,format:"name"};if(t=D.rgb.exec(e))return{r:t[1],g:t[2],b:t[3]};if(t=D.rgba.exec(e))return{r:t[1],g:t[2],b:t[3],a:t[4]};if(t=D.hsl.exec(e))return{h:t[1],s:t[2],l:t[3]};if(t=D.hsla.exec(e))return{h:t[1],s:t[2],l:t[3],a:t[4]};if(t=D.hsv.exec(e))return{h:t[1],s:t[2],v:t[3]};if(t=D.hsva.exec(e))return{h:t[1],s:t[2],v:t[3],a:t[4]};if(t=D.hex8.exec(e))return{r:N(t[1]),g:N(t[2]),b:N(t[3]),a:I(t[4]),format:r?"name":"hex8"};if(t=D.hex6.exec(e))return{r:N(t[1]),g:N(t[2]),b:N(t[3]),format:r?"name":"hex"};if(t=D.hex4.exec(e))return{r:N(t[1]+""+t[1]),g:N(t[2]+""+t[2]),b:N(t[3]+""+t[3]),a:I(t[4]+""+t[4]),format:r?"name":"hex8"};if(t=D.hex3.exec(e))return{r:N(t[1]+""+t[1]),g:N(t[2]+""+t[2]),b:N(t[3]+""+t[3]),format:r?"name":"hex"};return!1}(e));"object"==typeof e&&(q(e.r)&&q(e.g)&&q(e.b)?(g=e.r,h=e.g,v=e.b,t={r:255*R(g,255),g:255*R(h,255),b:255*R(v,255)},d=!0,f="%"===String(e.r).substr(-1)?"prgb":"rgb"):q(e.h)&&q(e.s)&&q(e.v)?(n=M(e.s),s=M(e.v),t=function(e,t,r){e=6*R(e,360),t=R(t,100),r=R(r,100);var n=o.floor(e),i=e-n,a=r*(1-t),s=r*(1-i*t),u=r*(1-(1-i)*t),c=n%6;return{r:255*[r,s,a,a,u,r][c],g:255*[u,r,r,s,a,a][c],b:255*[a,a,u,r,r,s][c]}}(e.h,n,s),d=!0,f="hsv"):q(e.h)&&q(e.s)&&q(e.l)&&(n=M(e.s),u=M(e.l),t=function(e,t,r){var n,o,i;function a(e,t,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?e+6*(t-e)*r:r<.5?t:r<2/3?e+(t-e)*(2/3-r)*6:e}if(e=R(e,360),t=R(t,100),r=R(r,100),0===t)n=o=i=r;else{var s=r<.5?r*(1+t):r+t-r*t,u=2*r-s;n=a(u,s,e+1/3),o=a(u,s,e),i=a(u,s,e-1/3)}return{r:255*n,g:255*o,b:255*i}}(e.h,n,u),d=!0,f="hsl"),e.hasOwnProperty("a")&&(r=e.a));var g,h,v;return r=E(r),{ok:d,format:e.format||f,r:c(255,l(t.r,0)),g:c(255,l(t.g,0)),b:c(255,l(t.b,0)),a:r}}(e);this._originalInput=e,this._r=r.r,this._g=r.g,this._b=r.b,this._a=r.a,this._roundA=u(100*this._a)/100,this._format=t.format||r.format,this._gradientType=t.gradientType,this._r<1&&(this._r=u(this._r)),this._g<1&&(this._g=u(this._g)),this._b<1&&(this._b=u(this._b)),this._ok=r.ok,this._tc_id=s++}function g(e,t,r){e=R(e,255),t=R(t,255),r=R(r,255);var n,o,i=l(e,t,r),a=c(e,t,r),s=(i+a)/2;if(i==a)n=o=0;else{var u=i-a;switch(o=s>.5?u/(2-i-a):u/(i+a),i){case e:n=(t-r)/u+(t<r?6:0);break;case t:n=(r-e)/u+2;break;case r:n=(e-t)/u+4}n/=6}return{h:n,s:o,l:s}}function h(e,t,r){e=R(e,255),t=R(t,255),r=R(r,255);var n,o,i=l(e,t,r),a=c(e,t,r),s=i,u=i-a;if(o=0===i?0:u/i,i==a)n=0;else{switch(i){case e:n=(t-r)/u+(t<r?6:0);break;case t:n=(r-e)/u+2;break;case r:n=(e-t)/u+4}n/=6}return{h:n,s:o,v:s}}function v(e,t,r,n){var o=[T(u(e).toString(16)),T(u(t).toString(16)),T(u(r).toString(16))];return n&&o[0].charAt(0)==o[0].charAt(1)&&o[1].charAt(0)==o[1].charAt(1)&&o[2].charAt(0)==o[2].charAt(1)?o[0].charAt(0)+o[1].charAt(0)+o[2].charAt(0):o.join("")}function m(e,t,r,n){return[T(L(n)),T(u(e).toString(16)),T(u(t).toString(16)),T(u(r).toString(16))].join("")}function p(e,t){t=0===t?0:t||10;var r=f(e).toHsl();return r.s-=t/100,r.s=P(r.s),f(r)}function b(e,t){t=0===t?0:t||10;var r=f(e).toHsl();return r.s+=t/100,r.s=P(r.s),f(r)}function C(e){return f(e).desaturate(100)}function y(e,t){t=0===t?0:t||10;var r=f(e).toHsl();return r.l+=t/100,r.l=P(r.l),f(r)}function _(e,t){t=0===t?0:t||10;var r=f(e).toRgb();return r.r=l(0,c(255,r.r-u(-t/100*255))),r.g=l(0,c(255,r.g-u(-t/100*255))),r.b=l(0,c(255,r.b-u(-t/100*255))),f(r)}function S(e,t){t=0===t?0:t||10;var r=f(e).toHsl();return r.l-=t/100,r.l=P(r.l),f(r)}function k(e,t){var r=f(e).toHsl(),n=(r.h+t)%360;return r.h=n<0?360+n:n,f(r)}function x(e){var t=f(e).toHsl();return t.h=(t.h+180)%360,f(t)}function B(e){var t=f(e).toHsl(),r=t.h;return[f(e),f({h:(r+120)%360,s:t.s,l:t.l}),f({h:(r+240)%360,s:t.s,l:t.l})]}function A(e){var t=f(e).toHsl(),r=t.h;return[f(e),f({h:(r+90)%360,s:t.s,l:t.l}),f({h:(r+180)%360,s:t.s,l:t.l}),f({h:(r+270)%360,s:t.s,l:t.l})]}function F(e){var t=f(e).toHsl(),r=t.h;return[f(e),f({h:(r+72)%360,s:t.s,l:t.l}),f({h:(r+216)%360,s:t.s,l:t.l})]}function w(e,t,r){t=t||6,r=r||30;var n=f(e).toHsl(),o=360/r,i=[f(e)];for(n.h=(n.h-(o*t>>1)+720)%360;--t;)n.h=(n.h+o)%360,i.push(f(n));return i}function H(e,t){t=t||6;for(var r=f(e).toHsv(),n=r.h,o=r.s,i=r.v,a=[],s=1/t;t--;)a.push(f({h:n,s:o,v:i})),i=(i+s)%1;return a}f.prototype={isDark:function(){return this.getBrightness()<128},isLight:function(){return!this.isDark()},isValid:function(){return this._ok},getOriginalInput:function(){return this._originalInput},getFormat:function(){return this._format},getAlpha:function(){return this._a},getBrightness:function(){var e=this.toRgb();return(299*e.r+587*e.g+114*e.b)/1e3},getLuminance:function(){var e,t,r,n=this.toRgb();return e=n.r/255,t=n.g/255,r=n.b/255,.2126*(e<=.03928?e/12.92:o.pow((e+.055)/1.055,2.4))+.7152*(t<=.03928?t/12.92:o.pow((t+.055)/1.055,2.4))+.0722*(r<=.03928?r/12.92:o.pow((r+.055)/1.055,2.4))},setAlpha:function(e){return this._a=E(e),this._roundA=u(100*this._a)/100,this},toHsv:function(){var e=h(this._r,this._g,this._b);return{h:360*e.h,s:e.s,v:e.v,a:this._a}},toHsvString:function(){var e=h(this._r,this._g,this._b),t=u(360*e.h),r=u(100*e.s),n=u(100*e.v);return 1==this._a?"hsv("+t+", "+r+"%, "+n+"%)":"hsva("+t+", "+r+"%, "+n+"%, "+this._roundA+")"},toHsl:function(){var e=g(this._r,this._g,this._b);return{h:360*e.h,s:e.s,l:e.l,a:this._a}},toHslString:function(){var e=g(this._r,this._g,this._b),t=u(360*e.h),r=u(100*e.s),n=u(100*e.l);return 1==this._a?"hsl("+t+", "+r+"%, "+n+"%)":"hsla("+t+", "+r+"%, "+n+"%, "+this._roundA+")"},toHex:function(e){return v(this._r,this._g,this._b,e)},toHexString:function(e){return"#"+this.toHex(e)},toHex8:function(e){return function(e,t,r,n,o){var i=[T(u(e).toString(16)),T(u(t).toString(16)),T(u(r).toString(16)),T(L(n))];if(o&&i[0].charAt(0)==i[0].charAt(1)&&i[1].charAt(0)==i[1].charAt(1)&&i[2].charAt(0)==i[2].charAt(1)&&i[3].charAt(0)==i[3].charAt(1))return i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0)+i[3].charAt(0);return i.join("")}(this._r,this._g,this._b,this._a,e)},toHex8String:function(e){return"#"+this.toHex8(e)},toRgb:function(){return{r:u(this._r),g:u(this._g),b:u(this._b),a:this._a}},toRgbString:function(){return 1==this._a?"rgb("+u(this._r)+", "+u(this._g)+", "+u(this._b)+")":"rgba("+u(this._r)+", "+u(this._g)+", "+u(this._b)+", "+this._roundA+")"},toPercentageRgb:function(){return{r:u(100*R(this._r,255))+"%",g:u(100*R(this._g,255))+"%",b:u(100*R(this._b,255))+"%",a:this._a}},toPercentageRgbString:function(){return 1==this._a?"rgb("+u(100*R(this._r,255))+"%, "+u(100*R(this._g,255))+"%, "+u(100*R(this._b,255))+"%)":"rgba("+u(100*R(this._r,255))+"%, "+u(100*R(this._g,255))+"%, "+u(100*R(this._b,255))+"%, "+this._roundA+")"},toName:function(){return 0===this._a?"transparent":!(this._a<1)&&(j[v(this._r,this._g,this._b,!0)]||!1)},toFilter:function(e){var t="#"+m(this._r,this._g,this._b,this._a),r=t,n=this._gradientType?"GradientType = 1, ":"";if(e){var o=f(e);r="#"+m(o._r,o._g,o._b,o._a)}return"progid:DXImageTransform.Microsoft.gradient("+n+"startColorstr="+t+",endColorstr="+r+")"},toString:function(e){var t=!!e;e=e||this._format;var r=!1,n=this._a<1&&this._a>=0;return t||!n||"hex"!==e&&"hex6"!==e&&"hex3"!==e&&"hex4"!==e&&"hex8"!==e&&"name"!==e?("rgb"===e&&(r=this.toRgbString()),"prgb"===e&&(r=this.toPercentageRgbString()),"hex"!==e&&"hex6"!==e||(r=this.toHexString()),"hex3"===e&&(r=this.toHexString(!0)),"hex4"===e&&(r=this.toHex8String(!0)),"hex8"===e&&(r=this.toHex8String()),"name"===e&&(r=this.toName()),"hsl"===e&&(r=this.toHslString()),"hsv"===e&&(r=this.toHsvString()),r||this.toHexString()):"name"===e&&0===this._a?this.toName():this.toRgbString()},clone:function(){return f(this.toString())},_applyModification:function(e,t){var r=e.apply(null,[this].concat([].slice.call(t)));return this._r=r._r,this._g=r._g,this._b=r._b,this.setAlpha(r._a),this},lighten:function(){return this._applyModification(y,arguments)},brighten:function(){return this._applyModification(_,arguments)},darken:function(){return this._applyModification(S,arguments)},desaturate:function(){return this._applyModification(p,arguments)},saturate:function(){return this._applyModification(b,arguments)},greyscale:function(){return this._applyModification(C,arguments)},spin:function(){return this._applyModification(k,arguments)},_applyCombination:function(e,t){return e.apply(null,[this].concat([].slice.call(t)))},analogous:function(){return this._applyCombination(w,arguments)},complement:function(){return this._applyCombination(x,arguments)},monochromatic:function(){return this._applyCombination(H,arguments)},splitcomplement:function(){return this._applyCombination(F,arguments)},triad:function(){return this._applyCombination(B,arguments)},tetrad:function(){return this._applyCombination(A,arguments)}},f.fromRatio=function(e,t){if("object"==typeof e){var r={};for(var n in e)e.hasOwnProperty(n)&&(r[n]="a"===n?e[n]:M(e[n]));e=r}return f(e,t)},f.equals=function(e,t){return!(!e||!t)&&f(e).toRgbString()==f(t).toRgbString()},f.random=function(){return f.fromRatio({r:d(),g:d(),b:d()})},f.mix=function(e,t,r){r=0===r?0:r||50;var n=f(e).toRgb(),o=f(t).toRgb(),i=r/100;return f({r:(o.r-n.r)*i+n.r,g:(o.g-n.g)*i+n.g,b:(o.b-n.b)*i+n.b,a:(o.a-n.a)*i+n.a})},f.readability=function(e,t){var r=f(e),n=f(t);return(o.max(r.getLuminance(),n.getLuminance())+.05)/(o.min(r.getLuminance(),n.getLuminance())+.05)},f.isReadable=function(e,t,r){var n,o,i=f.readability(e,t);switch(o=!1,(n=function(e){var t,r;t=((e=e||{level:"AA",size:"small"}).level||"AA").toUpperCase(),r=(e.size||"small").toLowerCase(),"AA"!==t&&"AAA"!==t&&(t="AA");"small"!==r&&"large"!==r&&(r="small");return{level:t,size:r}}(r)).level+n.size){case"AAsmall":case"AAAlarge":o=i>=4.5;break;case"AAlarge":o=i>=3;break;case"AAAsmall":o=i>=7}return o},f.mostReadable=function(e,t,r){var n,o,i,a,s=null,u=0;o=(r=r||{}).includeFallbackColors,i=r.level,a=r.size;for(var c=0;c<t.length;c++)(n=f.readability(e,t[c]))>u&&(u=n,s=f(t[c]));return f.isReadable(e,s,{level:i,size:a})||!o?s:(r.includeFallbackColors=!1,f.mostReadable(e,["#fff","#000"],r))};var O=f.names={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",burntsienna:"ea7e5d",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"663399",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"},j=f.hexNames=function(e){var t={};for(var r in e)e.hasOwnProperty(r)&&(t[e[r]]=r);return t}(O);function E(e){return e=parseFloat(e),(isNaN(e)||e<0||e>1)&&(e=1),e}function R(e,t){(function(e){return"string"==typeof e&&-1!=e.indexOf(".")&&1===parseFloat(e)})(e)&&(e="100%");var r=function(e){return"string"==typeof e&&-1!=e.indexOf("%")}(e);return e=c(t,l(0,parseFloat(e))),r&&(e=parseInt(e*t,10)/100),o.abs(e-t)<1e-6?1:e%t/parseFloat(t)}function P(e){return c(1,l(0,e))}function N(e){return parseInt(e,16)}function T(e){return 1==e.length?"0"+e:""+e}function M(e){return e<=1&&(e=100*e+"%"),e}function L(e){return o.round(255*parseFloat(e)).toString(16)}function I(e){return N(e)/255}var $,z,G,D=(z="[\\s|\\(]+("+($="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)")+")[,|\\s]+("+$+")[,|\\s]+("+$+")\\s*\\)?",G="[\\s|\\(]+("+$+")[,|\\s]+("+$+")[,|\\s]+("+$+")[,|\\s]+("+$+")\\s*\\)?",{CSS_UNIT:new RegExp($),rgb:new RegExp("rgb"+z),rgba:new RegExp("rgba"+G),hsl:new RegExp("hsl"+z),hsla:new RegExp("hsla"+G),hsv:new RegExp("hsv"+z),hsva:new RegExp("hsva"+G),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/});function q(e){return!!D.CSS_UNIT.exec(e)}e.exports?e.exports=f:void 0===(n=function(){return f}.call(t,r,t,e))||(e.exports=n)}(Math)},function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(o,i){function a(e){try{u(n.next(e))}catch(e){i(e)}}function s(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){e.done?o(e.value):new r(function(t){t(e.value)}).then(a,s)}u((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const o=r(0),i=r(1),a=r(3),s=r(2);function u(e){const t=i.favoriteColorSeparator;return e.substring(e.indexOf(t)+t.length+1)}function c(){return e=>n(this,void 0,void 0,function*(){const t=u(e);return yield s.changeColor(t)})}t.promptForColor=function(){return n(this,void 0,void 0,function*(){const e={ignoreFocusOut:!0,placeHolder:i.peacockGreen,prompt:"Enter a background color for the title bar in RGB hex format or a valid HTML color name",value:i.peacockGreen};return(yield o.window.showInputBox(e))||""})},t.promptForFavoriteColorName=function(e){return n(this,void 0,void 0,function*(){if(!e)return;const t={ignoreFocusOut:!0,placeHolder:"Mandalorian Blue",prompt:`Enter a name for the color ${e}`,value:""};return(yield o.window.showInputBox(t))||""})},t.promptForFavoriteColor=function(){return n(this,void 0,void 0,function*(){const{menu:e,values:t}=a.getFavoriteColors();let r="";const n=a.getCurrentColorBeforeAdjustments(),i={placeHolder:"Pick a favorite color",onDidSelectItem:c()};return t&&t.length&&(r=(yield o.window.showQuickPick(e,i))||""),r?u(r)||"":(yield s.changeColor(n),"")})},t.parseFavoriteColorValue=u}]);
//# sourceMappingURL=extension.js.map