//module export
module.exports = (user, app, db) => {
    app.post("/login/usr", (req, res) => {
        //variables
        const UserName = user.userName;
        const userPassword = user.Password;

        //query
        const sqlSelect = "SELECT * FROM BloodStock WHERE UserName = ? AND userPassword = ?";

        //
        db.query(sqlSelect, [UserName, userPassword], (err, result) => {
            if (err) {
                res.send({ err: err });
                console.log("**ERROR**");
            }
            /////
            if (result.length > 0) {
                res.send(result);
                console.log("**RESULT SENT TO FRONT END**");
            } else {
                res.send({ message: "wrong username/password combination!" });
                console.log("**INVALID COMBINATION**");
            }
        });
    });
};
