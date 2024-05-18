function MPD_Init(defaultPage = "TSD") {
    // Create canvas element
    const body = document.querySelector("body");
    const canvas = document.createElement("canvas");
    canvas.setAttribute("height", "860");
    canvas.setAttribute("width", "880");
    canvas.id = "mpd";
    canvas.style.background = "#2e2e2e";
    body.appendChild(canvas);
    c = canvas;
    ctx = c.getContext("2d");
    
    // Create input element
    const input = document.createElement("input");
    input.id = "KU";
    input.style.width = "873px";
    input.style.background = "#000";
    input.style.color = "#06dd0d";
    input.style.fontSize = "30px";
    body.appendChild(document.createElement("br"));
    body.appendChild(input);
    KU = input;

    // Create TSD img resources
    const noDisplayImgDiv = document.createElement("div");
    noDisplayImgDiv.style.display = "none";
    body.appendChild(noDisplayImgDiv);
    // Create Background IMG Elements
    const TSD_Img_Resources = {
        TSD_Chart: "img/map_chart.png", TSD_Sat: "img/map_sat.png",
        TSD_DIG_NRM: "img/map_dig.png", TSD_DIG_AC: "img/dig_ac.png",
        TSD_DIG_ELEV: "img/dig_elev.png", TSD_Ownship: "img/TSD_Ownship.svg",
        TSD_CompassRose: "img/TSD_CompassRose.svg"
    };
    for (let BG in TSD_Img_Resources) {
        const imgElement = document.createElement("img");
        imgElement.id = BG;
        imgElement.src = TSD_Img_Resources[BG];
        noDisplayImgDiv.appendChild(imgElement);
        window[`${BG}`] = imgElement;
    }
    
    // MPD Buttons
    const specialButtons = {TSD: null, COM: null, FCR: null, VID: null, AC: null, WPN: null, B1: "M"};
    for (let button in mpdButtons) { // Draw buttons
        if (typeof specialButtons[button] !== "undefined") {
            const text = (button === "AC" ? "A/C" : (button === "B1" ? "M" : button));
            ctx.fillStyle = "#141414"; // Button color
            ctx.fillRect(mpdButtons[button].x, mpdButtons[button].y, mpdButtons[button].width, mpdButtons[button].height);
            ctx.fillStyle = "#fff";
            ctx.font = "30px Monospace, Monospace";
            const textHeight = ctx.measureText(text).actualBoundingBoxAscent;
            const textWidth = ctx.measureText(text).width;
            ctx.fillText(text, mpdButtons[button].x + ((mpdButtons[button].width - textWidth) / 2), mpdButtons[button].y + (40 - textHeight / 2));
        } else {
            ctx.fillStyle = "#889bab"; // Button color
            ctx.fillRect(mpdButtons[button].x, mpdButtons[button].y, mpdButtons[button].width, mpdButtons[button].height);
            ctx.fillStyle = "#fff"; // Button circle color
            ctx.beginPath();
            ctx.arc(mpdButtons[button].x + 20, mpdButtons[button].y + 20, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    // Create event for clicks on MPD buttons
    c.addEventListener('click', function(evt) {
        let mousePos = getMousePos(c, evt);

        for (let button in mpdButtons) {
            if (isInside(mousePos, mpdButtons[button])) {
                button_commands[button]();
                lastButton = button;
                break;
            }
        }

        if (inputReady) {
            if (isInside(mousePos, {x: screen.x + (screen.w / 2) / 2, y: screen.y + (screen.h / 2) - 20, width: screen.w / 2, height: 40})) {
                // KU.focus();
            }
        }
    }, false);

    // Draw button lines T1 thru T6
    for (let i = 1; i <= 6; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.moveTo(mpdButtons["T" + i.toString()].x + 20, mpdButtons["T" + i.toString()].y + 42);
        ctx.lineTo(mpdButtons["T" + i.toString()].x + 20, screen.y);
        ctx.stroke();
    }

    // Draw button lines L1 thru L6
    for (let i = 1; i <= 6; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.moveTo(mpdButtons["L" + i.toString()].x + 42, mpdButtons["L" + i.toString()].y + 20);
        ctx.lineTo(screen.x, mpdButtons["L" + i.toString()].y + 20);
        ctx.stroke();
    }

    // Draw button lines R1 thru R6
    for (let i = 1; i <= 6; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.moveTo(mpdButtons["R" + i.toString()].x - 2, mpdButtons["R" + i.toString()].y + 20);
        ctx.lineTo(screen.x + screen.w, mpdButtons["R" + i.toString()].y + 20);
        ctx.stroke();
    }

    // Draw button lines B1 thru B6
    for (let i = 1; i <= 6; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.moveTo(mpdButtons["B" + i.toString()].x + 20, mpdButtons["B" + i.toString()].y - 2);
        ctx.lineTo(mpdButtons["B" + i.toString()].x + 20, screen.y + screen.h);
        ctx.stroke();
    }
    
    Load_Page(defaultPage); // Load the specified page
}

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
    const mapType = Database["TSD"]["SETTINGS"]["MAP"]["TYPE"];
    const colorBand = Database["TSD"]["SETTINGS"]["MAP"]["COLOR_BAND"];
    ctx.globalCompositeOperation = 'destination-over';
    Draw_TSD_Grid();
    if (mapType === "CHART") {
        ctx.drawImage(TSD_Chart, screen.x, screen.y, 670, 670);
    } else if (mapType === "SAT") {
        ctx.drawImage(TSD_Sat, screen.x, screen.y, 670, 670);
    } else if (mapType === "DIG") {
        if (colorBand === "NONE") {
            ctx.drawImage(TSD_DIG_NRM, screen.x, screen.y, 670, 670);
        } else if (colorBand === "AC") {
            ctx.drawImage(TSD_DIG_AC, screen.x, screen.y, 670, 670);
        } else if (colorBand === "ELEV") {
            ctx.drawImage(TSD_DIG_ELEV, screen.x, screen.y, 670, 670);
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
    Draw_Special_Text(Database["TSD"]["SETTINGS"]["DEFAULT_PHASE"], "B2", true);

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
    if (!Database["TSD"]["SETTINGS"]["MAP"]["GRID"]) {
        return null;
    }

    ctx.lineWidth = 1;
    if (Database["TSD"]["SETTINGS"]["MAP"]["TYPE"] === "STICK") {
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
    const currentPhase = Database["TSD"]["SETTINGS"]["DEFAULT_PHASE"];
    if (!Database["TSD"]["SETTINGS"]["SHOW"][currentPhase]["HSI"]) {
        return null;
    }
    if (Database["TSD"]["SETTINGS"]["MAP"]["CTR"]) {
        ctx.drawImage(TSD_CompassRose, screen.x + screen.w / 2 - (350 / 2), (screen.y + screen.h / 2) - (350 / 2), 350, 350);
    } else {
        ctx.drawImage(TSD_CompassRose, screen.x + screen.w / 2 - (350 / 2), (screen.y + screen.h / 2 + 138) - (350 / 2), 350, 350);
    }
}

function Draw_TSD_Ownship() {
    if (Database["TSD"]["SETTINGS"]["MAP"]["CTR"]) {
        ctx.drawImage(TSD_Ownship, screen.x + screen.w / 2 - 25, screen.y + screen.h / 2 - 16, 50, 50); // -16 to get center dot of icon
    } else {
        ctx.drawImage(TSD_Ownship, screen.x + screen.w / 2 - 25, (screen.y + screen.h / 2 + 138) - 16, 50, 50); // 138 is grid spacing
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
    const rectBeginY = screen.y + screen.h - 150;

    const waypoints = Database["TSD"]["WAYPOINTS"];
    const control_measures = Database["TSD"]["CONTROLMEASURES"];
    const targets = Database["TSD"]["TARGETS"];
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