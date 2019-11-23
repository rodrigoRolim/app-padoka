const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.BrowserWindow
const app = electron.app
const globalShortcut = electron.globalShortcut

let mainWindow;

function createWindow () {
  globalShortcut.register('f5', function() {

		mainWindow.reload()
	})
  mainWindow = new BrowserWindow({autoHideMenuBar: true,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.removeMenu();
  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})