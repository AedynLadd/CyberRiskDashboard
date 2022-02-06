const { contextBridge, ipcRenderer } = require('electron');

const CONFIG_PATH = './app/Hidden/Data/data_config.json';

contextBridge.exposeInMainWorld('electron', {
    dialogApi: {
        open: (filters) => {
            const filtersToUse = filters ? filters : [
                { name: "CSV", extensions: ["csv"] },
                { name: "All", extensions: ["*"] }
            ];

            return ipcRenderer.invoke(
                'openDialog',
                {filters: filtersToUse}
            ).then(result => {
                return result.filePaths[0];
            });
        }
    },
    fileSystemApi: {
        readCSV: (filePath, skipHeader) => {
            return ipcRenderer.invoke(
                'readCSV',
                {
                    filePath: filePath,
                    skipHeader: skipHeader
                }
            );
        },
        readConfig: () => {
            return ipcRenderer.invoke(
                'readJson',
                {
                    filePath: CONFIG_PATH,
                }
            );
        },
        writeConfig: (config) => {
            return ipcRenderer.invoke(
                'writeJson',
                {
                    filePath: CONFIG_PATH,
                    json: config
                }
            );
        }
    },
    windowApi: {
        closeRAQ: () => {
            return ipcRenderer.invoke('closeRAQ');
        }
    }
})