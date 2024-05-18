let DTC_Structure = {
    TSD:{
        WAYPOINTS: [
            
        ],
        HAZARDS: [
            
        ],
        CONTROLMEASURES: [
            
        ],
        TARGETS: [
            
        ],
        SETTINGS:{
            MAP:{
                ORIENT: "TRK-UP",
                COLOR_BAND: "NONE",
                TYPE: "CHART",
                CTR: false,
                GRID: true
            },
            SHOW:{
                ATK:{
                    HSI: false,
                    ENDR: true,
                    WIND: true,
                    CURRENT_ROUTE: false,
                    INACTIVE_ZONES: true,
                    FCR_TGTS_OBSTACLES: true,
                    CPG_CURSOR: false,
                    CURSOR_INFO: false,
                    COORD_SHOW: {
                        CONTROL_MEASURES: true,
                        FRIENDLY_UNITS: true,
                        ENEMY_UNITS: false,
                        PLANNED_TGTS_THREATS: true,
                        SHOT: true // TODO: Add SHOT option to DCS backend
                    }
                },
                NAV:{
                    HSI: false,
                    ENDR: true,
                    WIND: true,
                    WP_DATA: true,
                    INACTIVE_ZONES: false,
                    OBSTACLES: true,
                    CPG_CURSOR: false,
                    CURSOR_INFO: false,
                    COORD_SHOW: {
                        CONTROL_MEASURES: true,
                        FRIENDLY_UNITS: false,
                        ENEMY_UNITS: false,
                        PLANNED_TGTS_THREATS: false
                    }
                }
            },
            DEFAULT_PHASE: "NAV"
        }
    }
};

let tempVariables = {
    
};

const button_commands_empty = {
    L1: function () {
        // Nothing
    },
    L2: function () {
        // Nothing
    },
    L3: function () {
        // Nothing
    },
    L4: function () {
        // Nothing
    },
    L5: function () {
        // Nothing
    },
    L6: function () {
        // Nothing
    },
    B1: function () {
        // Nothing
    },
    B2: function () {
        // Nothing
    },
    B3: function () {
        // Nothing
    },
    B4: function () {
        // Nothing
    },
    B5: function () {
        // Nothing
    },
    B6: function () {
        // Nothing
    },
    R1: function () {
        // Nothing
    },
    R2: function () {
        // Nothing
    },
    R3: function () {
        // Nothing
    },
    R4: function () {
        // Nothing
    },
    R5: function () {
        // Nothing
    },
    R6: function () {
        // Nothing
    },
    T6: function () {
        // Nothing
    },
    T5: function () {
        // Nothing
    },
    T4: function () {
        // Nothing
    },
    T3: function () {
        // Nothing
    },
    T2: function () {
        // Nothing
    },
    T1: function () {
        // Nothing
    }
};

let button_commands = {};

const horizSpacing = 85;
const vertSpacing = 85;

const HorizRow = {x: 210, y: 10};
const VertRow = {x: 20, y: 180};

const screen = {x: 880 / 2 - 670 / 2, y: 860 / 2 - 670 / 2, w: 670, h: 670}

