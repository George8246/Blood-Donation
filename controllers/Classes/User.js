require("../../Models/Donor/DonorLoginHandler");
require("../../Models/Donor/DonorRegisteration");
require("../../Models/Hospital/HospitalRegisterHandler");
require("../../Models/Hospital/HospitalLoginHandler");
var UI = require("../Interfaces/UI");

class User extends UI {
    constructor(userData) {
        super();
        this.Name = userData.Name;
        this.userName = userData.UName;
        this.Password = userData.Pass;
        this.Address = userData.Address;
        this.Type = userData.Type;
    }

    Registration(data, database) {}

    LogIN(data, database) {}
}

module.exports = User;
