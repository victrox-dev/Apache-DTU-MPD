let storeData = function () {
    alert("Storing Data...");
};

let updateScreen = function () {
    alert("Changing UI Elements");
}

let validateInput = function () {
    alert("Validate Data");
    return true;
}

function Process_Data() {
    if (!numVars) {
        return null;
    }
    
    if (!validateInput()) {
        ctx.fillStyle = "red";
        ctx.fillRect(screen.x + 125, screen.y + screen.w / 2 - (25 / 2), 25, 25);
        return null; // TODO: Add some sort of feedback indication (why did validation fail)
    }
    
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
        KU.placeholder = "";
        inputReady = false;
        tempData = null;
        Load_Page(returnTo);
        updateScreen = function () { return null };
        storeData = function () { return null };
        returnTo = null;
        return null;
    }
}