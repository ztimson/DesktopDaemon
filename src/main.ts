import {app, BrowserWindow, screen} from 'electron';
import * as path from 'path';

// Window factory
function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const height = 250;

  const window = new BrowserWindow({
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
      nodeIntegration:  true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js")
    },
  });

  window.loadFile(path.join(__dirname, "../index.html"));
  window.webContents.openDevTools();
}

// Start
app.on("ready", () => {
  createWindow();

  // OSX convention - (resume the session)
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Stop
app.on("window-all-closed", () => {
  // OSX convention (stay running in dock)
  if (process.platform !== "darwin") app.quit();
});

// You can put anything else you want in the main thread here