const mpdButtons = {
    T1: {
        x: HorizRow.x,
        y: HorizRow.y,
        width: 40,
        height: 40
    },
    T2: {
        x: HorizRow.x + (horizSpacing),
        y: HorizRow.y,
        width: 40,
        height: 40
    },
    T3: {
        x: HorizRow.x + (horizSpacing * 2),
        y: HorizRow.y,
        width: 40,
        height: 40
    },
    T4: {
        x: HorizRow.x + (horizSpacing * 3),
        y: HorizRow.y,
        width: 40,
        height: 40
    },
    T5: {
        x: HorizRow.x + (horizSpacing * 4),
        y: HorizRow.y,
        width: 40,
        height: 40
    },
    T6: {
        x: HorizRow.x + (horizSpacing * 5),
        y: HorizRow.y,
        width: 40,
        height: 40
    },
    L1: {
        x: VertRow.x,
        y: VertRow.y,
        width: 40,
        height: 40
    },
    L2: {
        x: VertRow.x,
        y: VertRow.y + (vertSpacing),
        width: 40,
        height: 40
    },
    L3: {
        x: VertRow.x,
        y: VertRow.y + (vertSpacing * 2),
        width: 40,
        height: 40
    },
    L4: {
        x: VertRow.x,
        y: VertRow.y + (vertSpacing * 3),
        width: 40,
        height: 40
    },
    L5: {
        x: VertRow.x,
        y: VertRow.y + (vertSpacing * 4),
        width: 40,
        height: 40
    },
    L6: {
        x: VertRow.x,
        y: VertRow.y + (vertSpacing * 5),
        width: 40,
        height: 40
    },
    FCR: {
        x: VertRow.x - 15,
        y: VertRow.y + (vertSpacing * 6),
        width: 55,
        height: 40
    },
    WPN: {
        x: VertRow.x - 15,
        y: VertRow.y + (vertSpacing * 7),
        width: 55,
        height: 40
    },
    TSD: {
        x: HorizRow.x - horizSpacing - 15,
        y: HorizRow.y + 800,
        width: 55,
        height: 40
    },
    B1: {
        x: HorizRow.x,
        y: HorizRow.y + 800,
        width: 40,
        height: 40
    },
    B2: {
        x: HorizRow.x + (horizSpacing),
        y: HorizRow.y + 800,
        width: 40,
        height: 40
    },
    B3: {
        x: HorizRow.x + (horizSpacing * 2),
        y: HorizRow.y + 800,
        width: 40,
        height: 40
    },
    B4: {
        x: HorizRow.x + (horizSpacing * 3),
        y: HorizRow.y + 800,
        width: 40,
        height: 40
    },
    B5: {
        x: HorizRow.x + (horizSpacing * 4),
        y: HorizRow.y + 800,
        width: 40,
        height: 40
    },
    B6: {
        x: HorizRow.x + (horizSpacing * 5),
        y: HorizRow.y + 800,
        width: 40,
        height: 40
    },
    AC: {
        x: HorizRow.x + (horizSpacing * 6),
        y: HorizRow.y + 800,
        width: 55,
        height: 40
    },
    R1: {
        x: VertRow.x + 800,
        y: VertRow.y,
        width: 40,
        height: 40
    },
    R2: {
        x: VertRow.x + 800,
        y: VertRow.y + (vertSpacing),
        width: 40,
        height: 40
    },
    R3: {
        x: VertRow.x + 800,
        y: VertRow.y + (vertSpacing * 2),
        width: 40,
        height: 40
    },
    R4: {
        x: VertRow.x + 800,
        y: VertRow.y + (vertSpacing * 3),
        width: 40,
        height: 40
    },
    R5: {
        x: VertRow.x + 800,
        y: VertRow.y + (vertSpacing * 4),
        width: 40,
        height: 40
    },
    R6: {
        x: VertRow.x + 800,
        y: VertRow.y + (vertSpacing * 5),
        width: 40,
        height: 40
    },
    VID: {
        x: VertRow.x + 800,
        y: VertRow.y + (vertSpacing * 6),
        width: 55,
        height: 40
    },
    COM: {
        x: VertRow.x + 800,
        y: VertRow.y + (vertSpacing * 7),
        width: 55,
        height: 40
    }
};

