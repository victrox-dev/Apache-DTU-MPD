let apacheFont = new FontFace('Apache', 'url(fonts/AH-64D.ttf)');
apacheFont.load().then(function(font){
    document.fonts.add(font);
});

function debug_centerline() {
    ctx.beginPath();
    ctx.moveTo(screen.x + screen.w / 2, screen.y);
    ctx.lineTo(screen.x + screen.w / 2, screen.y + screen.h);
    ctx.stroke();
}

function Clear_Screen() {
    ctx.clearRect(screen.x, screen.y, screen.w, screen.h);
}
function Draw_Screen_Background() {
    const mapType = DTC_Structure["TSD"]["SETTINGS"]["MAP"]["TYPE"];
    const colorBand = DTC_Structure["TSD"]["SETTINGS"]["MAP"]["COLOR_BAND"];
    // const mapCTR = DTC_Structure["TSD"]["SETTINGS"]["MAP"]["CTR"];
    ctx.globalCompositeOperation = 'destination-over';
    Draw_TSD_Grid();
    if (mapType === "CHART") {
        ctx.drawImage(map_chart, screen.x, screen.y, 670, 670);
    } else if (mapType === "SAT") {
        ctx.drawImage(map_sat, screen.x, screen.y, 670, 670);
    } else if (mapType === "DIG") {
        if (colorBand === "NONE") {
            ctx.drawImage(map_dig, screen.x, screen.y, 670, 670);
        } else if (colorBand === "AC") {
            ctx.drawImage(map_dig_ac, screen.x, screen.y, 670, 670);
        } else if (colorBand === "ELEV") {
            ctx.drawImage(map_dig_elev, screen.x, screen.y, 670, 670);
        }
    }
    ctx.fillStyle = "#000";
    ctx.fillRect(screen.x, screen.y, 670, 670); // Screen background
    ctx.globalCompositeOperation = 'source-over';

    if (!inputReady) { // Clear KU if page changed
        KU.value = null;
        numVars = 0;
    }
}

function Load_Page(page, variable = null) {
    // ctx.clearRect(110, 125, 670, 670); // Clear screen
    Draw_Screen_Background(); // Draw basic black screen background
    page_definitions[page](variable);
}

function Draw_Arrow(xStart, yStart, xLen) {
    ctx.strokeStyle = "#06dd0d";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xStart + xLen, yStart);
    ctx.stroke();

    ctx.font = "16px Monospace, Monospace";
    ctx.fillStyle = "#06dd0d";
    ctx.fillText("\u{1F83A}", xStart + xLen - 2, yStart + 6);
}

function Draw_Text(text, x, y, fontSize) {
    ctx.font = fontSize.toString() + "px Apache";
    const textWidth = ctx.measureText(text).width;
    ctx.fillStyle = "black";
    ctx.fillRect(x, y - fontSize + 3, textWidth, fontSize - 3);
    ctx.fillStyle = "#06dd0d";
    ctx.fillText(text, x,  y);
}

function Draw_Special_Text(text, button, boxed = false, arrow = false, xDeviation = 0, yDeviation = 0) {
    const fontSize = 17;
    ctx.font = fontSize.toString() + "px Apache";
    ctx.fillStyle = "#06dd0d";
    const textWidth = ctx.measureText(text).width;
    const mpdButton = mpdButtons[button];

    let x = mpdButton.x + xDeviation;
    let y = mpdButton.y + yDeviation;

    if (button.substring(0,1) === "T") {
        x += (mpdButton.width / 2) - (textWidth / 2);
        y += 113;
    } else if (button.substring(0,1) === "L") {
        x += 100;
        y += (mpdButton.height / 2) + (fontSize / 4);
    } else if (button.substring(0,1) === "B") {
        x += (mpdButton.width / 2) - (textWidth / 2);
        y -= 60;
    } else if (button.substring(0,1) === "R") {
        x -= 60 + textWidth;
        y += (mpdButton.height / 2) + (fontSize / 4);
    }

    ctx.fillStyle = "black";
    ctx.fillRect(x, y - fontSize + 3, textWidth, fontSize - 3);

    ctx.fillStyle = "#06dd0d";
    ctx.fillText(text, x, y);
    // ctx.fillText(text, x+0.5, y+0.5);
    // ctx.fillText(text, x-0.5, y-0.5);

    if (boxed) {
        ctx.strokeStyle = "#06dd0d";
        ctx.lineWidth = 3;
        if (arrow) { // Need to account for encapsulating the arrow in the box
            ctx.strokeRect(x - 4, y - (fontSize - 3) - 12, textWidth + 8, fontSize + 2 + 13);
        } else {
            ctx.strokeRect(x - 4, y - (fontSize), textWidth + 8, fontSize + 4);
        }
    }

    if (arrow) {
        Draw_Arrow(x, y - 20, textWidth - 6);
    }
}

