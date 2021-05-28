//module export
module.exports = (user, app, db) => {
    //variables
    const UserName = user.LogName;
    const userPassword = user.LogPass;

    //query
    const sqlSelect = "SELECT * FROM user_login WHERE userName = ? AND userPassword = ?";

    //
    db.query(sqlSelect, [UserName, userPassword], (err, result) => {
        if (err) {
            console.log({ err: err });
            console.log("**ERROR**");
        }
        /////
        if (result.length > 0) {
            console.log(result);
            console.log("**RESULT SENT TO FRONT END**");
        } else {
            console.log({ message: "wrong username/password combination!" });
            console.log("**INVALID COMBINATION**");
        }
    });
};
