$(function(){
    var position_top_raccourci = $("#").offset().top;

    $(window).scrollspy(funtion() {
        if ($(this).scrollTop() > position_top_raccourci) {
        $("#nav").addClass(fixed-top);
    }
    })
})