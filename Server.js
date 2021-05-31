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

let hosLogin = {
    b: false,
};

let addPost = {
    stat: "error",
};

let hosReg = {};

let donorReg = {};

let searchResult = {};

let Result = {};

let Mod = {};

let Del = {};

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

    //var popup =require('popups')

    HospitalRegister(data);

    //module export
    function HospitalRegister(user) {
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
        database.query(sqlInsert1, [hosName, hosPhone, hosAddress], (err, result) => {
            if (err) {
                console.log(err + "THAT'S AN ERROR!!!");
                hosReg["stat"] = err + "THAT'S AN ERROR!!!";
            } else {
                var hosID = result.insertId;
                //
                database.query(sqlInsert2, [hosID, hosUserName, hosPassword], (err, result1) => {
                    if (err) {
                        //
                        console.log(err);
                        database.query(sqlDelete, [hosID], (err, result2) => {
                            if (err) console.log(err);
                            else {
                                console.log("user already exists!");
                                hosReg["stat"] = "user already exists!";
                            }
                        });
                    } else {
                        console.log("Hospital Registered Successfully");
                        hosReg["stat"] = "Hospital Registered Successfully";
                    }
                });
            }
        });
    }
});

app.get("/hosReg", function (req, res) {
    res.send(hosReg);
});

app.post("/Donor", function (req, res) {
    let data = req.body;

    DonorRegister(data);
    function DonorRegister(user) {
        const Name = user.Name;
        const userPlace = user.Place;
        const userName = user.UName;
        const Password = user.Pass;
        const Age = user.Age;
        const Gender = user.Gender;
        const BloodType = user.BloodType;
        const Phone = user.Phone;

        //query
        const sqlInsert1 = "INSERT INTO user_details (userFName,userAge,userGender,userBloodGroup,userPhone,userPlace) VALUES (?,?,?,?,?,?)";

        const sqlInsert2 = "INSERT INTO user_login (user_id,userName,userPassword) VALUES (?,?,?)";

        const sqlInsert3 = "INSERT INTO user_health (user_id) VALUES(?)";

        const sqlDelete1 = "DELETE  FROM user_details WHERE user_id= ?";

        const sqlDelete2 = "DELETE FROM user_health WHERE user_id=?";
        /////
        database.query(sqlInsert1, [Name, Age, Gender, BloodType, Phone, userPlace], (err, result) => {
            if (err) {
                console.log(err + " **ERROR  INSERTING USER** ");
                donorReg["stat"] = err + " **ERROR  INSERTING USER** ";
            } else {
                var user_id = result.insertId;
                //////
                database.query(sqlInsert2, [user_id, userName, Password], (err, result1) => {
                    if (err) {
                        //////
                        database.query(sqlDelete1, [user_id], (err, result2) => {
                            if (err) console.log(err);
                            else {
                                donorReg["stat"] = "Username already exist";
                                console.log("**DELETED DUE TO DUPLICATION**");
                                // res.send({ message: "Username already exist" });
                            }
                        });
                    } else {
                        // console.log({ message: "User Registration Successfull!" });
                        donorReg["stat"] = "User Registration Successfull!";
                        database.query(sqlInsert3, [user_id], (err, result1) => {
                            if (err) {
                                database.query(sqlDelete2, [user_id], (err, result2) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log("**DELETED DUE TO DUPLICATION**");
                                        donorReg["stat"] = "Username already exist";
                                        // res.send({ message: "Username already exist" });
                                    }
                                });
                            } else {
                                donorReg["stat"] = "User Registration Successfull!";
                                //console.log({ message: "User Registration Successfull!" });
                            }
                        });
                    }
                });
            }
        });
    }
});

app.get("/Donor", function (req, res) {
    res.send(donorReg);
});

app.post("/LogDonor", function (req, res) {
    let data = req.body;

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
                donorLogin["DonorName"] = user.LogName;
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

    AddPost(data);

    //module export
    function AddPost(user) {
        //variables
        const Name = user.Name;
        const Place = user.Place;
        const Phone = user.Phone;
        const type = user.AddType;

        //query
        const sqlInsert1 = "INSERT INTO blood_stocks (Name,Place,Phone,blood_group) VALUES (?,?,?,?)";

        /////
        database.query(sqlInsert1, [Name, Place, Phone, type], (err, result) => {
            if (err) {
                console.log({ err: err });
                console.log("**ERROR**");
                addPost["stat"] = err;
            } else {
                var b_id = result.insertId;
                console.log("ADDED");
                addPost["stat"] = "Added";
            }
        });
    }
});

app.get("/AddHos", function (req, res) {
    res.send(addPost);
});

