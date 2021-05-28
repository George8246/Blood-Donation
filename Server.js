require("./controllers/Classes/User");
require("./controllers/Classes/Donor");
require("./controllers/Classes/Hospital");

var mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

// Setup empty JS object to store user data
userData = {};
HospitalData = {};
DonorData = {};

//create the app
var app = express();

// middilewares set app to use the body-parser
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//config for database
var db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "bbms",
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

    userData["Name"] = data.Name;
    userData["UserName"] = data.UName;
    userData["Pass"] = data.Pass;
    userData["Address"] = data.Place;
    userData["Type"] = data.type;

    HospitalData["Phone"] = data.Phone;

    hostpital = new hostpital(userData, HospitalData);
    hostpital.Registration(app, db);
});

app.post("/Donor", function (req, res) {
    let data = req.body;
    console.log(data);

    userData["Name"] = data.Name;
    userData["UserName"] = data.UName;
    userData["Pass"] = data.Pass;
    userData["Address"] = data.Place;
    userData["Type"] = data.type;

    DonorData["Age"] = data.Age;
    DonorData["Gender"] = data.Gender;
    DonorData["BloodType"] = data.BloodType;
    DonorData["Email"] = data.Email;
    DonorData["Phone"] = data.Phone;

    Donor = new Donor(userData, DonorData);
    Donor.Registration(app, db);
});

app.listen(3000, (err) => {
    if (err) throw err;
    else console.log("listening to port : 3000");
});
