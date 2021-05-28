//module export
module.exports = (user, db) => {
    app.post("/reg/usr", (req, res) => {
        //variables
        const Name = user.Name;
        const userPlace = user.Address;
        const userName = user.userName;
        const Password = user.Password;
        const type = user.Type;

        //query
        const sqlInsert1 = "INSERT INTO user (Name,userPlace) VALUES (?,?)";

        const sqlInsert2 = "INSERT INTO login (user_id,userName,Password) VALUES (?,?,?)";

        const sqlInsert3 = "INSERT INTO user_health (user_id) VALUES(?)";

        const sqlDelete1 = "DELETE  FROM user WHERE user_id= ?";

        const sqlDelete2 = "DELETE FROM user_health WHERE user_id=?";
        /////
        db.query(sqlInsert1, [Name, userPlace], (err, result) => {
            if (err) console.log(err + " **ERROR  INSERTING USER** ");
            else {
                var user_id = result.insertId;
                //////
                db.query(sqlInsert2, [user_id, userName, Password], (err, result1) => {
                    if (err) {
                        console.log(err + "**ERROR INSERTING TO USER-LOGIN**");
                        //////
                        db.query(sqlDelete1, [user_id], (err, result2) => {
                            if (err) console.log(err);
                            else {
                                console.log("**DELETED DUE TO DUPLICATION**");
                                res.send({ message: "Username already exist" });
                            }
                        });
                    } else {
                        //res.send({ message: "User Registration Successfull!" });
                        //console.log("**USER REGISTRATION SUCCESSFULL**");
                        ///////
                        db.query(sqlInsert3, [user_id], (err, result1) => {
                            if (err) {
                                console.log(err + "**ERROR INSERTING TO USER-LOGIN**");
                                //////
                                db.query(sqlDelete2, [user_id], (err, result2) => {
                                    if (err) console.log(err);
                                    else {
                                        console.log("**DELETED DUE TO DUPLICATION**");
                                        res.send({ message: "Username already exist" });
                                    }
                                });
                            } else {
                                //res.send({ message: "User Registration Successfull!" });
                                console.log("**USER REGISTRATION SUCCESSFULL**");
                            }
                        });
                    }
                });
            }
        });
    });
};