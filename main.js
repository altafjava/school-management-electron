const path = require('path');
const url = require('url');
const { app, BrowserWindow, ipcMain } = require('electron');
const Store = require('./store');

//handle setupevents as quickly as possible
const setupEvents = require('./installers/setupEvents');
if (setupEvents.handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

let isDev = false;
if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV === 'development') {
  isDev = true;
}

const store = new Store();
const userDataPath = store.getUserDataPath();
let mainWindow;
function createMainWindow() {
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
  mainWindow = new BrowserWindow({
    width: isDev ? 2000 : 1600,
    height: 1000,
    minHeight: 800,
    minWidth: 1200,
    show: false,
    icon: './assets/icon.ico',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  let indexPath;
  if (isDev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true,
    });
  }
  mainWindow.loadURL(indexPath);
  // Don't show until we are ready and loaded
  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.show();
    mainWindow.maximize();
    // Open devtools if dev
    if (isDev) {
      const installer = require('electron-devtools-installer');
      const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS', 'DEVTRON'];
      const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
      for (const name of extensions) {
        try {
          installer.default(installer[name], forceDownload);
        } catch (e) {
          console.log(`Error installing ${name} extension: ${e.message}`);
        }
      }
      mainWindow.webContents.openDevTools();
    }
  });
  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', () => {
  createMainWindow();
  mainWindow.webContents.executeJavaScript(`localStorage.setItem("userDataPath","${userDataPath}");`, true);
});

function findAllStudents() {
  const students = store.findAll();
  mainWindow.webContents.send('findAll:students', students);
}
ipcMain.on('getAll:students', () => {
  findAllStudents();
});

ipcMain.on('admission:add', (e, admissionData) => {
  try {
    store.add(admissionData);
    notify();
  } catch (error) {
    console.log(error);
  }
});

ipcMain.on('print', (event, content) => {
  console.log('main.js print');
  workerWindow.webContents.send('print', content);
});

function notify() {
  mainWindow.webContents.send('notify:admission-saved');
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

// Stop error
app.allowRendererProcessReuse = true;
