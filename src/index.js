const { app, BrowserWindow, ipcMain } = require('electron');
const remoteMain = require('@electron/remote/main');
const path = require('path');
const ipc = ipcMain
const { titlebar, buttons, primary, background, font } = require('./settings.json')

remoteMain.initialize();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  let mainWindow

  if(titlebar.Enable) {
    // Create the browser window with custom Titlebar.
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      title: titlebar.title,
      autoHideMenuBar: true,
      frame: false,
      titleBarStyle: 'customButtonsOnHover',
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
        devTools: true,
      }});
  } else {
    // Create the browser window without custom Titlebar.
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      title: titlebar.title,
      autoHideMenuBar: true,
      frame: true,
      titleBarStyle: 'customButtonsOnHover',
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
        devTools: true,
      }});
  }

  remoteMain.enable(mainWindow.webContents)

  // and load the index.html of the app.
  // path.join(__dirname, 'index.html')
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  /* Close app*/
  ipc.on('closeApp', () => {
    console.log("Astro ~> [LOG] Clicked on Close Button")
    mainWindow.close()
  })

  /* Minimize app*/
  ipc.on('minimizeApp', () => {
    console.log("Astro ~> [LOG] Clicked on Minimize Button")
    mainWindow.minimize()
  })

  /* Maximize/Restore app */
  ipc.on('maximizeRestoreApp', () => {
    if(mainWindow.isMaximized()) {
      console.log("Astro ~> [LOG] Clicked on Restore Button")
      mainWindow.restore()
    } else {
      console.log("Astro ~> [LOG] Clicked on Maximize Button")
      mainWindow.maximize()
    }
  })

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();

  // Logging settings 
  const log_text = `
     ___         __           
    /   |  _____/ /__________ 
   / /| | / ___/ __/ ___/ __ \\
  / ___ |(__  ) /_/ /  / /_/ /
 /_/  |_|____/\\__/_/   \\____/ 
 >> Developed by gokiimax
 
                  |             
  Font            |  ${font}
  Primary         |  ${primary}
  Background      |  ${background}
  ${titlebar.Enable ? `Close Button    |  ${buttons.closeButton}\n  Maximize Button |  ${buttons.maximizeButton}\n  Minimize Button |  ${buttons.maximizeButton}\n  Button Icons    |  ${buttons.icons}\n  Titlebar Icon   |  ${titlebar.icon}\n` : "                |"}
  `

  console.log(log_text)
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    console.log("Thank you for using Astro!")
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
