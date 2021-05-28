var User = require("./User.js");

class Donor extends User {
    constructor(UD, DD) {
        super(UD);
        this.BloodGroup = DD.BloodGroup;
        this.DphoneNumber = DD.Phone;
        this.email = DD.email;
        this.gender = DD.Gender;
        this.age = DD.Age;
    }

    Registration(app, database) {
        DonorRegisteration(this, app, database);
    }

    LogIN(app, database) {
        DonorLoginHandler(this, app, database);
    }
}
