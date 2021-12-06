

/* version JQUERY

$(function(){
    // On recupere la position du bloc par rapport au haut du site
    var position_top_raccourci = $("#navigation").offset().top;
    
    //Au scroll dans la fenetre on déclenche la fonction
    $(window).scroll(function () {
    
    //si on a defile de plus de 1px du haut vers le bas
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
// fonction scroll
(function () {
    // JQUERY
    // let position_top_raccourci = $("#nav").offset().top;
    // JS DOM 
    let position_top_raccourci = document.getElementById("nav").offsetTop;

    window.addEventListener ('scroll', function () {
        if (window.scrollY > position_top_raccourci) {
            //JQUERY
            //$("#nav").addClass("fixed-top");
            // JS DOM Fixation Nav
            document.getElementById("nav").classList.add("fixed-top");

            // Affichage Scroll Top
            document.querySelector(".scrollTop").classList.add("d-block");
            
            // Remonter la Fenêtre en Haut de Page
            document.querySelector(".scrollTop").addEventListener('click', function (){
                window.scrollTo(0, 0);
            })
        } else {
            //JQUERY
            //$("#nav").removeClass("fixed-top")
            // JS DOM
            document.getElementById("nav").classList.remove("fixed-top");
            document.querySelector(".scrollTop").classList.remove("d-block")
        }
    })

    let mod = document.getElementById("mod");

    mod.addEventListener('click', function(){
        let news = document.querySelector('.my-5');

        if (mod.checked) {
            //console.log(document.getElementById("mod"));
            document.body.setAttribute('style', 'background-color: #171e26; color: white; transition: all 0.4s;');
            news.setAttribute('style', 'background-color: rgba(32,40,51, 0.8); transition: all 1s;');
            
        } else {
            document.body.removeAttribute('style');
            news.removeAttribute('style');
        }
    })
})();
