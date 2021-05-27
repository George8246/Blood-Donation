var BloodTypeSearch = $("#type");
var BloodType;

$("#bt").click(function () {
    BloodType = BloodTypeSearch.val();
    console.log(BloodType);
});

var DuserFName = $('input[name="DuserFName"]');
var DuserAge = $('input[name="DuserAge"]');
var DuserGender = $('input[name="DuserGender"]');
var DuserBloodGroup = $('input[name="DuserBloodGroup"]');
var Demail = $('input[name="Demail"]');
var DuserPhone = $('input[name="DuserPhone"]');
var DuserPlace = $('input[name="DuserPlace"]');
var Dusername = $('input[name="Drusername"]');
var Dpassword = $('input[name="Drpassword"]');

$("#Dregb").click(function () {
    Name = DuserFName.val();
    Age = DuserAge.val();
    Gender = DuserGender.val();
    BloodType = DuserBloodGroup.val();
    Email = Demail.val();
    Phone = DuserPhone.val();
    Place = DuserPlace.val();
    UName = Dusername.val();
    Pass = Dpassword.val();
    type = "D";
    postData("/", { Name, Age, Gender, BloodType, Email, Phone, Place, UName, Pass, type });
});

var HuserFName = $('input[name="HuserFName"]');
var HuserPhone = $('input[name="DuserPhone"]');
var HuserPlace = $('input[name="DuserPlace"]');
var Husername = $('input[name="Drusername"]');
var Hpassword = $('input[name="Drpassword"]');

$("#Hregb").click(function () {
    Name = DuserFName.val();
    Phone = DuserPhone.val();
    Place = DuserPlace.val();
    UName = Dusername.val();
    Pass = Dpassword.val();
    type = "H";
    postData("/", { Name, Phone, Place, UName, Pass, type });
});

var lusername = $('input[name="username"]');
var lpassword = $('input[name="password"]');

$("#logb").click(function () {
    var LogName = lusername.val();
    var LogPass = lpassword.val();
    user = new User(LogName, LogPass);
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
