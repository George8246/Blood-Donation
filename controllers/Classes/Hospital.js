var User = require("./User.js");

module.exports = class hostpital extends User {
    constructor(data) {
        super(UD);
        this.HosNumber = HD.Phone;
    }

    Registration(data, database) {
        HostpitalRegisteration(data, database);
    }

    LogIN(data, database) {
        HospitalLoginHandler(data, database);
    }
};
