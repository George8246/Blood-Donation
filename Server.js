var user = require("./controllers/Classes/User");
var donor = require("./controllers/Classes/Donor");
var hospital = require("./controllers/Classes/Hospital");

// Donor Handler
var DonorLoginHandler = require("./Models/Donor/DonorLoginHandler");
var DonorRegisteration = require("./Models/Donor/DonorRegisteration");

// Hospital Handler
var HospitalRegisterHandler = require("./Models/Hospital/HospitalRegisterHandler");
var HospitalLoginHandler = require("./Models/Hospital/HospitalLoginHandler");

// Add Post
var AddPostHander = require("./Models/Interfaces/AddPostHander");

//Search Blood Type
var BloodSearchHander = require("./Models/Interfaces/BloodSearchHander");

var mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const { post } = require("jquery");

let donorLogin = {
    b: false,
};

let searchResult = {};

//create the app
var app = express();

var logedin;

// middilewares set app to use the body-parser
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//config for database
var database = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "BloodDB",
    // multipleStatements: true,
});

app.use(express.static("public"));
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist/"));

app.get("/", function (req, res) {
    res.sendFile("index.html", { root: __dirname });
});

app.post("/Hospital", function (req, res) {
    let data = req.body;
    console.log(data);

    HospitalRegisterHandler(data, database);
});

app.post("/Donor", function (req, res) {
    let data = req.body;
    console.log(data);

    DonorRegisteration(data, database);
});

app.post("/LogDonor", function (req, res) {
    let data = req.body;
    // console.log(data);

    DLogin(data);

    //module export
    function DLogin(user) {
        //variables
        const UserName = user.LogName;
        const userPassword = user.LogPass;

        //query
        const sqlSelect = "SELECT * FROM user_login WHERE userName = ? AND userPassword = ?";

        //
        database.query(sqlSelect, [UserName, userPassword], (err, result) => {
            if (err) {
                // res.send({ err: err });
                donorLogin["b"] = false;
                console.log("**ERROR**");
            }
            /////
            if (result.length > 0) {
                donorLogin["b"] = true;
                console.log("in post");
                console.log("**RESULT SENT TO FRONT END**");
            } else {
                // res.send({ message: "wrong username/password combination!" });
                donorLogin["b"] = false;
                console.log("**INVALID COMBINATION**");
            }
        });
    }
});

app.get("/DonorLog", function (req, res) {
    // console.log(donorLogin);
    console.log("in get");
    res.send(donorLogin);
});

app.post("/AddHospital", function (req, res) {
    let data = req.body;

    AddPostHander(data, database);
});

/*********************************************************************************************************************************************************************/
app.post("/LogHospital", function (req, res) {
    let data = req.body;

    HospitalLoginHandler(data, database);
});
/********************************************************************************************************************************************************************/

app.post("/Search", function (req, res) {
    let data = req.body;

    console.log(data);

    BloodSearchHander(data, database);

    //module export
    function BloodSearchHander(user) {
        //variables
        const blood = user.Search;
        //query
        //console.log(blood + place);
        const sqlSelect = "SELECT * FROM user_details WHERE userBloodGroup = ?";

        //
        database.query(sqlSelect, [blood], (err, result) => {
            if (err) {
                console.log("**   SEARCH ERROR   **" + err);
            }

            if (result.length > 0) {
                res.send(result);
                searchResult["result"] = result;
                console.log("**SEARCH RESULTS FOUND AND SEND TO FRONT END**");
            } else {
                res.send({ message: "NO SEARCH RESULTS FOUND!" });
            }
        });
    }
});

app.get("/search", function (req, res) {
    console.log(searchResult);
    res.send(searchResult);
});

app.get("/log", function (req, res) {
    console.log(logedin);
    res.send(logedin);
});

app.listen(3000, (err) => {
    if (err) throw err;
    else console.log("listening to port : 3000");
});

module.exports = app;
