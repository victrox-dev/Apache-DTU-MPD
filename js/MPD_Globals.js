// General Variables
let c, ctx, KU, currentPage, lastButton = null;
const windowHeight = window.innerHeight - 10;
const scaleMultiplier = windowHeight / 860;
const alignRight = "right";
const alignCenter = "center";

// Apache Font
let apacheFont = new FontFace('Apache', 'url(fonts/AH-64D.ttf)');
apacheFont.load().then(function (font) {
    document.fonts.add(font);
});

// TSD Variables
let pointIndex = null;

// COM Variables
let presetSelected = null;
let freqSelected = null;

// Input Variables
let inputPrompt, returnTo = null;
let tempData = [];
let numVars = 0;
let inputReady = false;
let tempVariables = [];
let blinking = false;
let dialog = null;

// Scripting Dependencies
const scripts = ["js/Drawing_Functions.js", "js/Page_Definitions.js",
    "js/Process_Data.js", "js/button_profiles/TSD_Buttons.js",
    "js/button_profiles/TSD_POINT_Buttons.js", "js/button_profiles/MAP_Buttons.js",
    "js/button_profiles/SHOW_Buttons.js", "js/button_profiles/Menu_Buttons.js",
    "js/button_profiles/COM_Buttons.js"
];

// Button Related Variables
let button_commands = {}; // Baseline buttons for initial load (empty)

const horizSpacing = 84; // Button spacing 84
const vertSpacing = 80; // Button spacing

const HorizRow = {x: 210, y: 10}; // Horizontal MPD buttons start position
const VertRow = {x: 20, y: 190}; // Vertical MPD buttons start position

// MPD screen position and dimensions
const screen = {
    x: 880 / 2 - 670 / 2,
    y: 860 / 2 - 670 / 2,
    w: 670, h: 670
}

