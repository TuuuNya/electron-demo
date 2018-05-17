const electron = require('electron');
const { Tray, Menu, app } = electron;


class MacTray extends Tray {
    constructor(iconPath, mainWindow) {
        super(iconPath);
        this.mainWindow = mainWindow;
        this.setToolTip('Todo List App by Tuuu');
        this.on('right-click', this.onRightClick.bind(this))
    }

    onRightClick(event) {
        const menuConfig = Menu.buildFromTemplate([
            {
                label: 'Quit',
                click: () => app.quit()
            }
        ])

        this.popUpContextMenu(menuConfig);
    }
}

module.exports = MacTray;