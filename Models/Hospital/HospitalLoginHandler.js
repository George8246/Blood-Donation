//module export
var b = "false";

module.exports = (user, db) => {
    //variables
    const userName = user.LogName;
    const password = user.LogPass;

    //query
    sqlSelect = "SELECT * FROM hos_login WHERE hosName= ? AND password=?";

    //
    db.query(sqlSelect, [userName, password], (err, result) => {
        if (err) {
            console.log({ err: err });
            console.log("**ERROR**");
        }
        if (result.length > 0) {
            console.log("**RESULT SENT TO FRONT END**");
            b = "true";
        } else {
            console.log({ message: "wrong username/password combination!" });
            console.log("**INVALID COMBINATION**");
        }
    });
    return b;
};
