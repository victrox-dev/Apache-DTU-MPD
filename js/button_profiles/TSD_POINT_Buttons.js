const TSD_POINT_Buttons = {
    L1: function () {
        const point = ["POINT"];
        const KU = document.getElementById("KU");
        tempData = [...point];
        KU.placeholder = tempData[0];
        numVars = 1;
        KU.focus();
        dataReady = true;

        storeData = function () {
            // TODO: Validate point exists
            tempVariables["SELECTED_POINT"] = tempData[0];
        };
    },
    L2: function () {
        Load_Page("TSD_POINT_ADD");
    },
    B6: function () {
        Load_Page("TSD");
    }
};

const TSD_POINT_ADD_Buttons = {
    L1: function () {
        const pointIndexKey = ["WAYPOINTS", "HAZARDS", "CONTROLMEASURES", "TARGETS"];
        tempData = [...["IDENT", "FREE", "MGRS", "ALT"]];
        KU.placeholder = tempData[0];
        numVars = 4;
        KU.focus();
        inputReady = true;
        
        validateInput = function () {
            const WP_IDENTS = ["CC", "LZ", "PP", "RP", "SP", "WP"];
            const HZ_IDENTS = ["TO", "TU", "WL", "WS"];
            const CM_IDENTS = [
                "AP", "AG", "AI", "AL", "F1", "F2", "AA", "BN", "BP", "BR", "BD",
                "CP", "CO", "CR", "DI", "FF", "FM", "FC", "FA", "GL", "HA", "NB",
                "ID", "BE", "RH", "GP", "US",
                "AD", "AS", "AV", "AB", "AM", "CA", "MA", "CF", "DF", "EN", "FW",
                "WF", "FL", "AH", "FG", "HO", "FI", "MI", "MD", "TF", "FU",
                "ES", "EV", "ED", "EB", "EC", "AE", "ME", "CE", "DE", "EE", "WR",
                "EF", "WE", "EK", "HG", "EH", "EI", "EM", "EX", "ET", "EU"
            ];
            const TG_IDENTS = [
                "TG", "AX", "AS", "AD", "GP", "G1", "G2", "G3", "G4", "SD", "83",
                "U", "S6", "AA", "GU", "MK", "SB", "GS", "GT", "ZU", "NV", "SR",
                "TR", "70", "BP", "BH", "CH", "CT", "C2", "HK", "JA", "PT", "RE",
                "RA", "RO", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11",
                "12", "13", "14", "15", "16", "17", "SM", "SC", "SP", "SH", "SS",
                "TC", "ST", "SA", "VU"
            ];
            const identValid = function (identType) {
                if (!KU.value) { return true } // Pass validation if there's no input (accept the A/C default)
                for (let i = 0; i <= identType.length; i++) {
                    if (identType[i] === KU.value.toUpperCase()) {
                        return true;
                    }
                }
                return false;
            };
            switch (numVars) {
                case 4:
                    switch (pointIndex) {
                        case 0:
                            return identValid(WP_IDENTS);
                        case 1:
                            return identValid(HZ_IDENTS);
                        case 2:
                            return identValid(CM_IDENTS);
                        case 3:
                            return identValid(TG_IDENTS);
                    }
                    break;
                case 3:
                    return !KU.value || KU.value.length <= 3;
                case 2:
                    // validate mgrs or lat/long
                    return true;
                case 1:
                    // validate altitude (need to figure it out on DCS)
                    return true;
                default:
                    return true;
            }
        };
        
        updateScreen = function () {
            const pointKey = ["WP", "TU", "CP", "TG"];
            
            // L1 UPDATE START
            ctx.clearRect(screen.x, mpdButtons.L1.y + 20 - 30, 150, 60);
            Draw_Screen_Background();
            Draw_Menu({
                L1: {
                    text: tempData[tempData.length - numVars] + ">",
                    yDeviation: -12
                }
            });
            
            Draw_Menu({
                L1: {
                    text: pointKey[pointIndex],
                    yDeviation: 12
                }
            });

            Draw_TSD_Point_Data();
            // L1 UPDATE END
        };
        
        storeData = function () {
            const point = {
                IDENT: tempData[0],
                FREE: tempData[1],
                MGRS: tempData[2],
                ALT: tempData[3]
            }
            // Cleanup empty fields
            for (let field in point) {
                if (point[field] === null || point[field] === "") {
                    delete point[field];
                }
            }
            // Add the point to the appropriate object
            Database["TSD"][pointIndexKey[pointIndex]].push(point);
        };
        
        // Set initial prompt and information
        inputPrompt = "IDENT: ";
        returnTo = "TSD_POINT";
        updateScreen();
        Draw_User_Input_Dialog();
    },
    L2: function () {
        Load_Page("TSD_POINT");
    },
    L3: function () {
        Load_Page("TSD_POINT_ADD", 0);
    },
    L4: function () {
        Load_Page("TSD_POINT_ADD", 1);
    },
    L5: function () {
        Load_Page("TSD_POINT_ADD", 2);
    },
    L6: function () {
        Load_Page("TSD_POINT_ADD", 3);
    },
    B6: function () {
        Load_Page("TSD");
    }
};