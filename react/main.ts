import { app, BrowserWindow, ipcMain } from 'electron';
import * as os from "os";
import { exec } from "child_process";
import * as path from 'path';

type sysInfoType = {
	platform: NodeJS.Platform,
	arch: string,
	cpus: os.CpuInfo[],
	totalMemory: number,
	freeMoemory: number,
	userInfo: os.UserInfo<string>,
	diskSpace?: string
}

const sysInfo: sysInfoType = {
	platform: os.platform(),
	arch: os.arch(),
	cpus: os.cpus(),
	totalMemory: os.totalmem(),
	freeMoemory: os.freemem(),
	userInfo: os.userInfo(),
}

exec("df -h", (err, stdout, stderr) => {
	if (err) throw err;

	if (stderr) throw stderr;

	sysInfo.diskSpace = stdout;
});

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: false,
			preload: path.join(__dirname, 'preload.js')
		},
	});

	win.loadFile('./dist/index.html');

	win.webContents.on('did-finish-load', () => {
		win.webContents.send("sysInfo", sysInfo);
	});
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

ipcMain.on('closeApp', () => {
	app.quit();
});