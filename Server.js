var mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var User = require("./controllers/User");
// var UserRegisterHandler = require("./controllers/user/UserRegisterHandler");
// var RequestClassHandler = require("./controllers/bloodbank/RequestClassHandler");

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

// User(app, db);
app.use(express.static("public"));
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist/"));

app.get("/", function (req, res) {
    res.sendFile("index.html", { root: __dirname });
});

app.listen(3000, (err) => {
    if (err) throw err;
    else console.log("listening to port : 3000");
});
