import {app, BrowserWindow} from "electron";
import * as path from "path";

// Window factory
function createWindow() {
  const window = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
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
