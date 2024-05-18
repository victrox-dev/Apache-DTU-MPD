const TSD_Buttons = {
    B2: function () {
        if (DTC_Structure["TSD"]["SETTINGS"]["DEFAULT_PHASE"] === "NAV") {
            DTC_Structure["TSD"]["SETTINGS"]["DEFAULT_PHASE"] = "ATK";
        } else {
            DTC_Structure["TSD"]["SETTINGS"]["DEFAULT_PHASE"] = "NAV";
        }
        Load_Page(currentPage);
    },
    B4: function () {
        Load_Page("MAP");
    },
    B5: function () {
        // TODO: RTE Page
    },
    B6: function () {
        Load_Page("TSD_POINT");
    },
    R3: function () {
        DTC_Structure["TSD"]["SETTINGS"]["MAP"]["CTR"] = !DTC_Structure["TSD"]["SETTINGS"]["MAP"]["CTR"]; // Boolean flip
        Load_Page(currentPage);
    },
    T3: function () {
        Load_Page("SHOW");
    }
}