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

function inputBlink() {
    if (!blinking) {
        const rectBeginX = screen.x + (screen.w / 2) / 2;
        const rectBeginY = screen.y + (screen.h / 2) - 36 / 2;
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.roundRect(rectBeginX + 4, rectBeginY, screen.w / 2 - 8, 36, 10);
        ctx.fill();
    } else {
        Draw_User_Input_Dialog();
    }
    blinking = !blinking;
}

function Process_Data() {
    if (!numVars) {
        return null;
    }
    
    if (!validateInput()) {
        inputBlink(); // Call once immediately otherwise we wait 500ms for first blink
        dialog = setInterval(inputBlink, 500);
        return null;
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
        returnTo = null;
        updateScreen = function () { return null };
        storeData = function () { return null };
        validateInput = function () { return true };
        return null;
    }
}