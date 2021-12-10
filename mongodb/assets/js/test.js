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

    //document.querySelector('#night').checked = true;

    window.addEventListener('scroll', function () {
        if (window.scrollY > position_top_raccourci) {
            //JQUERY
            //$("#nav").addClass("fixed-top");
            // JS DOM Fixation Nav
            document.getElementById("nav").classList.add("fixed-top");

            // Affichage Scroll Top
            document.querySelector(".scrollTop").classList.add("d-block");

            // Remonter la Fenêtre en Haut de Page
            document.querySelector(".scrollTop").addEventListener('click', function () {
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

    //localStorage.clear();
    let html = document.querySelector('html');

    $(".btn-check").on("click", setLocal);

    // Local Part Verify
    if (localStorage.getItem('theme')) {
        updateLocal();
    } else {
        setLocal();
        console.log("testNon");
    }
    
    // LocalStorage Create
    function setLocal() {
        let old = localStorage.getItem('theme');
        localStorage.setItem('theme', this.value);

        updateLocal(old);
    }

    // LocalStorage Update
    function updateLocal(old) {
        // theme Mod Update
        let theme = localStorage.getItem('theme');

        if (localStorage.getItem('theme') && old === undefined || old === "") {
            html.classList.add(theme)
        } else if (localStorage.getItem('theme') == "") {
            html.classList.remove(old)
        } else if (old != undefined) {
            html.classList.replace(old, theme)
        }
    }

    //localStorage.removeItem('theme');
    //localStorage.removeItem('old');
    //localStorage.clear();

    // Delete Cookie
    function deleteLocal() {
        localStorage.clear();
    }
})();