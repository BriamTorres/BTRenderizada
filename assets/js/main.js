/*
  Template Name: Briam Torres - Portafolio Web Moderna
  Template URI: brimatorres.com
  Author: Briam Torres
  Version: 1.0
*/

/* Custom Script Index
-------------------
01. Fixed Header
02. Dropdown Menu
03. Toggle Menu
04. Hour
05. Partner Slider
06. Team Slider
07. Custom Cursors
08. Hover Underline Effect
09. Gsap Animations
10. Sticky Element

*/




(function ($) {

    // Define that this file uses modern javascript
    "use strict";

    /*
       =================================
          Helper functions
       =================================
    */
    function parseZero(number){
        return Number(number) < 10 ? "0"+number : number
    }

   
    

    /*
       =================================
          When document is ready, do
       =================================
    */
    $(document).ready(function () {
        // 01. Fixed Header
        if($(".page-header").hasClass("fixed-header")){
            $(".page-main").css("padding-top", $(".page-header").outerHeight())
        }


        // 02. Dropdown Menu
        $(".mega-menu-link.has-dropdown").on("click", function (){
            if($(this).parent('li').hasClass('dropdown-open')){
                $(this).parent('li').removeClass("dropdown-open")
                $(this).siblings(".dropdown-menu-items").slideUp();
            }else{
                $(".mega-menu-items li").removeClass('dropdown-open');
                $(".dropdown-menu-items").slideUp();
                $(this).parent('li').addClass("dropdown-open")
                $(this).siblings(".dropdown-menu-items").slideDown();
            }
        })


        // 03. Toggle Menu
        $(".navbar-toggler").on("click", function (){
            $(this).toggleClass("active");
            $(".page-header").toggleClass("mega-menu-open")
            $("body").toggleClass("dark-screen")

            if($(this).hasClass("active")){
                gsap.from(".mega-menu-link", {
                    delay: 0.1,
                    opacity: 0,
                    rotate: 45,
                    duration: 0.3,
                    stagger: .1,
                    y: "100%",
                    easing: "back",
                })
            }
        })


        // 04. Hour
        let currentHour = 0;
        function hour(){
            let today = new Date();
            let timeZone = today.getTimezoneOffset() / -60;
            let result = `${parseZero(today.getHours())}<span class="hour-ticker">:</span>${parseZero(today.getMinutes())} <span class="hour-gmt">(GMT${timeZone > 0 ? '+'+timeZone : '-'+timeZone })</span>`;
            if(currentHour !== result){
                $(".current-hour").html(result);
                currentHour = result;
            }
        }
        hour();
        setInterval(() => {
            hour();
        }, 5000)


        // 05. Partner Slider
        if($(".partner-slider").length){
            new Swiper(".partner-slider", {
                spaceBetween: 30,
                draggable: true,
                grabCursor: true,
                loop: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    0: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    575: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    992: {
                        slidesPerView: 4,
                    },
                    1200: {
                        slidesPerView: 5,
                    },
                    1600: {
                        slidesPerView: 6,
                    },
                    2000: {
                        slidesPerView: 7,
                    },
                    2400: {
                        slidesPerView: 8,
                    },
                    3000: {
                        slidesPerView: 9,
                    },
                    3400: {
                        slidesPerView: 10,
                    },
                },
            });
        }


        // 06. Team Slider
        if($(".team-slider").length){
            new Swiper(".team-slider", {
                spaceBetween: 30,
                draggable: true,
                grabCursor: true,
                loop: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1.18,
                    },
                    575: {
                        slidesPerView: 1.1,
                    },
                    992: {
                        slidesPerView: 1.3,
                    },
                    1200: {
                        slidesPerView: 1.4,
                    },
                    1400: {
                        slidesPerView: 1.5,
                    },
                    1600: {
                        slidesPerView: 1.6,
                    },
                    1800: {
                        slidesPerView: 1.8,
                    },
                    2000: {
                        slidesPerView: 2.2,
                    },
                    2400: {
                        slidesPerView: 2.4,
                    },
                    3000: {
                        slidesPerView: 2.6,
                    },
                },
            });
        }


        // 07. Custom Cursors
        function cursors(){
            const cursor = $(".cursor")[0];
            const normalCursor = $(".cursor--normal").html();
            const linkCursor = $(".cursor--link").html();

            const caseCursorImg = $(".global-cases-img");

            let NORMALCURSOR = "NORMALCURSOR"
            let LINKCURSOR = "LINKCURSOR"
            let activeCursor = null
            let imgUrl = null;

            function mousemoveHandler(e) {
                const target = e.target;
                const tl = gsap.timeline();
                const tlCases = gsap.timeline();
                const defaults = {
                    x: e.clientX,
                    y: e.clientY,
                    ease: "power2.out"
                }

                // When cursor enters case block which has class .case-item and gets image url from [data-img-src] attribute
                if (
                    target.closest(".case-item") && target.closest(".case-item").hasAttribute("data-img-src")
                   
                ){
                    
                    let newUrl = target.closest(".case-item").getAttribute("data-img-src");
                    
                    if(imgUrl !== newUrl){
                        imgUrl = newUrl;
                        caseCursorImg.find("img").attr("src", newUrl);
                    }
                    
                    tlCases.to(caseCursorImg, 0, {
                        ease: defaults.ease,
                        y: defaults.y
                    });
                    
                    if(target.closest(".case-item").classList.contains("style-2")){
                        caseCursorImg.addClass("small-img");
                    } else {
                        caseCursorImg.removeClass("small-img");
                    }
                    
                    // Cambiar el tamaño de la imagen cuando el cursor está sobre el elemento
                    caseCursorImg.find("img").css("width", "auto",);
                    caseCursorImg.find("img").css("height", "400px",); // Cambia el valor según tus necesidades
                    
                    // Ajustar la posición de la imagen en la parte inferior de la ventana gráfica
                    caseCursorImg.css("position", "fixed");
                    caseCursorImg.css("right", "100%");
                    caseCursorImg.css("transform", "translateY(20%)");
                    caseCursorImg.css("bottom", "-100%");
                    
                    caseCursorImg.addClass("active");
                } else {
                    caseCursorImg.removeClass("active");
                    
                }
                
                /* if (
                    target.closest(".case-item") && target.closest(".case-item").hasAttribute("data-img-src")
                ){
                    let newUrl = target.closest(".case-item").getAttribute("data-img-src")
                    if(imgUrl !== newUrl){
                        imgUrl = newUrl
                        caseCursorImg.find("img").attr("src", newUrl)
                    }
                    tlCases.to(caseCursorImg, 0, {
                        ease: defaults.ease,
                        y: defaults.y
                    });
                    if(target.closest(".case-item").classList.contains("style-2")){
                        caseCursorImg.addClass("small-img")
                    }else{
                        caseCursorImg.removeClass("small-img")
                    }
                    caseCursorImg.addClass("active")
                }else{
                    caseCursorImg.removeClass("active")
                }*/

                // When cursor enters Link Cursor item which has class .link-cursor
                if (
                    target.closest(".link-cursor") ||
                    target.classList.contains("link-cursor")
                ) {
                    if(activeCursor !== LINKCURSOR){
                        cursor.innerHTML = linkCursor
                        activeCursor = LINKCURSOR
                    }
                    tl.to(cursor, 0, {
                        opacity: 1,
                        ...defaults
                    });
                } else if (
                    // When cursor enters completely Custom Cursor item which has class .has-cursor and attribute [linked-cursor-id].
                    // How it works: It finds another element that has [data-cursor-id] attribute the same as target element's attribute name [linked-cursor-id].
                    target.closest(".has-cursor") ||
                    target.classList.contains("has-cursor")
                ) {
                    let elem = target.closest(".has-cursor");
                    let attr = elem.getAttribute("linked-cursor-id");
                    tl.to(cursor, 0, {
                        opacity: 1,
                        ...defaults
                    });
                    if(attr && $('[data-cursor-id='+attr+']').length){
                        cursor.innerHTML = $('[data-cursor-id='+attr+']')[0].innerHTML
                    }else {
                        cursor.innerHTML = normalCursor
                    }
                } else if(
                    // Remove Custom Cursor and use browser default cursor for input and textarea
                    (target.closest("input") || target.tagName.toLowerCase() === "input") ||
                    (target.closest("textarea") || target.tagName.toLowerCase() === "textarea")
                ){
                    tl.to(cursor, 0, {
                        opacity: 0,
                        ...defaults
                    });
                } else {
                    // If any of above cases did not work then use default cursor.
                    if(activeCursor !== NORMALCURSOR){
                        cursor.innerHTML = normalCursor
                        activeCursor = NORMALCURSOR
                    }
                    tl.to(cursor, 0, {
                        opacity: 1,
                        ...defaults
                    });
                    // For clickable elements add class to make it bigger Class: .cursor-hover
                    if(
                        target.closest("a") && (!target.closest("a").classList.contains("has-cursor") || !target.closest("a").classList.contains("link-cursor")) ||
                        target.closest("button") && (!target.closest("button").classList.contains("has-cursor") || !target.closest("button").classList.contains("link-cursor")) ||
                        target.closest("label") && target.closest("label").classList.contains("clickable")
                    ){
                        $(".cursor .normalCursor").addClass("cursor-hover");
                    } else{
                        $(".cursor .normalCursor").removeClass("cursor-hover");
                    }
                    // For dark elements add class to make the cursor light color. Class: .cursor-dark
                    if(
                        target.closest("a") && target.closest("a").classList.contains("cursor-dark") ||
                        target.closest("button") && target.closest("button").classList.contains("cursor-dark")
                    ){
                        $(".cursor .normalCursor").addClass("cursor-dark");
                    } else{
                        $(".cursor .normalCursor").removeClass("cursor-dark");
                    }

                }
            }

            function mouseleaveHandler() {
                gsap.to(cursor, {
                    opacity: 0
                });
            }

            document.addEventListener("mousemove", mousemoveHandler);
            document.addEventListener("mouseleave", mouseleaveHandler);
        }
        cursors();



        // 08. Hover Underline Effect
       /* function hoverUnderLineEffect(){
            let hoverEffect = $(".hover-underline");
            for(let i=0; i<hoverEffect.length; i++){
                if(hoverEffect.eq(i).find(".link-text").length){
                    hoverEffect.eq(i).prepend(`<span class="link-text-hidden">${hoverEffect.eq(i).find(".link-text").html()}</span>`)
                }
            }
        }
        hoverUnderLineEffect();*/


        // 09. Gsap Animations

        // Gsap Initial animations when page loads
        gsap.from(".heading-titles .title", {
            y: 100,
            opacity: 0,
        });
        gsap.from(".heading-titles .title-sub2", {
            y: 50,
            delay: 0.3,
            opacity: 0,
        });
        gsap.from(".heading-titles .title-sub", {
            y: 50,
            delay: 0.3,
            opacity: 0,
        });
        gsap.from(".heading-titles .heading-keys", {
            y: 50,
            delay: 0.3,
            opacity: 0,
        });

        let mobileViewPort = 992
        if($(window).width() > mobileViewPort){
            // Make main blog section's text scroll speed faster
            gsap.to(".blog-main .text, .service-block .text", {
                y: -0.1 * ScrollTrigger.maxScroll(window),
                ease: "none",
                scrollTrigger: {
                    start: 0,
                    end: "max",
                    invalidateOnRefresh: true,
                    scrub: 0
                }
            });

            // Make new case item section's text scroll speed faster
            gsap.to(".new-case-item .text", {
                y: -0.5 * ScrollTrigger.maxScroll(window),
                ease: "none",
                scrollTrigger: {
                    start: 0,
                    end: "max",
                    invalidateOnRefresh: true,
                    scrub: 0
                }
            });

            // Make new case item section's img scroll speed faster
            gsap.to(".new-case-item .img img", {
                y: 0.2 * ScrollTrigger.maxScroll(window),
                ease: "none",
                scrollTrigger: {
                    start: 0,
                    end: "max",
                    invalidateOnRefresh: true,
                    scrub: 0
                }
            });


            // Agency Video block scales to full width when scroll animation
            gsap.fromTo(".video-block", {
                scale: 0.95,
            }, {
                scrollTrigger: {
                    trigger: ".about-video",
                    scrub: true,
                    start: "top 70%",
                    end: "30% start",
                },
                scale: 1,
                duration: 1
            })
        }

        
        // Animation for .back-animation element when scroll comes to this element make the elemen's width 0

        gsap.utils.toArray(".back-animation").forEach(item => {
            gsap.fromTo(item, {
                width: "100%",
                //backgroundColor: "#191D29"
            }, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                },
                duration: 1.5,
                width: "0",
                //backgroundColor: "#191D29"
            });
        })

        function initializeAnimations() {
            // Obtener todos los elementos con la clase 'blog-grid-item'
            var elementos = document.querySelectorAll(".blog-grid-item-bloqueado");//quitar -bloqueado
          
            // Crear un objeto ScrollTrigger para cada elemento
            elementos.forEach(function(elemento) {
              // Crear un objeto ScrollTrigger
              var scrollTrigger = ScrollTrigger.create({
                // El elemento que se activará el ScrollTrigger
                trigger: elemento,
                // El evento que activará el ScrollTrigger
                start: "top bottom",
                // El evento que desactivará el ScrollTrigger
                end: "bottom top",
                // La función que se ejecutará cuando el ScrollTrigger se active
                onEnter: function() {
                  // Animar el elemento
                  gsap.to(elemento, {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                  });
                },
                // La función que se ejecutará cuando el ScrollTrigger se desactive
                onLeaveBack: function() {
                  // Animar el elemento
                  gsap.to(elemento, {
                    y: 200,
                    opacity: 1,
                    duration: 0.5,
                  });
                },
              });
            });
          }
          
          // Función para reiniciar todas las animaciones
          function resetAnimations() {
            // Obtener todos los objetos ScrollTrigger
            var scrollTriggers = ScrollTrigger.getAll();
          
            // Detener todos los objetos ScrollTrigger
            scrollTriggers.forEach(function(scrollTrigger) {
              scrollTrigger.kill();
            });
          
            // Reiniciar las animaciones
            initializeAnimations();
          }
          
          // Inicializar las animaciones cuando la página se carga por primera vez
          initializeAnimations();
          
          // Escuchar el evento 'popstate' para reiniciar las animaciones al navegar hacia atrás o adelante
          window.addEventListener('popstate', resetAnimations);

          
          

        // Title sections come from bottom animation
        gsap.utils.toArray(".section-title-container").forEach(item => {
            gsap.from(item, {
                y: "100%",
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                },
                ease: "expo",
                opacity: 0,
                duration: 1,
            });
        })

        // Case items come from bottom animation
        gsap.utils.toArray(".case-item").forEach(item => {
            gsap.fromTo(item, {
                y: 100,
                opacity: 0,
            }, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                    end: "bottom 70%",
                    scrub: true,
                },
                opacity: 1,
                y: 0
            });
        })




        // 10. Sticky Element
        $(".sticky").parents().css("overflow", "visible");


    });


    /*
       =================================
          When document is resize, do
       =================================
    */

    $(window).on('resize', function () {

    });


    /*
       =================================
          When document is scroll, do
       =================================
    */
    $(window).on('scroll', function () {

    });


    /*
       =================================
          When document is loaded, do
       =================================
    */
    $(window).on('load', function () {

    });



})(window.jQuery);


