//var popup =require('popups')

//module export
module.exports = (app, db) => {
    console.log("in database 1");
    app.post("/Hospital", (req, res) => {
        //variables
        const hosName = req.body.hosName;
        const hosPhone = req.body.hosPhone;
        const hosAddress = req.body.hosAddress;
        const hosUserName = req.body.hosUserName;
        const hosPassword = req.body.hosPassword;
        console.log("in database 2");

        //query
        const sqlInsert1 = "INSERT INTO hos_details (hosName,hosPhone,hosAddress) VALUES (?,?,?,?)";

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
                                res.send({ message: "USER ALREADY EXISTS!" });
                            }
                        });
                    } else {
                        console.log("Employee Registered Successfully");
                        res.send({ message: "EMPLOYEE REGISTRATION SUCCESSFULL!" });
                    }
                });
            }
        });
    });
};
