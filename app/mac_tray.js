const electron = require('electron');
const { Tray } = electron;


class MacTray extends Tray {
    constructor(iconPath, mainWindow) {
        super(iconPath);
        this.mainWindow = mainWindow;
        this.on('click', this.onClick.bind(this));
    }

    onClick(event, bounds) {
        const {x, y} = bounds;
        const { height, width } = this.mainWindow.getBounds();

        if (this.mainWindow.isVisible()) {
            this.mainWindow.hide();
        }else{
            this.mainWindow.setBounds({
                x: x - width / 2,
                y,
                height,
                width,
            });
            this.mainWindow.show();
        }
    }
}

module.exports = MacTray;