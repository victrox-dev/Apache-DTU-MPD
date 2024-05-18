const SHOW_Buttons = {
    T3: function () {
        Load_Page("TSD");
    },
    T5: function () {
        Load_Page("THRT_SHOW");
    },
    T6: function () {
        Load_Page("COORD_SHOW");
    },
    L2: function () {
        if (Database["TSD"]["SETTINGS"]["DEFAULT_PHASE"] === "NAV") {
            Database["TSD"]["SETTINGS"]["SHOW"]["NAV"]["WP_DATA"] = !Database["TSD"]["SETTINGS"]["SHOW"]["NAV"]["WP_DATA"];
        } else {
            Database["TSD"]["SETTINGS"]["SHOW"]["ATK"]["CURRENT_ROUTE"] = !Database["TSD"]["SETTINGS"]["SHOW"]["ATK"]["CURRENT_ROUTE"];
        }
        Load_Page(currentPage);
    },
    L3: function () {
        if (Database["TSD"]["SETTINGS"]["DEFAULT_PHASE"] === "NAV") {
            Database["TSD"]["SETTINGS"]["SHOW"]["NAV"]["INACTIVE_ZONES"] = !Database["TSD"]["SETTINGS"]["SHOW"]["NAV"]["INACTIVE_ZONES"];
        } else {
            Database["TSD"]["SETTINGS"]["SHOW"]["ATK"]["INACTIVE_ZONES"] = !Database["TSD"]["SETTINGS"]["SHOW"]["ATK"]["INACTIVE_ZONES"];
        }
        Load_Page(currentPage);
    },
    L4: function () {
        if (Database["TSD"]["SETTINGS"]["DEFAULT_PHASE"] === "NAV") {
            Database["TSD"]["SETTINGS"]["SHOW"]["NAV"]["OBSTACLES"] = !Database["TSD"]["SETTINGS"]["SHOW"]["NAV"]["OBSTACLES"];
        } else {
            Database["TSD"]["SETTINGS"]["SHOW"]["ATK"]["FCR_TGTS_OBSTACLES"] = !Database["TSD"]["SETTINGS"]["SHOW"]["ATK"]["FCR_TGTS_OBSTACLES"];
        }
        Load_Page(currentPage);
    },
    L5: function () {
        if (Database["TSD"]["SETTINGS"]["DEFAULT_PHASE"] === "NAV") {
            Database["TSD"]["SETTINGS"]["SHOW"]["NAV"]["CPG_CURSOR"] = !Database["TSD"]["SETTINGS"]["SHOW"]["NAV"]["CPG_CURSOR"];
        } else {
            Database["TSD"]["SETTINGS"]["SHOW"]["ATK"]["CPG_CURSOR"] = !Database["TSD"]["SETTINGS"]["SHOW"]["ATK"]["CPG_CURSOR"];
        }
        Load_Page(currentPage);
    },
    L6: function () {
        if (Database["TSD"]["SETTINGS"]["DEFAULT_PHASE"] === "NAV") {
            Database["TSD"]["SETTINGS"]["SHOW"]["NAV"]["CURSOR_INFO"] = !Database["TSD"]["SETTINGS"]["SHOW"]["NAV"]["CURSOR_INFO"];
        } else {
            Database["TSD"]["SETTINGS"]["SHOW"]["ATK"]["CURSOR_INFO"] = !Database["TSD"]["SETTINGS"]["SHOW"]["ATK"]["CURSOR_INFO"];
        }
        Load_Page(currentPage);
    },
    R3: function () {}, // Need to override CTR
    R4: function () {
        if (Database["TSD"]["SETTINGS"]["DEFAULT_PHASE"] === "NAV") {
            Database["TSD"]["SETTINGS"]["SHOW"]["NAV"]["HSI"] = !Database["TSD"]["SETTINGS"]["SHOW"]["NAV"]["HSI"];
        } else {
            Database["TSD"]["SETTINGS"]["SHOW"]["ATK"]["HSI"] = !Database["TSD"]["SETTINGS"]["SHOW"]["ATK"]["HSI"];
        }
        Load_Page(currentPage);
    },
    R5: function () {
        if (Database["TSD"]["SETTINGS"]["DEFAULT_PHASE"] === "NAV") {
            Database["TSD"]["SETTINGS"]["SHOW"]["NAV"]["ENDR"] = !Database["TSD"]["SETTINGS"]["SHOW"]["NAV"]["ENDR"];
        } else {
            Database["TSD"]["SETTINGS"]["SHOW"]["ATK"]["ENDR"] = !Database["TSD"]["SETTINGS"]["SHOW"]["ATK"]["ENDR"];
        }
        Load_Page(currentPage);
    },
    R6: function () {
        if (Database["TSD"]["SETTINGS"]["DEFAULT_PHASE"] === "NAV") {
            Database["TSD"]["SETTINGS"]["SHOW"]["NAV"]["WIND"] = !Database["TSD"]["SETTINGS"]["SHOW"]["NAV"]["WIND"];
        } else {
            Database["TSD"]["SETTINGS"]["SHOW"]["ATK"]["WIND"] = !Database["TSD"]["SETTINGS"]["SHOW"]["ATK"]["WIND"];
        }
        Load_Page(currentPage);
    }
};

const THRT_SHOW_Buttons = {
    
};

const COORD_SHOW_Buttons = {
    L2: function () {
        Database["TSD"]["SETTINGS"]["SHOW"][Database["TSD"]["SETTINGS"]["DEFAULT_PHASE"]]["COORD_SHOW"]["CONTROL_MEASURES"] = !Database["TSD"]["SETTINGS"]["SHOW"][Database["TSD"]["SETTINGS"]["DEFAULT_PHASE"]]["COORD_SHOW"]["CONTROL_MEASURES"];
        Load_Page(currentPage);
    },
    L3: function () {
        Database["TSD"]["SETTINGS"]["SHOW"][Database["TSD"]["SETTINGS"]["DEFAULT_PHASE"]]["COORD_SHOW"]["FRIENDLY_UNITS"] = !Database["TSD"]["SETTINGS"]["SHOW"][Database["TSD"]["SETTINGS"]["DEFAULT_PHASE"]]["COORD_SHOW"]["FRIENDLY_UNITS"];
        Load_Page(currentPage);
    },
    L4: function () {
        Database["TSD"]["SETTINGS"]["SHOW"][Database["TSD"]["SETTINGS"]["DEFAULT_PHASE"]]["COORD_SHOW"]["ENEMY_UNITS"] = !Database["TSD"]["SETTINGS"]["SHOW"][Database["TSD"]["SETTINGS"]["DEFAULT_PHASE"]]["COORD_SHOW"]["ENEMY_UNITS"];
        Load_Page(currentPage);
    },
    L5: function () {
        Database["TSD"]["SETTINGS"]["SHOW"][Database["TSD"]["SETTINGS"]["DEFAULT_PHASE"]]["COORD_SHOW"]["PLANNED_TGTS_THREATS"] = !Database["TSD"]["SETTINGS"]["SHOW"][Database["TSD"]["SETTINGS"]["DEFAULT_PHASE"]]["COORD_SHOW"]["PLANNED_TGTS_THREATS"];
        Load_Page(currentPage);
    },
    R3: function () {
        if (Database["TSD"]["SETTINGS"]["DEFAULT_PHASE"] === "ATK") {
            Database["TSD"]["SETTINGS"]["SHOW"]["ATK"]["COORD_SHOW"]["SHOT"] = !Database["TSD"]["SETTINGS"]["SHOW"]["ATK"]["COORD_SHOW"]["SHOT"];
            Load_Page(currentPage);
        }
    }
};