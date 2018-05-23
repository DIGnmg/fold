// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "fold" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', function () {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');

        // Get the current text editor
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            // Display a message box to the user
            vscode.window.showInformationMessage('There is currently no active editor!');
            return;
        }

        var current = editor.viewColumn;
        var visibleTextEditors = vscode.window.visibleTextEditors;
        var currentWindow = vscode.window;

        var currentEditorOptions = editor.document;
        var options = {
            content: "",
            language: currentEditorOptions.languageId
        }

        var newDoc = vscode.workspace.openTextDocument(options).then(function(doc) {
            if (current != undefined && visibleTextEditors.length !== 3) {
                currentWindow.showTextDocument(doc, visibleTextEditors.length + 1, true)
            } else {
                vscode.commands.executeCommand('workbench.action.closeActiveEditor');
            }
            return doc;
        });
    });

    context.subscriptions.push(disposable);
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;