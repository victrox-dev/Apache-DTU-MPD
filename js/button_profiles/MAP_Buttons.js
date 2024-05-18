const MAP_Buttons = {
    T5: function () {
        DTC_Structure["TSD"]["SETTINGS"]["MAP"]["GRID"] = !DTC_Structure["TSD"]["SETTINGS"]["MAP"]["GRID"];
        Load_Page(currentPage);
    },
    L2: function () {
        Load_Page(currentPage);
        const height = mpdButtons.L5.y - (mpdButtons.L2.y - horizSpacing);
        ctx.clearRect(screen.x, mpdButtons.L2.y - 20,150, height);
        Draw_Options_Box(screen.x, mpdButtons.L2.y - 20, 100, height, "left", "TYPE");
        Draw_Special_Text("DIG", "L2", (DTC_Structure["TSD"]["SETTINGS"]["MAP"]["TYPE"] === "DIG"));
        Draw_Special_Text("CHART", "L3", (DTC_Structure["TSD"]["SETTINGS"]["MAP"]["TYPE"] === "CHART"));
        Draw_Special_Text("SAT", "L4", (DTC_Structure["TSD"]["SETTINGS"]["MAP"]["TYPE"] === "SAT"));
        Draw_Special_Text("STICK", "L5", (DTC_Structure["TSD"]["SETTINGS"]["MAP"]["TYPE"] === "STICK"));
        button_commands = {...button_commands_empty, ...TSD_Buttons, ...MAP_Buttons, ...MAP_TYPE_Buttons};
    },
    L4: function () {
        if (DTC_Structure["TSD"]["SETTINGS"]["MAP"]["TYPE"] === "DIG") {
            Load_Page(currentPage);
            const height = mpdButtons.L5.y - (mpdButtons.L3.y - horizSpacing);
            ctx.clearRect(screen.x, mpdButtons.L3 - 20,150, height);
            Draw_Options_Box(screen.x, mpdButtons.L3.y - 20, 100, height, "left", "COLOR BAND");
            Draw_Special_Text("A/C", "L3", (DTC_Structure["TSD"]["SETTINGS"]["MAP"]["COLOR_BAND"] === "AC"));
            Draw_Special_Text("ELEV", "L4", (DTC_Structure["TSD"]["SETTINGS"]["MAP"]["COLOR_BAND"] === "ELEV"));
            Draw_Special_Text("NONE", "L5", (DTC_Structure["TSD"]["SETTINGS"]["MAP"]["COLOR_BAND"] === "NONE"));
            button_commands = {...button_commands_empty, ...TSD_Buttons, ...MAP_Buttons, ...MAP_COLOR_BAND_Buttons};
        }
    },
    B4: function () {
        Load_Page("TSD");
    },
    R5: function () {
        Load_Page(currentPage);
        const height = mpdButtons.R6.y - (mpdButtons.R4.y - horizSpacing);
        Draw_Options_Box(screen.x + screen.w - 100, mpdButtons.R4.y - 20, 100, height, "right", "ORIENT");
        Draw_Special_Text("HDG-UP", "R4", (DTC_Structure["TSD"]["SETTINGS"]["MAP"]["ORIENT"] === "HDG-UP"));
        Draw_Special_Text("TRK-UP", "R5", (DTC_Structure["TSD"]["SETTINGS"]["MAP"]["ORIENT"] === "TRK-UP"));
        Draw_Special_Text("N-UP", "R6", (DTC_Structure["TSD"]["SETTINGS"]["MAP"]["ORIENT"] === "N-UP"));
        Draw_Screen_Background();
        button_commands = {...button_commands_empty, ...TSD_Buttons, ...MAP_Buttons, ...MAP_ORIENT_Buttons};
    }
};

const MAP_COLOR_BAND_Buttons = {
    L3: function () {
        DTC_Structure["TSD"]["SETTINGS"]["MAP"]["COLOR_BAND"] = "AC";
        Load_Page(currentPage);
    },
    L4: function () {
        DTC_Structure["TSD"]["SETTINGS"]["MAP"]["COLOR_BAND"] = "ELEV";
        Load_Page(currentPage);
    },
    L5: function () {
        DTC_Structure["TSD"]["SETTINGS"]["MAP"]["COLOR_BAND"] = "NONE";
        Load_Page(currentPage);
    }
};

const MAP_TYPE_Buttons = {
    L2: function () {
        DTC_Structure["TSD"]["SETTINGS"]["MAP"]["TYPE"] = "DIG";
        Load_Page(currentPage);
    },
    L3: function () {
        DTC_Structure["TSD"]["SETTINGS"]["MAP"]["TYPE"] = "CHART";
        Load_Page(currentPage);
    },
    L4: function () {
        DTC_Structure["TSD"]["SETTINGS"]["MAP"]["TYPE"] = "SAT";
        Load_Page(currentPage);
    },
    L5: function () {
        DTC_Structure["TSD"]["SETTINGS"]["MAP"]["TYPE"] = "STICK";
        Load_Page(currentPage);
    }
};

const MAP_ORIENT_Buttons = {
    R4: function () {
        DTC_Structure["TSD"]["SETTINGS"]["MAP"]["ORIENT"] = "HDG-UP";
        Load_Page(currentPage);
    },
    R5: function () {
        DTC_Structure["TSD"]["SETTINGS"]["MAP"]["ORIENT"] = "TRK-UP";
        Load_Page(currentPage);
    },
    R6: function () {
        DTC_Structure["TSD"]["SETTINGS"]["MAP"]["ORIENT"] = "N-UP";
        Load_Page(currentPage);
    }
};