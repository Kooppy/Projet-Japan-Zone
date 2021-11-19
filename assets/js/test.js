$(function () {
    var position_top_raccourci = $("#nav").offset().top;

    $(window).scroll(function () {
        if ($(this).scrollTop() > position_top_raccourci) {
            $("#nav").addClass("fixed-top");
        } else {
            $("#nav").removeClass("fixed-top")
        }
    })
})