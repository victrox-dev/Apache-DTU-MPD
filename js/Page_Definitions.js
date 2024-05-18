const page_definitions = {
    Menu: function () {
        currentPage = "Menu";
        button_commands = {...button_commands_empty, ...Menu_Buttons};

        Clear_Screen();
        Draw_Screen_Background();
        
        const leftMenuHeight = mpdButtons.L6.y - (mpdButtons.L3.y - horizSpacing);
        Draw_Options_Box(screen.x, mpdButtons.L3.y - 20, 65, leftMenuHeight, "left", "MISSION");
        
        const rightMenuHeight = mpdButtons.R6.y - (mpdButtons.R1.y - horizSpacing);
        Draw_Options_Box(screen.x + screen.w - 80, mpdButtons.L1.y - 20, 80, rightMenuHeight, "right", "COMMUNICATION");
        
        const bottomMenuWidth = mpdButtons.B6.x - (mpdButtons.B2.x - 60);
        Draw_Options_Box(mpdButtons.B2.x - 10, screen.y + screen.h - 48, bottomMenuWidth, 48, "bottom", "AIRCRAFT");
        
        Draw_Menu({
            T1: {
                text: "VIDEO",
                arrow: true
            },
            T2: {
                text: "VCR",
                arrow: true
            },
            L3: {
                text: "ASE",
                arrow: true
            },
            L4: {
                text: "TSD",
                arrow: true
            },
            L5: {
                text: "WPN",
                arrow: true
            },
            L6: {
                text: "FCR",
                arrow: true
            },
            B1: {
                text: "DMS"
            },
            B2: {
                text: "ENG",
                arrow: true
            },
            B3: {
                text: "FLT",
                arrow: true
            },
            B4: {
                text: "FUEL",
                arrow: true
            },
            B5: {
                text: "PERF",
                arrow: true
            },
            B6: {
                text: "UTIL",
                arrow: true
            },
            R1: {
                text: "DL",
                arrow: true
            },
            R2: {
                text: "XPNDR",
                arrow: true
            },
            R3: {
                text: "UHF",
                arrow: true
            },
            R4: {
                text: "FM",
                arrow: true
            },
            R5: {
                text: "HF",
                arrow: true
            },
            R6: {
                text: "COM",
                arrow: true
            }
        });
    },
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
                boxed: Database["TSD"]["SETTINGS"]["MAP"]["CTR"]
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
    TSD_MAP: function () {
        currentPage = "TSD_MAP";
        button_commands = {...button_commands_empty, ...TSD_Buttons, ...MAP_Buttons}; // Inherit other profiles first...
        const map_type = Database["TSD"]["SETTINGS"]["MAP"]["TYPE"];
        
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
                boxed: Database["TSD"]["SETTINGS"]["MAP"]["GRID"]
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
        
        if (Database["TSD"]["SETTINGS"]["MAP"]["TYPE"] !== "STICK") {
            if (Database["TSD"]["SETTINGS"]["MAP"]["TYPE"] === "DIG") {
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
            Draw_Special_Text((Database["TSD"]["SETTINGS"]["MAP"]["COLOR_BAND"] === "AC" ? "A/C" : Database["TSD"]["SETTINGS"]["MAP"]["COLOR_BAND"]), "L4", true, false, 0, 12);
            
            Draw_Special_Text("CONTOURS", "L5", false, false, 0, -12);
            Draw_Special_Text("NONE", "L5", true, false, 0, 12);
            
            Draw_Special_Text("FFD", "L6", false, false, 0, -12);
            Draw_Special_Text("NONE", "L6", true, false, 0, 12);
        }
        
        Draw_TSD_Bottom_Menu(false, true);
        
        Draw_Menu({
            R3: {
                text: "CTR",
                boxed: Database["TSD"]["SETTINGS"]["MAP"]["CTR"]
            },
            R4: {
                text: "FRZ"
            }
        });
        
        Draw_Special_Text("ORIENT", "R5", false, false, 0, -12);
        Draw_Special_Text(Database["TSD"]["SETTINGS"]["MAP"]["ORIENT"], "R5", true, false, 0, 12);
        
        Draw_Special_Text("VIEW", "R6", false, false, 0, -12);
        Draw_Special_Text("2D", "R6", true, false, 0, 12);
    },
    TSD_SHOW: function () {
        currentPage = "TSD_SHOW";
        button_commands = {...button_commands_empty, ...TSD_Buttons, ...SHOW_Buttons};
        const phase = Database["TSD"]["SETTINGS"]["DEFAULT_PHASE"];
        const NAV = Database["TSD"]["SETTINGS"]["SHOW"]["NAV"];
        const ATK = Database["TSD"]["SETTINGS"]["SHOW"]["ATK"];

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

        const phase = Database["TSD"]["SETTINGS"]["DEFAULT_PHASE"];
        const NAV = Database["TSD"]["SETTINGS"]["SHOW"]["NAV"];
        const ATK = Database["TSD"]["SETTINGS"]["SHOW"]["ATK"];

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
        let text, textWidth;
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
        
        const waypoints = Database["TSD"]["WAYPOINTS"];
        const control_measures = Database["TSD"]["CONTROLMEASURES"];
        const targets = Database["TSD"]["TARGETS"];
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
                boxed: Database["TSD"]["SETTINGS"]["MAP"]["CTR"]
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