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
    postData("/Donor", { Name, Age, Gender, BloodType, Email, Phone, Place, UName, Pass });
    setTimeout(DonorRegUI, 250); //wait 2 seconds
});

var HuserFName = $('input[name="HuserFName"]');
var HuserPhone = $('input[name="HuserPhone"]');
var HuserPlace = $('input[name="HuserPlace"]');
var Husername = $('input[name="Hrusername"]');
var Hpassword = $('input[name="Hrpassword"]');

$("#Hregb").click(function () {
    Name = HuserFName.val();
    Phone = HuserPhone.val();
    Place = HuserPlace.val();
    UName = Husername.val();
    Pass = Hpassword.val();
    postData("/Hospital", { Name, Phone, Place, UName, Pass });
});

var AdduserFName = $('input[name="HAddFName"]');
var AdduserPhone = $('input[name="HAddPhone"]');
var AdduserPlace = $('input[name="HAddPlace"]');
var HAddBloodType = $('input[name="HAddBloodType"]');

$("#HAddb").click(function () {
    Name = AdduserFName.val();
    Phone = AdduserPhone.val();
    Place = AdduserPlace.val();
    AddType = HAddBloodType.val();
    postData("/AddHospital", { Name, Phone, Place, AddType });
});

var lusername = $('input[name="username"]');
var lpassword = $('input[name="password"]');

$("#Dlogb").click(function () {
    var LogName = lusername.val();
    var LogPass = lpassword.val();
    postData("/LogDonor", { LogName, LogPass });
<<<<<<< HEAD
    setTimeout(DonorLogInUI, 250); //wait 2 seconds
=======
    setTimeout(DonorUI, 250); //wait 2 seconds
>>>>>>> 536dd90f1034794083ecaffc1d034f0e7e541ffe
});

$("#Hlogb").click(function () {
    var LogName = lusername.val();
    var LogPass = lpassword.val();
    postData("/LogHospital", { LogName, LogPass });
    setTimeout(HospitalUI, 250);
});

var s = $('input[name="Search"]');

$("#searchbtn").click(function () {
    var Search = s.val();

    postData("/Search", { Search });
    setTimeout(SearchUI, 250); //wait 2 seconds
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

<<<<<<< HEAD
const DonorLogInUI = async () => {
=======
const DonorUI = async () => {
>>>>>>> 536dd90f1034794083ecaffc1d034f0e7e541ffe
    const req = await fetch("/DonorLog");
    const data = await req.json();
    console.log(data);
    if (data.b) {
        $("#logSuccess").removeClass("invisible");
        $("#logFailed").addClass("invisible");
    } else {
        $("#logSuccess").addClass("invisible");
        $("#logFailed").removeClass("invisible");
    }
};

<<<<<<< HEAD
const SearchUI = async () => {
    const req = await fetch("/search");
    const data = await req.json();
    console.log(data.result.length);

    // $("tr").addClass("invisible");
    // $(".tableHeader").removeClass("invisible");
    $("tbody").remove();
    $("table").append("<tbody></tbody>");

    for (let i = 0; i < data.result.length; i++) {
        BloodGroup = data.result[i].blood_group.toLowerCase();
        $("tbody").append("<tr id='adding'></tr>");
        console.log(data.result[i]);

        for (let j = 0; j < 4; j++) {
            $("#adding").append("<td class=" + BloodGroup + ">" + data.result[i].Name + "</td>");
            $("#adding").append("<td class=" + BloodGroup + ">" + data.result[i].Place + "</td>");
            $("#adding").append("<td class=" + BloodGroup + ">" + data.result[i].Phone + "</td>");
            $("#adding").append("<td class=" + BloodGroup + ">" + data.result[i].blood_group + "</td>");
            $("#adding").removeAttr("id");
            $("." + BloodGroup).removeClass("invisible");
        }
=======
const DonorRegUI = async () => {
    const req = await fetch("/Donor");
    const data = await req.json();
    console.log(data);
    if (data.b) {
        $("#logSuccess").removeClass("invisible");
        $("#logFailed").addClass("invisible");
    } else {
        $("#logSuccess").addClass("invisible");
        $("#logFailed").removeClass("invisible");
    }
};

const HospitalUI = async () => {
    const req = await fetch("/hosLog");
    const data = await req.json();
    console.log(data);
    if (data.b) {
        $("#logSuccess").removeClass("invisible");
        $("#logFailed").addClass("invisible");
    } else {
        $("#logSuccess").addClass("invisible");
        $("#logFailed").removeClass("invisible");
>>>>>>> 536dd90f1034794083ecaffc1d034f0e7e541ffe
    }
};
