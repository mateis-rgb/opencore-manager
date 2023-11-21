"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var os = require("os");
var child_process_1 = require("child_process");
var path = require("path");
var sysInfo = {
    platform: os.platform(),
    arch: os.arch(),
    cpus: os.cpus(),
    totalMemory: os.totalmem(),
    freeMoemory: os.freemem(),
    userInfo: os.userInfo(),
};
(0, child_process_1.exec)("df -h", function (err, stdout, stderr) {
    if (err)
        throw err;
    if (stderr)
        throw stderr;
    sysInfo.diskSpace = stdout;
});
var createWindow = function () {
    var win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        },
    });
    win.loadFile('./dist/index.html');
    win.webContents.on('did-finish-load', function () {
        win.webContents.send("sysInfo", sysInfo);
    });
};
electron_1.app.whenReady().then(createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
electron_1.ipcMain.on('closeApp', function () {
    electron_1.app.quit();
});
