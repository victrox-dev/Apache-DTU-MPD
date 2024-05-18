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
        if (DTC_Structure["TSD"]["SETTINGS"]["DEFAULT_PHASE"] === "NAV") {
            DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["NAV"]["WP_DATA"] = !DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["NAV"]["WP_DATA"];
        } else {
            DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["ATK"]["CURRENT_ROUTE"] = !DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["ATK"]["CURRENT_ROUTE"];
        }
        Load_Page(currentPage);
    },
    L3: function () {
        if (DTC_Structure["TSD"]["SETTINGS"]["DEFAULT_PHASE"] === "NAV") {
            DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["NAV"]["INACTIVE_ZONES"] = !DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["NAV"]["INACTIVE_ZONES"];
        } else {
            DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["ATK"]["INACTIVE_ZONES"] = !DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["ATK"]["INACTIVE_ZONES"];
        }
        Load_Page(currentPage);
    },
    L4: function () {
        if (DTC_Structure["TSD"]["SETTINGS"]["DEFAULT_PHASE"] === "NAV") {
            DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["NAV"]["OBSTACLES"] = !DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["NAV"]["OBSTACLES"];
        } else {
            DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["ATK"]["FCR_TGTS_OBSTACLES"] = !DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["ATK"]["FCR_TGTS_OBSTACLES"];
        }
        Load_Page(currentPage);
    },
    L5: function () {
        if (DTC_Structure["TSD"]["SETTINGS"]["DEFAULT_PHASE"] === "NAV") {
            DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["NAV"]["CPG_CURSOR"] = !DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["NAV"]["CPG_CURSOR"];
        } else {
            DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["ATK"]["CPG_CURSOR"] = !DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["ATK"]["CPG_CURSOR"];
        }
        Load_Page(currentPage);
    },
    L6: function () {
        if (DTC_Structure["TSD"]["SETTINGS"]["DEFAULT_PHASE"] === "NAV") {
            DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["NAV"]["CURSOR_INFO"] = !DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["NAV"]["CURSOR_INFO"];
        } else {
            DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["ATK"]["CURSOR_INFO"] = !DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["ATK"]["CURSOR_INFO"];
        }
        Load_Page(currentPage);
    },
    R3: function () {}, // Need to override CTR
    R4: function () {
        if (DTC_Structure["TSD"]["SETTINGS"]["DEFAULT_PHASE"] === "NAV") {
            DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["NAV"]["HSI"] = !DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["NAV"]["HSI"];
        } else {
            DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["ATK"]["HSI"] = !DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["ATK"]["HSI"];
        }
        Load_Page(currentPage);
    },
    R5: function () {
        if (DTC_Structure["TSD"]["SETTINGS"]["DEFAULT_PHASE"] === "NAV") {
            DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["NAV"]["ENDR"] = !DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["NAV"]["ENDR"];
        } else {
            DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["ATK"]["ENDR"] = !DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["ATK"]["ENDR"];
        }
        Load_Page(currentPage);
    },
    R6: function () {
        if (DTC_Structure["TSD"]["SETTINGS"]["DEFAULT_PHASE"] === "NAV") {
            DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["NAV"]["WIND"] = !DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["NAV"]["WIND"];
        } else {
            DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["ATK"]["WIND"] = !DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["ATK"]["WIND"];
        }
        Load_Page(currentPage);
    }
};

const THRT_SHOW_Buttons = {
    
};

const COORD_SHOW_Buttons = {
    L2: function () {
        DTC_Structure["TSD"]["SETTINGS"]["SHOW"][DTC_Structure["TSD"]["SETTINGS"]["DEFAULT_PHASE"]]["COORD_SHOW"]["CONTROL_MEASURES"] = !DTC_Structure["TSD"]["SETTINGS"]["SHOW"][DTC_Structure["TSD"]["SETTINGS"]["DEFAULT_PHASE"]]["COORD_SHOW"]["CONTROL_MEASURES"];
        Load_Page(currentPage);
    },
    L3: function () {
        DTC_Structure["TSD"]["SETTINGS"]["SHOW"][DTC_Structure["TSD"]["SETTINGS"]["DEFAULT_PHASE"]]["COORD_SHOW"]["FRIENDLY_UNITS"] = !DTC_Structure["TSD"]["SETTINGS"]["SHOW"][DTC_Structure["TSD"]["SETTINGS"]["DEFAULT_PHASE"]]["COORD_SHOW"]["FRIENDLY_UNITS"];
        Load_Page(currentPage);
    },
    L4: function () {
        DTC_Structure["TSD"]["SETTINGS"]["SHOW"][DTC_Structure["TSD"]["SETTINGS"]["DEFAULT_PHASE"]]["COORD_SHOW"]["ENEMY_UNITS"] = !DTC_Structure["TSD"]["SETTINGS"]["SHOW"][DTC_Structure["TSD"]["SETTINGS"]["DEFAULT_PHASE"]]["COORD_SHOW"]["ENEMY_UNITS"];
        Load_Page(currentPage);
    },
    L5: function () {
        DTC_Structure["TSD"]["SETTINGS"]["SHOW"][DTC_Structure["TSD"]["SETTINGS"]["DEFAULT_PHASE"]]["COORD_SHOW"]["PLANNED_TGTS_THREATS"] = !DTC_Structure["TSD"]["SETTINGS"]["SHOW"][DTC_Structure["TSD"]["SETTINGS"]["DEFAULT_PHASE"]]["COORD_SHOW"]["PLANNED_TGTS_THREATS"];
        Load_Page(currentPage);
    },
    R3: function () {
        if (DTC_Structure["TSD"]["SETTINGS"]["DEFAULT_PHASE"] === "ATK") {
            DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["ATK"]["COORD_SHOW"]["SHOT"] = !DTC_Structure["TSD"]["SETTINGS"]["SHOW"]["ATK"]["COORD_SHOW"]["SHOT"];
            Load_Page(currentPage);
        }
    }
};