/*********************************************************************************************************************************************************************/
app.post("/LogHospital", function (req, res) {
    let data = req.body;

    HospitalLogin(data);
    function HospitalLogin(user) {
        const userName = user.LogName;
        const password = user.LogPass;

        //query
        const sqlSelect = "SELECT * FROM hos_login WHERE hosName= ? AND password=?";

        //
        database.query(sqlSelect, [userName, password], (err, result) => {
            if (err) {
                // console.log({ err: err });
                hosLogin["b"] = false;
                console.log("**ERROR**");
            }
            if (result.length > 0) {
                console.log("**RESULT SENT TO FRONT END**");
                hosLogin["b"] = true;
                hosLogin["HosName"] = user.LogName;
            } else {
                // console.log({ message: "wrong username/password combination!" });
                hosLogin["b"] = false;
                console.log("**INVALID COMBINATION**");
            }
        });
    }
});

app.get("/hosLog", function (req, res) {
    res.send(hosLogin);
});
/********************************************************************************************************************************************************************/

app.post("/Delete", function (req, res) {
    let data = req.body;

    DeletePost(data);

    //module export
    function DeletePost(user) {
        //variables
        const blood = user.BT;
        const Name = user.Name;
        const Place = user.Place;
        const Phone = user.Phone;

        //query
        const sqlSelect = "SELECT * FROM blood_stocks WHERE Name = ? AND Place = ? AND Phone = ? AND blood_group = ?";
        const sqlDelete = "DELETE FROM blood_stocks WHERE Name = ? AND Place = ? AND Phone = ? AND blood_group = ?";
        //
        database.query(sqlSelect, [Name, Place, Phone, blood], (err, result) => {
            if (err) {
                console.log("**   Not Found   **" + err);
                Del["stat"] = "Not Found";
            } else {
                if (result.length > 0) {
                    database.query(sqlDelete, [Name, Place, Phone, blood], (err, result2) => {
                        if (err) {
                            console.log(err + "DELETION ERROR");
                            Del["stat"] = "DELETION ERROR";
                        } else {
                            Del["stat"] = "Deleted Success";
                        }
                    });
                } else {
                    Del["stat"] = "DELETED ERROR";
                }
            }
        });
    }
});

app.get("/DeleteG", function (req, res) {
    res.send(Del);
});

app.post("/Modify", function (req, res) {
    let data = req.body;

    ModifyPost(data);

    //module export
    function ModifyPost(user) {
        //variables
        const blood = user.newSearch;
        const Name = user.newName;
        const Place = user.newPlace;
        const Phone = user.newPhone;
        const value = user.value;
        const NewValue = user.N;

        //query
        const sqlSelect = "SELECT * FROM blood_stocks WHERE Name = ? AND Place = ? AND Phone = ? AND blood_group = ?";
        const sqlUpdate = "UPDATE blood_stocks SET " + value + " = ? WHERE Name = ? AND Place = ? AND Phone = ? AND blood_group = ?";
        //
        database.query(sqlSelect, [Name, Place, Phone, blood], (err, result) => {
            if (err) {
                console.log("**   Not Found   **" + err);
                Mod["stat"] = "Not Found";
            } else {
                if (result.length > 0) {
                    database.query(sqlUpdate, [NewValue, Name, Place, Phone, blood], (err, result) => {
                        if (err) {
                            console.log(err + "Modification ERROR");
                            Mod["stat"] = "Modification ERROR";
                        } else {
                            Mod["stat"] = "Modified";
                        }
                    });
                    // console.log("**SEARCH RESULTS FOUND AND SEND TO FRONT END**");
                } else {
                    Mod["stat"] = "Modified ERROR";
                    // res.send({ message: "NO SEARCH RESULTS FOUND!" });
                }
            }
        });
    }
});

app.get("/modifyG", function (req, res) {
    res.send(Mod);
});

app.post("/Search", function (req, res) {
    let data = req.body;

    console.log(data);

    BloodSearch(data, database);

    //module export
    function BloodSearch(user) {
        //variables
        const blood = user.Search;

        //query
        const sqlSelect = "SELECT * FROM blood_stocks WHERE blood_group = ?";

        //
        database.query(sqlSelect, [blood], (err, result) => {
            if (err) {
                // console.log("**   SEARCH ERROR   **" + err);
            }

            if (result.length > 0) {
                searchResult["result"] = result;
                // console.log("**SEARCH RESULTS FOUND AND SEND TO FRONT END**");
            } else {
                // res.send({ message: "NO SEARCH RESULTS FOUND!" });
            }
        });
    }
});

app.get("/search", function (req, res) {
    res.send(searchResult);
});

app.get("/Display", function (req, res) {
    DisplayBlood();

    function DisplayBlood() {
        //query
        const sqlSelect = "SELECT * FROM blood_stocks";

        //
        database.query(sqlSelect, (err, result) => {
            if (err) {
                console.log("**   SEARCH ERROR   **" + err);
            }

            if (result.length > 0) {
                Result["result"] = result;
                console.log(result);
                console.log("**SEARCH RESULTS FOUND AND SEND TO FRONT END**");
            } else {
                // res.send({ message: "NO SEARCH RESULTS FOUND!" });
            }
        });
    }

    res.send(Result);
});

app.get("/log", function (req, res) {
    res.send(logedin);
});

app.listen(3000, (err) => {
    if (err) throw err;
    else console.log("listening to port : 3000");
});

module.exports = app;
