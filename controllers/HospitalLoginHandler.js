var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false }); //middileware

//module export
module.exports = (user, app, db) => {
  app.post("/login/emp", (req, res) => {
    //variables
    const userName = req.body.hosUserName;
    const password = req.body.hosPassword;

    //query
    sqlSelect = "SELECT * FROM hos_login WHERE userName= ? AND password=?";

    //
    db.query(sqlSelect, [userName, password], (err, result) => {
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
