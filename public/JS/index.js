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
    background();
});

$("#log-btn").click(function () {
    Hide();
    $("#Log").removeClass("invisible");
    background();
});

$("#Blood").click(function () {
    Hide();
    $("body").css("background-image", " url('img/mainbg1.png");
});

function background() {
    $("body").css("background-image", "url('img/bg.jpg')");
}

function Hide() {
    for (let i = 0; i < sections.length; i++) {
        $(".section").addClass("invisible");
    }
}
