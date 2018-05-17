const path = require('path');
const electron = require("electron");
const { app, BrowserWindow, Menu, ipcMain, Tray } = electron;

let mainWindow;
let addWindow;
let tray;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 500,
        height: 300,
        frame: false,
        resizable: false,
        show: false,
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on('closed', () => app.quit());

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    const iconName = 't.png';
    const iconPath = path.join(__dirname, `./images/${iconName}`);
    tray = new Tray(iconPath);
    tray.on('click', (event, bounds) => {
        const {x, y} = bounds;

        const { height, width } = mainWindow.getBounds();

        if (mainWindow.isVisible()) {
            mainWindow.hide();
        }else{
            mainWindow.setBounds({
                x: x - width / 2,
                y,
                height,
                width,
            });
            mainWindow.show();
        }
    });
});

function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add New Todo',
    });
    addWindow.loadURL(`file://${__dirname}/add.html`);
    addWindow.on('closed', () => addWindow = null);
}

ipcMain.on('todo:add', (event, todo) => {
    mainWindow.webContents.send('todo:add', todo);
    addWindow.close();
})

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Todo',
                click() {
                    createAddWindow();
                }
            },
            {
                label: 'Clear Todos',
                click() {
                    mainWindow.webContents.send('todo:clear');
                }
            },
            {
                label: 'Quit',
                accelerator: 'Command+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
]

if (process.platform === 'darwin'){
    menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'View',
        submenu:[
            {
                role: 'reload'
            },
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}