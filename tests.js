const { GetActivationStatus, ProvideFile, DownloadFile } = require('./Realvision')
const fs = require('fs')
const { FILE_TO_SLICE, FILENAME, SUPPORT_TYPE, PRINTER_MODEL, CONFIG_PRESET_NAME ,  CONFIG_FILE } = require('./configs')

let rvwjFile = fs.readFileSync(FILE_TO_SLICE).toString();
//This is the data you'll be sending with the ProvideFile POST request, feel free to specifiy the configurations you deem fit.
const ApiRequest =
{
    file:
    {
        FileName: FILENAME,
        WsConfigs : JSON.parse(rvwjFile)
    },
    supportType: SUPPORT_TYPE,
    printerModel: PRINTER_MODEL,
    configPresetName: CONFIG_PRESET_NAME,
    configFile: CONFIG_FILE
} 

ProvideFile(ApiRequest).then( (taskId)=> setTimeout( ()=> DownloadFile(taskId), 1000))