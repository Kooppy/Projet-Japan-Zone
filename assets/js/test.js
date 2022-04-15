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

    // ============================================================ //

    // Import de notre balise html root (app)
    const app = document.getElementById("app");

    // ============================================================ //
    // data plus persistante
    const state = {
    listCard: [],
    };
    // permet de muter (changer) la valeur de nos states
    const mutations = {
    setListCard(state, value) {
        console.log("mutation", state, value);
        state.listCard = value;
    },
    };
    // fonction multiple
    const actions = {
    // Get data API
        search(event) {
            let valueInput, filterValue, listCard, card, h3, img, textValue, altValue;
            console.log(event);
            valueInput = document.getElementById('inputSearch');

            filterValue = valueInput.value.toLowerCase();

            listCard = document.getElementById('listCard');

            card = document.getElementsByTagName('div');

            for (i = 0; i < card.length; i++) {
                h3 = card[i].getElementsByTagName('h3')[0];
                textValue = h3.innerText

                if (textValue.toLowerCase()) {
                    card[i].style.display = "";

                } else {
                    card[i].style.display = "none"
                }
                
            }
        },
    };

    // ============================================================ //

    // Build de notre input avant le get auto
    async function buildInput() {
        // app.setAttribute("style", "margin-top: 60px");
        // // Création de la div container
        // const container = document.createElement("div");
        // container.setAttribute("class", "container fixed-top");

        // // Création de la div row
        // const row = document.createElement("div");
        // row.setAttribute("class", "row");
        // row.setAttribute("id", "listCard");
        const searchDiv = document.getElementById("search");
        // Création du form contenant le input
        const formInput = document.createElement("form");
        formInput.setAttribute("class", "col-md-6");


        // // Création du span
        // const spanInput = document.createElement("span");
        // spanInput.setAttribute("class", "input-group-text");
        // spanInput.innerText = "pixabay";

        // Création du input
        const input = document.createElement("input");
        input.setAttribute("class", "form-control");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "mot clef exemple: bitcoin");
        input.setAttribute("aria-label", "Username");
        input.setAttribute("aria-describedby", "addon-wrapping");
        input.setAttribute("onkeyup", "actions.search(event)");
        input.setAttribute("id", "inputSearch");

        // Notre input en html
        // <div class="input-group flex-nowrap">
        //     <span class="input-group-text" id="addon-wrapping">@</span>
        //     <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping">
        // </div>

        // Intégration de notre container dans app
        // app.appendChild(container);

        // Intégration de notre divInput dans notre container
        searchDiv.appendChild(formInput);

        // Intégration de notre span + input dans notre divInput
        // divInput.appendChild(spanInput);
        formInput.appendChild(input);
    }

    // ============================================================ //

    async function mountedComponent() {
        console.log("Mounted");
        // input
        buildInput();
    }

    // au chargement de la page
    mountedComponent();

    console.log("end", state);

    // ============================================================ //

})();