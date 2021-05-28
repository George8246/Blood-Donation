require("./controllers/Classes/User");
require("./controllers/Classes/Donor");
require("./controllers/Classes/Hospital");

// Donor Handler
var DonorLoginHandler = require("./Models/Donor/DonorLoginHandler");
var DonorRegisteration = require("./Models/Donor/DonorRegisteration");

// Hospital Handler
var HospitalRegisterHandler = require("./Models/Hospital/HospitalRegisterHandler");
var HospitalLoginHandler = require("./Models/Hospital/HospitalLoginHandler");

// Add Post
var AddPostHander = require("./Models/Interfaces/AddPostHander");

var mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const { post } = require("jquery");

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
    console.log(data);

    logedin = DonorLoginHandler(data, database);
});

app.post("/AddHospital", function (req, res) {
    let data = req.body;

    AddPostHander(data, database);
});
app.post("/LogHospital", function (req, res) {
    let data = req.body;

    console.log("the method returns: " + HospitalLoginHandler(data, database));
    // setTimeout(function () {
    //     console.log("Finish the log in");
    //     console.log("the boolean value: " + logedin);
    // }, 500);
});

app.get("/all", function (req, res) {
    // console.log(logedin);
    res.send(logedin);
});

app.listen(3000, (err) => {
    if (err) throw err;
    else console.log("listening to port : 3000");
});
