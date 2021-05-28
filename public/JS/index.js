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
});

$("#HFormb").click(function () {
    Hide();
    $("#reg").removeClass("invisible");
    $("#HFormb").addClass("active");
    $("#Hreg").removeClass("invisible");
    $("#DFormb").removeClass("active");
});

$("#DlFormb").click(function () {
    Hide();
    $("#Log").removeClass("invisible");
    $("#DlFormb").addClass("active");
    $("#Dlogb").removeClass("invisible");
    $("#Hlogb").addClass("invisible");
    $("#HlFormb").removeClass("active");
});

$("#HlFormb").click(function () {
    Hide();
    $("#Log").removeClass("invisible");
    $("#HlFormb").addClass("active");
    $("#Hlogb").removeClass("invisible");
    $("#Dlogb").addClass("invisible");
    $("#DlFormb").removeClass("active");
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
}
