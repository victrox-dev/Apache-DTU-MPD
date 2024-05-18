const pointAddSequence = ["IDENT", "FREE", "MGRS", "ALT"];
let pointIndex = null;

let tempData = [];
let numVars = 0;
let inputReady = false;
let inputPrompt = null;
let returnTo = null;

let storeData = function () {
    alert("Storing Data...");
};

let changeScreen = function () {
    alert("Changing UI elements");
}

function Process_Data() {
    // TODO: Data validation
    // TODO: Cancel processing data and clear KU if page changed
    if (!numVars) {
        return null;
    }

    const KU = document.getElementById("KU");
    tempData[tempData.length - numVars] = KU.value.toUpperCase();
    KU.value = null;
    numVars--;
    
    if (numVars !== 0) {
        KU.placeholder = tempData[tempData.length - numVars];
        inputPrompt = tempData[tempData.length - numVars] + ": ";
        Draw_User_Input_Dialog();
        changeScreen();
    } else {
        storeData();
        KU.placeholder = "KEYBOARD UNIT (INPUT)";
        Load_Page(returnTo);
        inputReady = false;
        tempData = [];
        return null;
    }
}