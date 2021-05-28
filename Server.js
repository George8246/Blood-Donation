require("./controllers/Classes/User");
require("./controllers/Classes/Donor");
require("./controllers/Classes/Hospital");

require("./Models/Donor/DonorLoginHandler");
var DonorRegisteration = require("./Models/Donor/DonorRegisteration");
var HospitalRegisterHandler = require("./Models/Hospital/HospitalRegisterHandler");

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

    userData["Name"] = data.Name;
    userData["UserName"] = data.UName;
    userData["Pass"] = data.Pass;
    userData["Address"] = data.Place;
    userData["Type"] = data.type;
    userData["Phone"] = data.Phone;

    console.log("entering the database");

    HospitalRegisterHandler(app, db);

    console.log("Finished");
    // const hostpital = new hostpital(userData, HospitalData);
    // hostpital.Registration(app, db);
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

    DonorRegisteration(data, app, db);
    // const Donor = new Donor(userData, DonorData);
    // Donor.Registration(app, db);
});

const postData = async (url, data) => {
    const response = await fetch(url, {
        method: "POST",
        redirect: "follow",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

app.listen(3000, (err) => {
    if (err) throw err;
    else console.log("listening to port : 3000");
});
