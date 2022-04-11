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
    //let position_top_raccourci = document.getElementById("nav").offsetTop;

    //document.querySelector('#night').checked = true;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
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

    
    document.querySelector("#light").addEventListener('click', setLocal)
    document.querySelector("#darkMod").addEventListener('click', setLocal)
    document.querySelector("#japan").addEventListener('click', setLocal)

    //$(".form-check-input").on("click", setLocal);

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
        console.log("test1",theme);

        if (localStorage.getItem('theme') && old === undefined || old === "") {
            html.classList.add(theme)
            theme = theme === 'undefined' ? 'light' : theme;
            document.getElementById(theme).checked = true
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

    document.querySelector("#loginButton").addEventListener('click', function () {

        const tab = bootstrap.Tab.getOrCreateInstance(document.querySelector('#myTab button[data-bs-target="#login"]')).show();

        tab.show();
    })

    document.querySelector("#registerButton").addEventListener('click', function () {

        const tab = bootstrap.Tab.getOrCreateInstance(document.querySelector('#myTab button[data-bs-target="#register"]')).show();

        tab.show();
    })

})();