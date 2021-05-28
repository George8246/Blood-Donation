var UI = require("../Interfaces/UI");

class Donate extends UI {
    constructor(Request_id, Request_date, member_type, bloodGroup, Qunatity, Way) {
        this.Request_id = Request_id;
        this.Request_date = Request_date;
        this.member_type = member_type;
        this.Qunatity = Qunatity;
        this.Way = Way;
    }
}