const page_definitions = {
    TSD: function () {
        currentPage = "TSD";
        button_commands = {...button_commands_empty, ...TSD_Buttons}; // Set appropriate button profile for the page

        Clear_Screen();
        Draw_Screen_Background();
        Draw_TSD_Grid();
        Draw_TSD_Ownship();
        
        Draw_Menu({
            T1: {
                text: "RPT",
                arrow: true,
            },
            T2: {
                text: "PAN",
                arrow: true,
            },
            T3: {
                text: "SHOW",
                arrow: true,
                xDeviation: -15
            },
            T4: {
                text: "PP",
                xDeviation: 15
            },
            T5: {
                text: "COORD",
                arrow: true
            },
            T6: {
                text: "UTIL",
                arrow: true
            }
        }, true);
        
        Draw_Menu({
            L1: {
                text: "INST",
                arrow: true
            },
            L6: {
                text: "SA",
                boxed: true
            }
        });
        
        Draw_TSD_Bottom_Menu(true);
        
        Draw_Menu({
            R3: {
                text: "CTR",
                boxed: DTC_Structure["TSD"]["SETTINGS"]["MAP"]["CTR"]
            },
            R4: {
                text: "FRZ"
            },
            R5: {
                text: "CAQ"
            }
        });

        // ACQ
        Draw_Special_Text("ACQ", "R6", false, false, 0, -12);
        Draw_Special_Text("TADS", "R6", true, false, 0, 12);
    },
    MAP: function () {
        currentPage = "MAP";
        button_commands = {...button_commands_empty, ...TSD_Buttons, ...MAP_Buttons}; // Inherit other profiles first...
        const map_type = DTC_Structure["TSD"]["SETTINGS"]["MAP"]["TYPE"];
        
        Clear_Screen();
        Draw_Screen_Background();
        Draw_TSD_Ownship();
        
        Draw_Menu({
            T1: {
                text: "RPT",
                arrow: true
            },
            T2: {
                text: "PAN",
                arrow: true
            },
            T3: {
                text: "SHOW",
                arrow: true,
                xDeviation: -15
            },
            T5: {
                text: "GRID",
                boxed: DTC_Structure["TSD"]["SETTINGS"]["MAP"]["GRID"]
            },
            T6: {
                text: "SLOPE",
                xDeviation: -15
            }
        }, true);
        
        Draw_Menu({
            T6: {
                text: "SHADE",
                xDeviation: -15,
                yDeviation: 15
            }
        });
        
        if (DTC_Structure["TSD"]["SETTINGS"]["MAP"]["TYPE"] !== "STICK") {
            if (DTC_Structure["TSD"]["SETTINGS"]["MAP"]["TYPE"] === "DIG") {
                ctx.strokeRect(mpdButtons.T6.x + (mpdButtons.T6.width / 2) - (55 / 2) - 15, screen.y + 11, 55, 36);
                Draw_Special_Text("GRAY", "T4", true, false, 15);
            }
        }
        
        Draw_Special_Text("TYPE", "L2", false, false, 0, -12);
        Draw_Special_Text(map_type, "L2", true, false, 0, 12);
        
        if (map_type === "CHART") {
            Draw_Special_Text("SCALE", "L3", false, false, 0, -12);
            Draw_Special_Text("1:250K", "L3", true, false, 0, 12);

            Draw_Special_Text("COLOR BAND", "L4", false, false, 0, -12);
            Draw_Special_Text("NONE", "L4", true, false, 0, 12);
        } else if (map_type === "DIG") {
            Draw_Special_Text("LEVEL", "L3", false, false, 0, -12);
            Draw_Special_Text("0", "L3", true, false, 0, 12);
            
            Draw_Special_Text("COLOR BAND", "L4", false, false, 0, -12);
            Draw_Special_Text((DTC_Structure["TSD"]["SETTINGS"]["MAP"]["COLOR_BAND"] === "AC" ? "A/C" : DTC_Structure["TSD"]["SETTINGS"]["MAP"]["COLOR_BAND"]), "L4", true, false, 0, 12);
            
            Draw_Special_Text("CONTOURS", "L5", false, false, 0, -12);
            Draw_Special_Text("NONE", "L5", true, false, 0, 12);
            
            Draw_Special_Text("FFD", "L6", false, false, 0, -12);
            Draw_Special_Text("NONE", "L6", true, false, 0, 12);
        }
        
        Draw_TSD_Bottom_Menu(false, true);
        
        Draw_Menu({
            R3: {
                text: "CTR",
                boxed: DTC_Structure["TSD"]["SETTINGS"]["MAP"]["CTR"]
            },
            R4: {
                text: "FRZ"
            }
        });
        
        Draw_Special_Text("ORIENT", "R5", false, false, 0, -12);
        Draw_Special_Text(DTC_Structure["TSD"]["SETTINGS"]["MAP"]["ORIENT"], "R5", true, false, 0, 12);
        
        Draw_Special_Text("VIEW", "R6", false, false, 0, -12);
        Draw_Special_Text("2D", "R6", true, false, 0, 12);
    },
    SHOW: function () {
        currentPage = "SHOW";
        button_commands = {...button_commands_empty, ...TSD_Buttons, ...SHOW_Buttons};
        const phase = DTC_Structure["TSD"]["SETTINGS"]["DEFAULT_PHASE"];
        const NAV = DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["NAV"];
        const ATK = DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["ATK"];

        Clear_Screen();
        Draw_Screen_Background();
        Draw_TSD_Grid();
        Draw_TSD_Ownship();

        Draw_Menu({
            T1: {
                text: "RPT",
                arrow: true
            },
            T2: {
                text: "PAN",
                arrow: true
            },
            T3: {
                text: "SHOW",
                boxed: true,
                arrow: true,
                xDeviation: -15
            },
            T4: {
                text: "SA",
                xDeviation: 15
            }
        }, true);
        
        // SA Button Header (T4)
        ctx.fillStyle = "#039309";
        ctx.fillRect(mpdButtons.T4.x + (mpdButtons.T4.width / 2) - (40 / 2) + 15, screen.y, 40, 10);
        
        Draw_Special_Text("THRT", "T5", false, true);
        Draw_Special_Text("SHOW", "T5", false, false, 0, 16);
        
        Draw_Special_Text("COORD", "T6", false, true);
        Draw_Special_Text("SHOW", "T6", false, false, 0, 16);
        
        if (phase === "NAV") {
            Draw_Menu({
                L2: {
                    text: "WAYPOINT DATA",
                    boxed: NAV["WP_DATA"]
                },
                L3: {
                    text: "INACTIVE ZONES",
                    boxed: NAV["INACTIVE_ZONES"]
                },
                L4: {
                    text: "OBSTACLES",
                    boxed: NAV["OBSTACLES"]
                },
                L5: {
                    text: "PLT/CPG CURSOR",
                    boxed: NAV["CPG_CURSOR"]
                },
                L6: {
                    text: "CURSR INFO",
                    boxed: NAV["CURSOR_INFO"]
                },
                R4: {
                    text: "HSI",
                    boxed: NAV["HSI"]
                },
                R5: {
                    text: "ENDR",
                    boxed: NAV["ENDR"]
                },
                R6: {
                    text: "WIND",
                    boxed: NAV["WIND"]
                }
            });
        } else {
            Draw_Menu({
                L2: {
                    text: "CURRENT ROUTE",
                    boxed: ATK["CURRENT_ROUTE"]
                },
                L3: {
                    text: "INACTIVE ZONES",
                    boxed: ATK["INACTIVE_ZONES"]
                },
                L4: {
                    text: "FCR TGTS/OBSTACLES",
                    boxed: ATK["FCR_TGTS_OBSTACLES"]
                },
                L5: {
                    text: "PLT/CPG CURSOR",
                    boxed: ATK["CPG_CURSOR"]
                },
                L6: {
                    text: "CURSR INFO",
                    boxed: ATK["CURSOR_INFO"]
                },
                R4: {
                    text: "HSI",
                    boxed: ATK["HSI"]
                },
                R5: {
                    text: "ENDR",
                    boxed: ATK["ENDR"]
                },
                R6: {
                    text: "WIND",
                    boxed: ATK["WIND"]
                }
            });
        }
        Draw_TSD_HSI();
        Draw_TSD_Bottom_Menu();
    },
    THRT_SHOW: function () {
        currentPage = "THRT_SHOW";
        button_commands = {...button_commands_empty, ...TSD_Buttons, ...THRT_SHOW_Buttons};

        Clear_Screen();
        Draw_Screen_Background();
        Draw_TSD_Ownship();
        
        // 
        
        Draw_TSD_Bottom_Menu();
    },
    COORD_SHOW: function () {
        currentPage = "COORD_SHOW";
        button_commands = {...button_commands_empty, ...TSD_Buttons, ...SHOW_Buttons, ...COORD_SHOW_Buttons};

        const phase = DTC_Structure["TSD"]["SETTINGS"]["DEFAULT_PHASE"];
        const NAV = DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["NAV"];
        const ATK = DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["ATK"];

        Clear_Screen();
        Draw_Screen_Background();
        Draw_TSD_Ownship();

        Draw_Menu({
            T1: {
                text: "RPT",
                arrow: true
            },
            T2: {
                text: "PAN",
                arrow: true
            },
            T3: {
                text: "SHOW",
                boxed: true,
                arrow: true,
                xDeviation: -15
            },
            T4: {
                text: "SA",
                xDeviation: 15
            }
        }, true);

        // SA Button Header (T4)
        ctx.fillStyle = "#039309";
        ctx.fillRect(mpdButtons.T4.x + (mpdButtons.T4.width / 2) - (40 / 2) + 15, screen.y, 40, 10);

        Draw_Special_Text("THRT", "T5", false, true);
        Draw_Special_Text("SHOW", "T5", false, false, 0, 16);

        Draw_Special_Text("COORD", "T6", false, true);
        Draw_Special_Text("SHOW", "T6", false, false, 0, 16);
        ctx.strokeRect(mpdButtons.T6.x + (mpdButtons.T6.width / 2) - (54 /2), screen.y + ctx.lineWidth / 2, 54, 45); // Coord show boxed
        
        if (phase === "NAV") {
            Draw_Menu({
                L2: {
                    text: "CONTROL MEASURES",
                    boxed: NAV["COORD_SHOW"]["CONTROL_MEASURES"]
                },
                L3: {
                    text: "FRIENDLY UNITS",
                    boxed: NAV["COORD_SHOW"]["FRIENDLY_UNITS"]
                },
                L4: {
                    text: "ENEMY UNITS",
                    boxed: NAV["COORD_SHOW"]["ENEMY_UNITS"]
                },
                L5: {
                    text: "PLANNED TGTS/THREATS",
                    boxed: NAV["COORD_SHOW"]["PLANNED_TGTS_THREATS"]
                }
            });
        } else {
            Draw_Menu({
                L2: {
                    text: "CONTROL MEASURES",
                    boxed: ATK["COORD_SHOW"]["CONTROL_MEASURES"]
                },
                L3: {
                    text: "FRIENDLY UNITS",
                    boxed: ATK["COORD_SHOW"]["FRIENDLY_UNITS"]
                },
                L4: {
                    text: "ENEMY UNITS",
                    boxed: ATK["COORD_SHOW"]["ENEMY_UNITS"]
                },
                L5: {
                    text: "PLANNED TGTS/THREATS",
                    boxed: ATK["COORD_SHOW"]["PLANNED_TGTS_THREATS"]
                },
                R3: {
                    text: "SHOT",
                    boxed: ATK["COORD_SHOW"]["SHOT"]
                },
            });
        }
        
        // R1/R2 Bullshit START
        Draw_Special_Text("LINES", "R1");
        Draw_Special_Text("AREAS", "R2");
        ctx.fillStyle = "#039309";
        ctx.fillRect(screen.x + screen.w, mpdButtons.R1.y, -10, 40);
        ctx.fillRect(screen.x + screen.w, mpdButtons.R2.y, -10, 40);
        // R1/R2 Bullshit END
        
        // Phase Identifier START
        let text = null;
        let textWidth = null;
        ctx.font = "17px Apache";
        if (phase === "NAV") {
            text = "NAVIGATION PHASE";
            textWidth = ctx.measureText(text).width;
        } else {
            text = "ATTACK PHASE";
            textWidth = ctx.measureText(text).width;
        }
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.roundRect(screen.x + screen.w / 2 - ((textWidth + 10) / 2), screen.y + 54, textWidth + 10, 20, 8);
        ctx.fill();
        ctx.stroke();
        Draw_Text(text, screen.x + screen.w / 2 - ((textWidth + 10) / 2) + ((textWidth + 10 - textWidth) / 2), screen.y + 54 + ctx.measureText(text).actualBoundingBoxAscent + 4, 17);
        // Phase Identifier END
        
        Draw_TSD_Bottom_Menu();
    },
    TSD_POINT: function () {
        currentPage = "TSD_POINT";
        button_commands = {...button_commands_empty, ...TSD_Buttons, ...TSD_POINT_Buttons};
        
        const waypoints = DTC_Structure["TSD"]["WAYPOINTS"];
        const control_measures = DTC_Structure["TSD"]["CONTROLMEASURES"];
        const targets = DTC_Structure["TSD"]["TARGETS"];
        let lastPoint = null;
        if (waypoints.length !== 0) {
            lastPoint = "W" + (waypoints.length < 10 ? waypoints.length.toString().padStart(2, "0") : waypoints.length);
        } else if (control_measures.length !== 0) {
            lastPoint = "C" + (control_measures.length + 50).toString();
        } else if (targets.length !== 0) {
            lastPoint = "T" + (targets.length < 10 ? targets.length.toString().padStart(2, "0") : targets.length);
        } else {
            lastPoint = "?";
        }

        Clear_Screen();
        Draw_Screen_Background();
        Draw_TSD_Ownship();

        Draw_Menu({
            T1: {
                text: "RPT",
                arrow: true
            },
            T2: {
                text: "PAN",
                arrow: true
            },
            T3: {
                text: "SHOW",
                arrow: true,
                xDeviation: -15
            },
            T4: {
                text: "ABR",
                arrow: true,
                xDeviation: 15
            },
            T5: {
                text: "COORD",
                arrow: true
            },
            T6: {
                text: "UTIL",
                arrow: true
            }
        }, true);

        Draw_Menu({
            L1: {
                text: "POINT>",
                yDeviation: -12
            },
            L2: {
                text: "ADD"
            },
            L4: {
                text: "DEL"
            },
            L5: {
                text: "STO"
            },
            L6: {
                text: "XMIT"
            },
            R3: {
                text: "CTR",
                boxed: DTC_Structure["TSD"]["SETTINGS"]["MAP"]["CTR"]
            },
            R4: {
                text: "FRZ"
            }
        });
        Draw_Menu({
            L1: {
                text: lastPoint,
                yDeviation: 12
            },
        });
        if (lastPoint !== "?") {
            Draw_Menu({
                L3: {
                    text: "EDIT"
                }
            });
        }

        Draw_TSD_Bottom_Menu(false, false, false, true);
    },
    TSD_POINT_ADD: function (setPointIndex) {
        currentPage = "TSD_POINT_ADD";
        button_commands = {...button_commands_empty, ...TSD_Buttons, ...TSD_POINT_ADD_Buttons};

        pointIndex = (setPointIndex === null ? 0 : setPointIndex);
        const pageVariables = {
            pointType: ["WP", "HZ", "CM", "TG"],
            IDENT: ["WP", "TU", "CP", "TG"]
        };

        Clear_Screen();
        Draw_Screen_Background();
        Draw_TSD_Ownship();

        Draw_Menu({
            T1: {
                text: "RPT",
                arrow: true,
            },
            T2: {
                text: "PAN",
                arrow: true,
            },
            T3: {
                text: "SHOW",
                arrow: true,
                xDeviation: -15
            },
            T4: {
                text: "ABR",
                arrow: true,
                xDeviation: 15
            },
            T5: {
                text: "COORD",
                arrow: true
            },
            T6: {
                text: "UTIL",
                arrow: true
            },
            L1: {
                text: "POINT>",
                yDeviation: -12
            },
            L2: {
                text: "ADD",
                boxed: true
            },
            L3: {
                text: "WP",
                boxed: (pointIndex === 0)
            },
            L4: {
                text: "HZ",
                boxed: (pointIndex === 1)
            },
            L5: {
                text: "CM",
                boxed: (pointIndex === 2)
            },
            L6: {
                text: "TG",
                boxed: (pointIndex === 3)
            }
        }, true);
        Draw_Menu({
            L1: {
                text: pageVariables.IDENT[pointIndex],
                yDeviation: 12
            },
        });
        
        Draw_TSD_Point_Data();
        
        Draw_TSD_Bottom_Menu(false, false, false, true);
    }
};