function Draw_Menu(topMenuObj, tsd = false){
    for (let key in topMenuObj) {
        Draw_Special_Text(topMenuObj[key].text, key,  topMenuObj[key].boxed, topMenuObj[key].arrow, topMenuObj[key].xDeviation, topMenuObj[key].yDeviation);
        if (key === "T3" && tsd) {
            // AC Heading START
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.roundRect(screen.x + screen.w / 2 - 50 / 2, screen.y + (ctx.lineWidth / 2), 50, 30, 10);
            ctx.fill();
            ctx.stroke();
            Draw_Text("300", screen.x + screen.w / 2 - 18, screen.y + 25, 22);
            // AC Heading END
        }
    }
}

function Draw_TSD_Bottom_Menu(tsdBoxed = false, mapBoxed = false, routeBoxed = false, pointBoxed = false) {
    Draw_Special_Text("TSD", "B1", tsdBoxed);

    Draw_Special_Text("PHASE", "B2", false, false, 0, -20);
    Draw_Special_Text(DTC_Structure["TSD"]["SETTINGS"]["DEFAULT_PHASE"], "B2", true);

    Draw_Special_Text("BAM", "B3", false, true, -10);

    // WP Azimuth START
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.roundRect(screen.x + (screen.w / 2) - (45 / 2), screen.y + screen.h - 26 - 10, 45, 26, 10);
    ctx.fill();
    ctx.stroke();
    Draw_Text("0", screen.x + (screen.w / 2) + 6, screen.y + screen.h - 36 + 20, 18);
    // WP Azimuth END

    Draw_Special_Text("MAP", "B4", mapBoxed, true, 10);

    Draw_Special_Text("RTE", "B5", routeBoxed, true);

    Draw_Special_Text("POINT", "B6", pointBoxed, true);
}

function Draw_TSD_Grid() {
    if (!DTC_Structure["TSD"]["SETTINGS"]["MAP"]["GRID"]) {
        return null;
    }

    ctx.lineWidth = 1;
    if (DTC_Structure["TSD"]["SETTINGS"]["MAP"]["TYPE"] === "STICK") {
        ctx.strokeStyle = "#039309";
    } else {
        ctx.strokeStyle = "#000";
    }
    

    // VERTICAL
    for (let i = screen.x + 60; i <= 805; i += 138) {
        ctx.beginPath();
        ctx.moveTo(i, screen.y);
        ctx.lineTo(i, screen.y + screen.h);
        ctx.stroke();
    }
    //VERTICAL

    // HORIZONTAL
    for (let i = screen.y + 60; i <= 805; i += 138) {
        ctx.beginPath();
        ctx.moveTo(screen.x, i);
        ctx.lineTo(screen.x + screen.w, i);
        ctx.stroke();
    }
    // HORIZONTAL
}

function Draw_TSD_HSI() {
    const currentPhase = DTC_Structure["TSD"]["SETTINGS"]["DEFAULT_PHASE"];
    if (!DTC_Structure["TSD"]["SETTINGS"]["SHOW"][currentPhase]["HSI"]) {
        return null;
    }
    if (DTC_Structure["TSD"]["SETTINGS"]["MAP"]["CTR"]) {
        ctx.drawImage(TSD_compassrose, screen.x + screen.w / 2 - (350 / 2), (screen.y + screen.h / 2) - (350 / 2), 350, 350);
    } else {
        ctx.drawImage(TSD_compassrose, screen.x + screen.w / 2 - (350 / 2), (screen.y + screen.h / 2 + 138) - (350 / 2), 350, 350);
    }
}

function Draw_TSD_Ownship() {
    if (DTC_Structure["TSD"]["SETTINGS"]["MAP"]["CTR"]) {
        ctx.drawImage(TSD_ownship, screen.x + screen.w / 2 - 25, screen.y + screen.h / 2 - 16, 50, 50); // -16 to get center dot of icon
    } else {
        ctx.drawImage(TSD_ownship, screen.x + screen.w / 2 - 25, (screen.y + screen.h / 2 + 138) - 16, 50, 50); // 138 is grid spacing
    }

    Draw_TSD_HSI();
}

