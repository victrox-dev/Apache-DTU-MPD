// General Variables
let c, ctx, KU, currentPage, lastButton = null;

// Apache Font
let apacheFont = new FontFace('Apache', 'url(fonts/AH-64D.ttf)');
apacheFont.load().then(function (font) {
    document.fonts.add(font);
});

// TSD Variables
let pointIndex = null;

// Input Variables
let inputPrompt, returnTo = null;
let tempData = [];
let numVars = 0;
let inputReady = false;

// Scripting Dependencies
const scripts = ["js/Drawing_Functions.js", "js/Page_Definitions.js",
    "js/Process_Data.js", "js/button_profiles/TSD_Buttons.js",
    "js/button_profiles/TSD_POINT_Buttons.js", "js/button_profiles/MAP_Buttons.js",
    "js/button_profiles/SHOW_Buttons.js"
];

// Button Related Variables
let button_commands = {}; // Baseline buttons for initial load (empty)

const horizSpacing = 85; // Button spacing
const vertSpacing = 85; // Button spacing

const HorizRow = {x: 210, y: 10}; // Horizontal MPD buttons start position
const VertRow = {x: 20, y: 180}; // Vertical MPD buttons start position

const screen = {x: 880 / 2 - 670 / 2, y: 860 / 2 - 670 / 2, w: 670, h: 670} // Screen position and dimensions

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
    return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
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

// Basic empty button commands for overwriting later
const button_commands_empty = {
    L1: function (){},    L2: function (){},    L3: function (){},    L4: function (){},
    L5: function (){},    L6: function (){},    B1: function (){},    B2: function (){},
    B3: function (){},    B4: function (){},    B5: function (){},    B6: function (){},
    R1: function (){},    R2: function (){},    R3: function (){},    R4: function (){},
    R5: function (){},    R6: function (){},    T6: function (){},    T5: function (){},
    T4: function (){},    T3: function (){},    T2: function (){},    T1: function (){},
    FCR: function (){},   WPN: function (){},   TSD: function (){Load_Page("TSD");},   VID: function (){},
    COM: function (){},   AC: function (){}
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