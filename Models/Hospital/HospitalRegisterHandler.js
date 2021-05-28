//var popup =require('popups')

//module export
module.exports = (user, db) => {
    //variables
    const hosName = user.Name;
    const hosPhone = user.Phone;
    const hosAddress = user.Place;
    const hosUserName = user.UName;
    const hosPassword = user.Pass;

    //query
    const sqlInsert1 = "INSERT INTO hos_details (hosName,hosPhone,hosAddress) VALUES (?,?,?)";

    const sqlInsert2 = "INSERT INTO hos_login (hosID,hosName,password) VALUES (?,?,?)";

    const sqlDelete = "DELETE  FROM hos_details WHERE hosID= ?";

    //s
    db.query(sqlInsert1, [hosName, hosPhone, hosAddress], (err, result) => {
        if (err) {
            console.log(err + "THAT'S AN ERROR!!!");
        } else {
            var hosID = result.insertId;
            //
            db.query(sqlInsert2, [hosID, hosUserName, hosPassword], (err, result1) => {
                if (err) {
                    //
                    console.log(err);
                    db.query(sqlDelete, [hosID], (err, result2) => {
                        if (err) console.log(err);
                        else {
                            console.log("user already exists!");
                            console.log({ message: "USER ALREADY EXISTS!" });
                        }
                    });
                } else {
                    console.log("Employee Registered Successfully");
                    console.log({ message: "EMPLOYEE REGISTRATION SUCCESSFULL!" });
                }
            });
        }
    });
};
