const TSD_Buttons = {
    B2: function () {
        if (Database["TSD"]["SETTINGS"]["DEFAULT_PHASE"] === "NAV") {
            Database["TSD"]["SETTINGS"]["DEFAULT_PHASE"] = "ATK";
        } else {
            Database["TSD"]["SETTINGS"]["DEFAULT_PHASE"] = "NAV";
        }
        Load_Page(currentPage);
    },
    B4: function () {
        Load_Page("TSD_MAP");
    },
    B5: function () {
        // TODO: RTE Page
    },
    B6: function () {
        Load_Page("TSD_POINT");
    },
    R3: function () {
        Database["TSD"]["SETTINGS"]["MAP"]["CTR"] = !Database["TSD"]["SETTINGS"]["MAP"]["CTR"]; // Boolean flip
        Load_Page(currentPage);
    },
    T3: function () {
        Load_Page("TSD_SHOW");
    }
}