const TSD_POINT_Buttons = {
    // L1: function () {
    //     const point = ["POINT"];
    //     const KU = document.getElementById("KU");
    //     tempData = [...point];
    //     KU.placeholder = tempData[0];
    //     numVars = 1;
    //     KU.focus();
    //     dataReady = true;
    //    
    //     storeData = function () {
    //         // TODO: Validate point exists
    //         tempVariables["SELECTED_POINT"] = tempData[0];
    //     };
    // },
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
        const KU = document.getElementById("KU");
        tempData = [...pointAddSequence];
        KU.placeholder = tempData[0];
        numVars = 4;
        KU.focus();
        inputReady = true;
        
        updateScreen = function () {
            // Draw_TSD_Point_Data();
            // const pointKey = {L3: ["WAYPOINT", "WP"], L4: ["HAZARD", "TU"], L5: ["CONTROL MEASURE", "CP"], L6: ["TARGET", "TG"]};
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
            // L1 UPDATE END
        };
        
        storeData = function () {
            // TODO: Sanitize and remove fields that are null/empty
            const point = {
                IDENT: tempData[0],
                FREE: tempData[1],
                MGRS: tempData[2],
                ALT: tempData[3]
            }
            Database["TSD"][pointIndexKey[pointIndex]].push(point);
        };
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