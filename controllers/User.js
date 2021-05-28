require("../Models/Donor/DonorLoginHandler");
require("../Models/Donor/DonorRegisteration");

class User {
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
