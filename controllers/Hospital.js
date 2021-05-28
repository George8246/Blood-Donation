var User = require("./User.js");

class hostpital extends User {
    constructor(UD, HD) {
        super(UD);
        this.HosNumber = HD.Phone;
    }

    Registration(app, database) {
        DonorRegisteration(this, app, database);
    }

    LogIN(app, database) {
        DonorLoginHandler(this, app, database);
    }
}
