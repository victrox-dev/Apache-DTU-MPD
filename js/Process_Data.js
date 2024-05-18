const pointAddSequence = ["IDENT", "FREE", "MGRS", "ALT"];

let storeData = function () {
    alert("Storing Data...");
};

let updateScreen = function () {
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
        updateScreen();
    } else {
        storeData();
        KU.placeholder = "KEYBOARD UNIT (INPUT)";
        Load_Page(returnTo);
        inputReady = false;
        tempData = [];
        return null;
    }
}