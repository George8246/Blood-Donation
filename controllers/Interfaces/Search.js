var UI = require("./UI");

class Search extends UI {
    getResult(bloodType) {
        BloodSearchHander(bloodType);
    }
}
