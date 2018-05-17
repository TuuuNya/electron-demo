const electron = require('electron');
const { Tray, Menu, app } = electron;


class MacTray extends Tray {
    constructor(iconPath, mainWindow) {
        super(iconPath);
        this.mainWindow = mainWindow;
        this.setToolTip('Todo List App by Tuuu');
        this.on('click', this.onClick.bind(this));
        this.on('right-click', this.onRightClick.bind(this))
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