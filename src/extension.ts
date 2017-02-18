'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "MD-Tools" is now active!');

    let mdFormat = vscode.commands.registerCommand('MD-Tools.format', () => {
        let config = vscode.workspace.getConfiguration('');
        let commandName = (config.get('beautify.commandName') || '').toString();

        var editor = vscode.window.activeTextEditor;
        if (!editor || !commandName) {
            return;
        }

        function getRange() {
            let document = editor.document;
            var start = new vscode.Position(0, 0);
            var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
            return new vscode.Range(start, end);
        }

        var range = getRange();

        vscode.commands.executeCommand(commandName, range)
            .then(value => {
                const REGEX = /import(.*?){((.|\n)*)}/g;
                const REGEX_REMOVE_WHITE_SPACES = /  +/g;
                var selection = editor.selection;
                var text = editor.document.getText();

                let reg = /import(.*?){((.|\n)*)}((.|\n)*);/g;
                var values = reg.exec(text);
                if (values && values.length > 0) {
                    let newValue = values[0].replace(/\n/g, ' '); //REMOVE NEW LINE
                    newValue = newValue.replace(/  +/g, ' '); //REMOVE DOUBLE SPACES
                    newValue = newValue.replace(/;/g, ';\n'); //PUT A NE LINE AFTER ANY SEMICOLON ";"
                    newValue = newValue.replace(/ import/g, 'import'); //PUT A NE LINE AFTER ANY SEMICOLON ";"
                    let newTex = text.replace(values[0], newValue);
                    var newRange = getRange();
                    editor.edit(builder => {
                        builder.replace(newRange, newTex);
                    })
                } else {
                    vscode.window.showInformationMessage('No text to format');
                }
            }, error => {
                console.log(error);
            });
    });
    context.subscriptions.push(mdFormat);
}


export function deactivate() {}