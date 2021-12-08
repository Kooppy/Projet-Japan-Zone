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

    let mod = document.getElementById("mod");
    let test = document.querySelectorAll('input[name="test"]')
    let html = document.querySelector('html');
    
    console.log(test);
    mod.addEventListener('change', setLocal);
    // Local Part Verify
    if (localStorage.getItem('check')) {
        updateLocal();
    } else {
        setLocal();
    }

    // LocalStorage Create
    function setLocal() {
        /*if (test[0].checked) {
            localStorage.setItem('theme', test[0].value);
        } else if (test[1].checked) {
            localStorage.setItem('theme', test[1].value);
        } else {
            localStorage.setItem('theme', test[2].value);
        }*/
        localStorage.setItem('check', mod.checked);
        updateLocal();
    }

    // LocalStorage Update
    function updateLocal() {
        // Dark Mod Update
        let check = localStorage.getItem('check');

        //let theme = localStorage.getItem('theme');

        //html.classList.add(theme)

        if (check === "false") {
            html.classList.remove('darkMod');
            mod.checked = mod.defaultCheck;
        } else {
            html.classList.add('darkMod');
            mod.checked = true;
        }
    }

    //localStorage.removeItem('dm');
    //localStorage.clear();

    // Delete Cookie
    function deleteLocal() {
        localStorage.clear();
    }
})();