function Draw_Options_Box(x, y, w, h, align = "left", prompt = "options") {
    ctx.clearRect(x, y, w, h);
    Draw_Screen_Background();
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, w, h);

    ctx.strokeStyle = "#06dd0d";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(x, y + (ctx.lineWidth / 2));
    ctx.lineTo(x + w, y + (ctx.lineWidth / 2));

    if (align === "left") {
        ctx.moveTo(x + w, y);
        ctx.lineTo(x + w, y + h);
    } else if (align === "right") {
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + h);
    }

    ctx.moveTo(x + w, y + h - (ctx.lineWidth / 2));
    ctx.lineTo(x, y + h - (ctx.lineWidth / 2));
    ctx.stroke();

    // Draw Prompt Text
    const textCenterlineY = ((prompt.length - 1) * 14) / 2;
    const boxCenter = {x: x + w, y: y + (h / 2) - textCenterlineY};
    const xAlign = 4.7; // Really 4.78 (this is based on ctx.measureText("o").width / 2

    ctx.fillStyle = "#000";
    if (align === "left") {
        ctx.fillRect(boxCenter.x - xAlign, boxCenter.y - 15, 15, textCenterlineY * 2 + 16);
    } else if (align === "right") {
        ctx.fillRect(x + xAlign, boxCenter.y - 15, -15, textCenterlineY * 2 + 16);
    }

    for (let i = 0; i < prompt.length; i++) {
        const textWidth = ctx.measureText(prompt[i]).width / 2;
        if (align === "left") {
            Draw_Text(prompt[i], (boxCenter.x - (ctx.lineWidth / 2) - textWidth) + xAlign, boxCenter.y + (i * 14), 17);
        } else if (align === "right") {
            Draw_Text(prompt[i], (x + (ctx.lineWidth / 2) - textWidth) - xAlign, boxCenter.y + (i * 14), 17);
        }
    }
}

function Fit_Text_To_Bounds(text, bounds, recursionAmplifier = 0) {
    // This function isn't perfect, but it's good enough...
    const measuredText = ctx.measureText(text).actualBoundingBoxRight;
    if (bounds > measuredText) {
        return text;
    } else {
        return Fit_Text_To_Bounds(text.substring(recursionAmplifier, text.length), bounds, recursionAmplifier += 1);
    }
}
function Draw_User_Input_Dialog(){
    ctx.font = "22px Apache"; // Define this here so we can get textWidth
    const kuText = document.getElementById("KU").value;
    let finalizedText = inputPrompt + kuText;
    const measuredText = ctx.measureText(finalizedText);
    const rectBeginX = screen.x + (screen.w / 2) / 2;
    const rectBeginY = screen.y + (screen.h / 2) - 20; // -20 accounting for height / 2
    ctx.clearRect(rectBeginX - 10, rectBeginY, screen.w / 2 + 20, 40);
    Draw_Screen_Background();
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.roundRect(rectBeginX, rectBeginY, screen.w / 2, 40, 10);
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#06dd0d";
    ctx.stroke();
    
    ctx.fillStyle = "#06dd0d"; // MPD green
    ctx.fillText(Fit_Text_To_Bounds(finalizedText, screen.w / 2), rectBeginX + measuredText.actualBoundingBoxLeft + 5, screen.y + (screen.h / 2) + measuredText.actualBoundingBoxAscent / 2);
}

function Draw_TSD_Point_Data() {
    const measuredText = ctx.measureText("W");
    const boxWidth = 500;
    const rectBeginX = (screen.x + screen.w / 2) - boxWidth / 2;
    const rectBeginY = screen.y + screen.h - 150; // -20 accounting for height / 2

    const waypoints = DTC_Structure["TSD"]["WAYPOINTS"];
    const control_measures = DTC_Structure["TSD"]["CONTROLMEASURES"];
    const targets = DTC_Structure["TSD"]["TARGETS"];
        // lastPoint = "W" + (waypoints.length < 10 ? waypoints.length.toString().padStart(2, "0") : waypoints.length);
        // lastPoint = "C" + (control_measures.length + 50).toString();
        // lastPoint = "T" + (targets.length < 10 ? targets.length.toString().padStart(2, "0") : targets.length);
    ctx.roundRect(rectBeginX, rectBeginY, boxWidth, 80, 10);
    ctx.fillStyle = "#000";
    ctx.strokeStyle = "#06dd0d";
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#06dd0d";
    ctx.font = "17px Apache";
    if (pointIndex === 0) {
        ctx.fillText("W" + (waypoints.length < 10 ? (waypoints.length + 1).toString().padStart(2, "0") : waypoints.length + 1) + "    " + (tempData[0] ? tempData[0] : "WP") + "    ###", rectBeginX + measuredText.actualBoundingBoxLeft + 8, rectBeginY + measuredText.fontBoundingBoxAscent + 8);
    } else if (pointIndex === 1) {
        ctx.fillText("H01    TU    ###", rectBeginX + measuredText.actualBoundingBoxLeft + 8, rectBeginY + measuredText.actualBoundingBoxAscent + 8);
    } else if (pointIndex === 2) {
        ctx.fillText("C51    CP    ###", rectBeginX + measuredText.actualBoundingBoxLeft + 8, rectBeginY + measuredText.actualBoundingBoxAscent + 8);
    } else if (pointIndex === 3) {
        ctx.fillText("T01    TG    ###", rectBeginX + measuredText.actualBoundingBoxLeft + 8, rectBeginY + measuredText.actualBoundingBoxAscent + 8);
    }
}