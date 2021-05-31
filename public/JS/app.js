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
    setTimeout(HospitalRegUI, 250); //wait 2 seconds
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
    setTimeout(AddPostUI, 250); //wait 2 seconds
});

var lusername = $('input[name="username"]');
var lpassword = $('input[name="password"]');

$("#Dlogb").click(function () {
    var LogName = lusername.val();
    var LogPass = lpassword.val();
    postData("/LogDonor", { LogName, LogPass });
    setTimeout(DonorLogInUI, 250); //wait 2 seconds
});

$("#Hlogb").click(function () {
    var LogName = lusername.val();
    var LogPass = lpassword.val();
    postData("/LogHospital", { LogName, LogPass });
    setTimeout(HospitalLogInUI, 250);
});

var s = $('input[name="Search"]');

$("#searchbtn").click(function () {
    var Search = s.val();

    postData("/Search", { Search });
    setTimeout(SearchUI, 250); //wait 2 seconds
});

/********************************************fetch********************************************/
//post
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

//get
const DonorLogInUI = async () => {
    const req = await fetch("/DonorLog");
    const data = await req.json();
    console.log(data);
    if (data.b) {
        $("#logSuccess").removeClass("invisible");
        $("#logSuccess").css("color", "green");
        $("#logFailed").addClass("invisible");
        $("h4").remove();
        $("#welcome").removeClass("invisible");
        $("#welcome").append("<h4>welcome " + data.DonorName + "</h4>");
        $("#addIcon").addClass("invisible");
        $("#addIcon").css("margin-left", "0");
        $("#i-search").css("margin-left", "0");
        setTimeout(Hide, 500);
    } else {
        $("#logSuccess").addClass("invisible");
        $("#logFailed").removeClass("invisible");
        $("#logFailed").css("color", "red");
    }
};

const SearchUI = async () => {
    const req = await fetch("/search");
    const data = await req.json();
    console.log(data.result.length);

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
    }
};

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

const HospitalLogInUI = async () => {
    const req = await fetch("/hosLog");
    const data = await req.json();
    console.log(data);
    if (data.b) {
        $("#logSuccess").removeClass("invisible");
        $("#logFailed").addClass("invisible");
        $("h4").remove();
        $("#welcome").removeClass("invisible");
        $("#welcome").append("<h4>welcome " + data.HosName + "</h4>");
        $("#addIcon").css("margin-left", "20px");
        $("#addIcon").removeClass("invisible");
        $("#i-search").css("margin-left", "20px");
        setTimeout(Hide, 500);
    } else {
        $("#logSuccess").addClass("invisible");
        $("#logFailed").removeClass("invisible");
        $("#logFailed").css("color", "red");
    }
};

const HospitalRegUI = async () => {
    const req = await fetch("/hosReg");
    const data = await req.json();
    console.log(data);
    let stat = data.stat;
    $("#RM").remove();
    $("#regMass").append("<h1 id='RM'>" + stat + "</h1>");
    if (stat == "Hospital Registered Successfully") {
        setTimeout(Hide, 500);
        setTimeout(ShowHospital, 1500);
        setTimeout(background, 1500);
    }
};

const AddPostUI = async () => {
    const req = await fetch("/AddHos");
    const data = await req.json();
    console.log(data);
    let stat = data.stat;
    $("#AM").remove();
    $("#AddMass").append("<h1 id='AM'>" + stat + "</h1>");
};

/********************************************Design********************************************/

var sections = document.getElementsByClassName("section");

$("#i-search").click(function () {
    Hide();
    $("#search").removeClass("invisible");
    background();
});

$("#navbar-item").click(function () {
    Hide();
    $("#Donate").removeClass("invisible");
    background();
});

$("#reg-btn").click(function () {
    Hide();
    $("#reg").removeClass("invisible");
    $("#Dreg").removeClass("invisible");
    background();
});

$("#DFormb").click(function () {
    Hide();
    $("#reg").removeClass("invisible");
    $("#DFormb").addClass("active");
    $("#Dreg").removeClass("invisible");
    $("#HFormb").removeClass("active");
    background();
});

$("#HFormb").click(function () {
    Hide();
    $("#reg").removeClass("invisible");
    $("#HFormb").addClass("active");
    $("#Hreg").removeClass("invisible");
    $("#DFormb").removeClass("active");
    background();
});

$("#DlFormb").click(function () {
    Hide();
    $("#Log").removeClass("invisible");
    $("#DlFormb").addClass("active");
    $("#Dlogb").removeClass("invisible");
    $("#Hlogb").addClass("invisible");
    $("#HlFormb").removeClass("active");
    $("#logSuccess").addClass("invisible");
    $("#logFailed").addClass("invisible");
    background();
});

$("#addIcon").click(function () {
    Hide();
    $("#addPost").removeClass("invisible");
    background();
});

$("#HlFormb").click(function () {
    Hide();
    ShowHospital();
    background();
});

$("#log-btn").click(function () {
    Hide();
    $("#Log").removeClass("invisible");
    background();
});

$("#Blood").click(function () {
    Hide();
    $("body").css("background-image", " url('img/mainbg.png");
});

function background() {
    $("body").css("background-image", "url('img/bg.jpg')");
}

function Hide() {
    for (let i = 0; i < sections.length; i++) {
        $(".section").addClass("invisible");
    }
    $("body").css("background-image", " url('img/mainbg.png");
}

function ShowHospital() {
    $("#Log").removeClass("invisible");
    $("#HlFormb").addClass("active");
    $("#Hlogb").removeClass("invisible");
    $("#Dlogb").addClass("invisible");
    $("#DlFormb").removeClass("active");
    $("#logSuccess").addClass("invisible");
    $("#logFailed").addClass("invisible");
}
