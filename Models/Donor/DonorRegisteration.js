//module export
module.exports = (user, db) => {
        //variables
        const Name = user.Name;
        const userPlace = user.Place;
        console.log(userPlace); 
        const userName = user.UName;
        console.log(userName);
        const Password = user.Pass;
        const Age = user.Age;
        const Gender = user.Gender;
        const BloodType = user.BloodType;
        const Phone = user.Phone;
        console.log("in the database");

        //query
        const sqlInsert1 = "INSERT INTO user_details (userFName,userAge,userGender,userBloodGroup,userPhone,userPlace) VALUES (?,?,?,?,?,?)";

        const sqlInsert2 = "INSERT INTO user_login (user_id,userName,userPassword) VALUES (?,?,?)";

        const sqlInsert3 = "INSERT INTO user_health (user_id) VALUES(?)";

        const sqlDelete1 = "DELETE  FROM user_details WHERE user_id= ?";

        const sqlDelete2 = "DELETE FROM user_health WHERE user_id=?";
        /////
        db.query(sqlInsert1, [Name,Age,Gender,BloodType,Phone, userPlace], (err, result) => {
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
                                console.log({ message: "Username already exist" });
                            }
                        });
                    } else {
                        console.log({ message: "User Registration Successfull!" });
                        console.log("**USER REGISTRATION SUCCESSFULL**");
                        ///////
                        db.query(sqlInsert3, [user_id], (err, result1) => {
                            if (err) {
                                console.log(err + "**ERROR INSERTING TO USER-LOGIN**");
                                //////
                                db.query(sqlDelete2, [user_id], (err, result2) => {
                                    if (err) console.log(err);
                                    else {
                                        console.log("**DELETED DUE TO DUPLICATION**");
                                        console.log({ message: "Username already exist" });
                                    }
                                });
                            } else {
                                //console.log({ message: "User Registration Successfull!" });
                                console.log("**USER REGISTRATION SUCCESSFULL**");
                            }
                        });
                    }
                });
            }
        });
    };
