const { app, BrowserWindow } = require('electron')
const path = require('path')

require('electron-reload')(__dirname);

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 250,
        height: 250,
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        },
        // resizable: false
    })

    mainWindow.loadFile('./src/index.html')
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})