const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
    constructor(url) {
        super({
            width: 500,
            height: 300,
        });

        this.loadURL(url);
    }
}

module.exports = MainWindow;