// getMousePos for determining MPD button clicks
function getMousePos(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

// isInside checks whether a point is inside a defined rectangle
function isInside(pos, rect) {
    return pos.x > (rect.x * scaleMultiplier) && pos.x < ((rect.x + rect.width) * scaleMultiplier) && pos.y < ((rect.y + rect.height) * scaleMultiplier) && pos.y > rect.y * scaleMultiplier
}

// Load other JS scripts that the MPD is dependent on
for (let i = 0; i < scripts.length; i++) {
    const headElement = document.head;
    const script = document.createElement("script");
    script.src = scripts[i];
    headElement.appendChild(script);
}

// DTC Structure/Database
let Database = {
    COM: {
        Preset1: {
            default: true, // TODO: This will need to be deleted on storeData()
            UNIT_ID: "PRESET 1",
            CALLSIGN: "PRE 1",
            VHF: "127.5",
            UHF: "225",
            UHF_Cipher: false,
            UHF_CNV: "1",
            FM1: "30",
            FM1_Cipher: false,
            FM1_CNV: "1",
            FM2: "30",
            FM2_Cipher: false,
            FM2_CNV: "1",
            PRI_FREQ: "VHF",
        },
        Preset2: {
            default: true,
            UNIT_ID: "PRESET 2",
            CALLSIGN: "PRE 2",
            VHF: "127.5",
            UHF: "225",
            UHF_Cipher: false,
            UHF_CNV: "1",
            FM1: "30",
            FM1_Cipher: false,
            FM1_CNV: "1",
            FM2: "30",
            FM2_Cipher: false,
            FM2_CNV: "1",
            PRI_FREQ: "NONE",
        },
        Preset3: {
            default: true,
            UNIT_ID: "PRESET 3",
            CALLSIGN: "PRE 3",
            VHF: "127.5",
            UHF: "225",
            UHF_Cipher: false,
            UHF_CNV: "1",
            FM1: "30",
            FM1_Cipher: false,
            FM1_CNV: "1",
            FM2: "30",
            FM2_Cipher: false,
            FM2_CNV: "1",
            PRI_FREQ: "FM1",
        },
        Preset4: {
            default: true,
            UNIT_ID: "PRESET 4",
            CALLSIGN: "PRE 4",
            VHF: "127.5",
            UHF: "225",
            UHF_Cipher: false,
            UHF_CNV: "1",
            FM1: "30",
            FM1_Cipher: false,
            FM1_CNV: "1",
            FM2: "30",
            FM2_Cipher: false,
            FM2_CNV: "1",
            PRI_FREQ: "FM2",
        },
        Preset5: {
            default: true,
            UNIT_ID: "PRESET 5",
            CALLSIGN: "PRE 5",
            VHF: "127.5",
            UHF: "225",
            UHF_Cipher: false,
            UHF_CNV: "1",
            FM1: "30",
            FM1_Cipher: false,
            FM1_CNV: "1",
            FM2: "30",
            FM2_Cipher: false,
            FM2_CNV: "1",
            PRI_FREQ: "NONE",
        },
        Preset6: {
            default: true,
            UNIT_ID: "PRESET 6",
            CALLSIGN: "PRE 6",
            VHF: "127.5",
            UHF: "225",
            UHF_Cipher: false,
            UHF_CNV: "1",
            FM1: "30",
            FM1_Cipher: false,
            FM1_CNV: "1",
            FM2: "30",
            FM2_Cipher: false,
            FM2_CNV: "1",
            PRI_FREQ: "NONE",
        },
        Preset7: {
            default: true,
            UNIT_ID: "PRESET 7",
            CALLSIGN: "PRE 7",
            VHF: "127.5",
            UHF: "225",
            UHF_Cipher: false,
            UHF_CNV: "1",
            FM1: "30",
            FM1_Cipher: false,
            FM1_CNV: "1",
            FM2: "30",
            FM2_Cipher: false,
            FM2_CNV: "1",
            PRI_FREQ: "NONE",
        },
        Preset8: {
            default: true,
            UNIT_ID: "PRESET 8",
            CALLSIGN: "PRE 8",
            VHF: "127.5",
            UHF: "225",
            UHF_Cipher: false,
            UHF_CNV: "1",
            FM1: "30",
            FM1_Cipher: false,
            FM1_CNV: "1",
            FM2: "30",
            FM2_Cipher: false,
            FM2_CNV: "1",
            PRI_FREQ: "NONE",
        },
        Preset9: {
            default: true,
            UNIT_ID: "PRESET 9",
            CALLSIGN: "PRE 9",
            VHF: "127.5",
            UHF: "225",
            UHF_Cipher: false,
            UHF_CNV: "1",
            FM1: "30",
            FM1_Cipher: false,
            FM1_CNV: "1",
            FM2: "30",
            FM2_Cipher: false,
            FM2_CNV: "1",
            PRI_FREQ: "NONE",
        },
        Preset10: {
            default: true,
            UNIT_ID: "PRESET 10",
            CALLSIGN: "PRE 10",
            VHF: "127.5",
            UHF: "225",
            UHF_Cipher: false,
            UHF_CNV: "1",
            FM1: "30",
            FM1_Cipher: false,
            FM1_CNV: "1",
            FM2: "30",
            FM2_Cipher: false,
            FM2_CNV: "1",
            PRI_FREQ: "NONE",
        },
        XPNDR: {
            Mode1: "00",
            Mode3: "1200",
            Mode4: true
        },
        DL: {
            CALLSIGN: "G-1",
            ORIG_ID: "1"
        },
        HF: "2.0"
    },
    TSD: {
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

// Basic empty button commands for overwriting later
const button_commands_empty = {
    L1: function (){},    L2: function (){},    L3: function (){},    L4: function (){},
    L5: function (){},    L6: function (){},    B1: function (){ Load_Page("Menu"); },    B2: function (){},
    B3: function (){},    B4: function (){},    B5: function (){},    B6: function (){},
    R1: function (){},    R2: function (){},    R3: function (){},    R4: function (){},
    R5: function (){},    R6: function (){},    T6: function (){},    T5: function (){},
    T4: function (){},    T3: function (){},    T2: function (){},    T1: function (){},
    FCR: function (){},   WPN: function (){},   TSD: function (){ Load_Page("TSD"); },   VID: function (){},
    COM: function (){ Load_Page("COM_BASE"); }, AC: function (){}
};

// Button Positions
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

let mpdTextButtons = {...mpdButtons};