require("../../Models/Donor/DonorLoginHandler");
require("../../Models/Donor/DonorRegisteration");
var UI = require("../Interfaces/UI");

class User extends UI {
    constructor(userData) {
        this.Name = userData.Name;
        this.userName = userData.UName;
        this.Password = userData.Pass;
        this.Address = userData.Address;
        this.Type = userData.Type;
    }

    Registration(database) {}

    LogIN(database) {}
}

module.exports = User;
