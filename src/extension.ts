'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "MD-Tools" is now active!');

    let mdFormat = vscode.commands.registerCommand('MD-Tools.format', () => {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        const REGEX =  /import(.*?){((.|\n)*)}/g;
        //.replace(/\n/g,'')

        let document = editor.document;
        var start = new vscode.Position(0, 0);
        var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
        var range = new vscode.Range(start, end);
        // Later...
        vscode.commands.executeCommand('HookyQR.beautifyFile', range)
            .then(value => {
                console.log("Command should have already finished");
                console.log(value);


                var selection = editor.selection;
                var text = editor.document.getText();
                let reg =  /import(.*?){((.|\n)*)}/g;
                var values = reg.exec(text);
                let newContent = values[0].replace(/\n/g,'')

                editor.edit(builder => {
                    builder.replace(range, newContent);
                })

            }, error => {
                console.log(error);
            });

        // var selection = editor.selection;
        // var text = editor.document.getText();

        // let newContent = text.replace('import', 'import;');

        // editor.edit(builder => {
        //     builder.replace(range, newContent);
        // })
        // vscode.window.showInformationMessage('Selected characters: ' + text.length);
    });




    context.subscriptions.push(mdFormat);
}

// this method is called when your extension is deactivated
export function deactivate() {}