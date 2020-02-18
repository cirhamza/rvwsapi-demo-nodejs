//project configs
const FILENAME = "cubetest.rvwj";
const FILE_TO_SLICE =  __dirname + `/assets/${FILENAME}`;
const DOWNLOADS_FOLDER = __dirname + '/downloads/';

//Printer configs
const SUPPORT_TYPE = 'n';
const PRINTER_MODEL = 'IdeaWerk-Speed';
const CONFIG_PRESET_NAME = 'Recommended';
const CONFIG_FILE = '';

//Authentication
const USE_OAUTH = false;
const TOKEN_PATH = __dirname + "/token.json";

module.exports = {
	FILENAME,
	FILE_TO_SLICE,
	DOWNLOADS_FOLDER,
	SUPPORT_TYPE,
	PRINTER_MODEL,
	CONFIG_PRESET_NAME,
	CONFIG_FILE,
    USE_OAUTH,
    TOKEN_PATH
};