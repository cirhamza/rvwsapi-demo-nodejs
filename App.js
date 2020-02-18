// ******************************************************************** //
// Imports
// ******************************************************************** //

let realvision = require('./Realvision');
let fs = require('fs');
let configs = require('./configs.js');

// ******************************************************************** // 
// ******************************************************************** //


//After checking if the token is valid or not
//The executeFlow() function will execute the whole Slicing flow from checking the activation status to Downloading the file and saving it in the "downloads" folder.
//To execute this process, go to your command line interface and cd into this folder, then write: "node test.js", or you can simply execute the npm script by typing: "npm test"

ExecuteSlicingFlow() ;

// ******************************************************************** //
// ******************************************************************** //



async function ExecuteSlicingFlow(){

    //Use this to import the file that you want to slice, the file must have an .rvwj extension.
    let rvwjFile = fs.readFileSync(configs.FILE_TO_SLICE).toString();
    //This is the data you'll be sending with the ProvideFile POST request, feel free to specifiy the configurations you deem fit.
    const ApiRequest =
    {
        file:
        {
            FileName: configs.FILENAME,
            WsConfigs : JSON.parse(rvwjFile)
        },
        supportType: configs.SUPPORT_TYPE,
        printerModel: configs.PRINTER_MODEL,
        configPresetName: configs.CONFIG_PRESET_NAME,
        configFile: configs.CONFIG_FILE
    } 

    let activationStatus = await realvision.GetActivationStatus();
    //Check if you have the right to use the online slicer 
    if (activationStatus){
        //Provide the ApiRequest object which contains all the information the ProvideFile() function needs.
        await realvision.ProvideFile(ApiRequest).then( (taskId)=>{
            let interval = 1000;
            //Check the progress of the slicing task every 1000 ms (1 second) 
            let loop = setInterval( async ()=>
            {
                let progress = await realvision.GetProgress(taskId)
                //Stop calling the GetProgress endpoint when you get "1"
                //then you'll be able to get Printing Information and also be able to download the GCode or FCode file
                if(progress === '1' ){
                    clearInterval(loop);
                    await realvision.GetPrintingInformation(taskId);
                    await realvision.DownloadFile(taskId);
                }else if (progress == '-1' ){
                    clearInterval(loop);
                    console.log("Error: An error occured while getting the progress of the slicing, please check if the extention of the file used is .rvwj ... ")
                } 
            }, interval)
        })
    }
}

