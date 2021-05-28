//module export
module.exports = (user, db) => {
    //variables
    const Name = user.Name;
    const Place = user.Place;
    const Phone = user.Phone;
    const type = user.AddType;

    //query
    const sqlInsert1 = "INSERT INTO blood_stocks (Name,Place,Phone,blood_group) VALUES (?,?,?,?)";

    /////
    db.query(sqlInsert1, [Name, Place, Phone, type], (err, result) => {
        if (err) {
            console.log({ err: err });
            console.log("**ERROR**");
        } else {
            var b_id = result.insertId;
            console.log("ADDED");
        }
    });
};
