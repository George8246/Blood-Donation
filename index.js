var iconSearch = document.getElementById("i-search");
var search = document.getElementById("search");

var IDonate = document.getElementById("navbar-item");
var Donate = document.getElementById("Donate");

var regbtn = document.getElementById("reg-btn");
var reg = document.getElementById("reg");

var Log = document.getElementById("Log");
var Logbtn = document.getElementById("log-btn");

var logo = document.getElementById("Blood");

var sections = document.getElementsByClassName("section");

iconSearch.onclick = function setSearch() {
    Hide();
    search.setAttribute("class", "section");
    background();
};

IDonate.onclick = function setDonate() {
    Hide();
    Donate.setAttribute("class", "section");
    background();
};

regbtn.onclick = function setReg() {
    Hide();
    reg.setAttribute("class", "section");
    background();
};

Logbtn.onclick = function setLog() {
    Hide();
    Log.setAttribute("class", "section");
    background();
};

logo.onclick = function setLogo() {
    Hide();
    document.body.style.backgroundImage = "url('img/mainbg1.png')";
};

function background() {
    document.body.style.backgroundImage = "url('img/bg.jpg')";
}

function Hide() {
    for (let i = 0; i < sections.length; i++) {
        sections[i].setAttribute("class", "section invisible");
    }
}