/*script.js*/

$(document).ready(function(){

    $('.scroll-top').hide();
  
    /*--------------- Navbar Toggler ---------------*/
    $('#menu-btn').click(function(){
      $(this).toggleClass('fa-times');
      $('.navbar').toggleClass('active');
    });
  
    /*--------------- Scroll-Top ---------------*/
    $(window).on('scroll',function(){
      
      $('#menu-btn').removeClass('fa-times');
      $('.navbar').removeClass('active');
  
      // STICKY HEADER
      if($(window).scrollTop() > 0){
        $(".header").addClass("sticky");
      }else{
        $(".header").removeClass("sticky");
      }
  
      $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
          $('.scroll-top').fadeIn();
        } else {
          $('.scroll-top').fadeOut();
        }
      });
  
    });
  
  });
  
  /*Boton Whatsap*/
  window.onscroll = function() {
    // Obtén la posición actual del desplazamiento vertical
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Establece la posición en la que deseas mostrar el botón (por ejemplo, 200 píxeles desde la parte superior)
    var showButtonPosition = 1000;
    
    // Si la posición de desplazamiento es mayor o igual que la posición deseada, muestra el botón; de lo contrario, ocúltalo.
    if (scrollTop >= showButtonPosition) {
      document.getElementById("btn-wsp").style.display = "flex";/*flex por que asi se ajusta la imagen al centro */
    } else {
      document.getElementById("btn-wsp").style.display = "none";
    }
  };

  // Agrega una función para manejar el clic en el botón si quieres hacer algo cuando se haga clic
  /*document.getElementById("btn-wsp").addEventListener("click", function() {
    // Realiza alguna acción cuando se haga clic en el botón
    alert("¡Te redigiremos a whatsap !, esta bien?");
  });*/

  /*Boton Whatsap End*/


  var swiper = new Swiper('.blog-slider', {
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    mousewheel: {
      invert: false,
    },
    // autoHeight: true,
    pagination: {
      el: '.blog-slider__pagination',
      clickable: true,
    },
  });

    // Initialize scripts that require a loaded page
    $window.on('load', function () {
        // Page loader & Page transition
        if (plugins.preloader.length && !isNoviBuilder) {
            pageTransition({
                target: document.querySelector( '.page' ),
                delay: 0,
                duration: 500,
                classIn: 'fadeIn',
                classOut: 'fadeOut',
                classActive: 'animated',
                conditions: function (event, link) {
                    return !/(\#|callto:|tel:|mailto:|:\/\/)/.test(link) && !event.currentTarget.hasAttribute('data-lightgallery');
                },
                onTransitionStart: function ( options ) {
                    setTimeout( function () {
                        plugins.preloader.removeClass('loaded');
                    }, options.duration * .75 );
                },
                onReady: function () {
                    plugins.preloader.addClass('loaded');
                    windowReady = true;
                }
            });
        }
    });
