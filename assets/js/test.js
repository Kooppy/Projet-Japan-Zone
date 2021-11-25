

/* version JQUERY

$(function(){
    // On recupere la position du bloc par rapport au haut du site
    var position_top_raccourci = $("#navigation").offset().top;
    
    //Au scroll dans la fenetre on déclenche la fonction
    $(window).scroll(function () {
    
    //si on a defile de plus de 150px du haut vers le bas
    if ($(this).scrollTop() > position_top_raccourci) {
    
    //on ajoute la classe "fixNavigation" a <div id="navigation">
    $('#navigation').addClass("fixNavigation"); 
    } else {
    
    //sinon on retire la classe "fixNavigation" a <div id="navigation">
    $('#navigation').removeClass("fixNavigation");
    }
    });
});

*/

// version JQUERY --> $(function(){})
// version JS DOM --> (function(){})();

(function () {
    // JQUERY
    // let position_top_raccourci = $("#nav").offset().top;
    // JS DOM 
    let position_top_raccourci = document.getElementById("nav").offsetTop;

    window.addEventListener ('scroll', function () {
        if (window.scrollY > position_top_raccourci) {
            //JQUERY
            //$("#nav").addClass("fixed-top");
            // JS DOM
            document.getElementById("nav").classList.add("fixed-top");
        } else {
            //JQUERY
            //$("#nav").removeClass("fixed-top")
            // JS DOM
            document.getElementById("nav").classList.remove("fixed-top");
        }
    })
})();