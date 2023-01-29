import {app, BrowserWindow, screen} from 'electron';
import path from 'path';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if(require('electron-squirrel-startup')) app.quit();

const createWindow = (): void => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const height = 250;

  const mainWindow = new BrowserWindow({
    x: 0,
    y: primaryDisplay.workArea.height - height,
    height: height,
    width: primaryDisplay.size.width,
    frame: false,
    transparent: true,
    roundedCorners: false,
    resizable: false,
    fullscreen: false,
    alwaysOnTop: true,
    icon: path.join(__dirname, "../assets/logo.png"),
    title: 'Desktop Daemon',
    webPreferences: {
      // nodeIntegration:  true,
      // contextIsolation: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
