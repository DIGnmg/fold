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
    let disposable = vscode.commands.registerCommand('extension.fold', function () {
        // The code you place here will be executed every time your command is executed

        // Get the current text editor
        let editor = vscode.window.activeTextEditor;
        var visibleTextEditors = vscode.window.visibleTextEditors;
        
        if (!editor) {
            // Display a message box to the user
            vscode.window.showInformationMessage('There is currently no active editor!');
            return;
        }

        var currentColumn = editor.viewColumn;
 
        var currentEditorOptions = editor.document;
        var options = {
            content: "",
            language: currentEditorOptions.languageId
        }

        var newDoc = vscode.workspace.openTextDocument(options).then(function(doc) {
            if (currentColumn != undefined && visibleTextEditors.length !== 3) {
                vscode.window.showTextDocument(doc, visibleTextEditors.length + 1, true)
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