$(function () {
    // JQUERY
    // let position_top_raccourci = $("#nav").offset().top;
    // JS DOM 
    let position_top_raccourci = document.getElementById("nav").offsetTop;

    $(window).scroll(function () {
        if ($(this).scrollTop() > position_top_raccourci) {
            $("#nav").addClass("fixed-top");
        } else {
            $("#nav").removeClass("fixed-top")
        }
    })
})