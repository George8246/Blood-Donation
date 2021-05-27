var x = require("controllers/User.js");

var BloodTypeSearch = $("#type");
var BloodType;

$("#bt").click(function () {
    BloodType = BloodTypeSearch.val();
    console.log(BloodType);
});

var userFName = $('input[name="userFName"]');
var userAge = $('input[name="userAge"]');
var userGender = $('input[name="userGender"]');
var userBloodGroup = $('input[name="userBloodGroup"]');
var emailId = $('input[name="emailId"]');
var userPhone = $('input[name="userPhone"]');
var userPlace = $('input[name="userPlace"]');
var username = $('input[name="rusername"]');
var password = $('input[name="rpassword"]');

$("#regb").click(function () {
    Name = userFName.val();
    Age = userAge.val();
    Gender = userGender.val();
    BloodType = userBloodGroup.val();
    Email = emailId.val();
    Phone = userPhone.val();
    Place = userPlace.val();
    UName = username.val();
    Pass = password.val();
    user = new User(Name, Pass, Place);
});

var lusername = $('input[name="username"]');
var lpassword = $('input[name="password"]');

$("#logb").click(function () {
    var LogName = lusername.val();
    var LogPass = lpassword.val();
    user = new User(LogName, LogPass);
});
