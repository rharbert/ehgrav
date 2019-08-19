
////////////////////////////////////////////////////////////////////////////////
// Google reCaptcha
////////////////////////////////////////////////////////////////////////////////
function onSubmit(token) {
  document.getElementById("contact").submit();
}

////////////////////////////////////////////////////////////////////////////////
// Go to Top button
////////////////////////////////////////////////////////////////////////////////
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
        document.getElementById("goToTop").style.display = "block";
    } else {
        document.getElementById("goToTop").style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


////////////////////////////////////////////////////////////////////////////////
// jQuery
////////////////////////////////////////////////////////////////////////////////

jQuery(function($) {
    $('body').removeClass('no-js');

    ////////////////////////////////////////////
    ////Remove "Only 1 pair available" when item SOLD
    ////////////////////////////////////////////
    if ($(".out-of-stock").length) {
        $(".other").hide();
    }; 

    ////////////////////////////////////////////
    ////Toggle Accordion Open/Close
    ////////////////////////////////////////////
    $(".expand-icon").on("click", function () {
        $(".accordion").toggle();
    });
  
    ////////////////////////////////////////////
    ////Toggle Article On
    ////////////////////////////////////////////
    $(".expand").on("click", function () {
        let contents = $(this).parent().siblings(".article-contents").html();
        $(".article-container").html(contents);
    });

   /////////////////////////////////////////////////////////////////////////////
   // Mobile menu drawer
   /////////////////////////////////////////////////////////////////////////////

    $('.js-toggle-menu').on('click', function(e) {
        e.preventDefault();
        if(jQuery(this).hasClass('is-active')) {
            jQuery('body').removeClass('overlay-is-active');
            jQuery('.js-toggle-menu, .overlay, .drawer').removeClass('is-active');
        } else {
            jQuery('body').addClass('overlay-is-active');
            jQuery('.js-toggle-menu, .overlay, .drawer').addClass('is-active');
        }
    });

    $('.mobile-nav a > span').on('click', function(e) {
        e.preventDefault();
        if(jQuery(this).parents('li').hasClass('is-active')) {
            jQuery(this).parents('ul').find('li').removeClass('is-active');
        } else {
            jQuery(this).parents('ul').find('li').removeClass('is-active');
            jQuery(this).parents('li').addClass('is-active');
        }
    });

    $('.mobile-nav a').on('click', function(e) {
        if(e.toElement !== this) {
            return;
		}
        if(jQuery(this).is('[href*="#"]') && jQuery(this).parents('li').hasClass('current-menu-parent')) {
            jQuery('body').removeClass('overlay-is-active');
            jQuery('.js-toggle-menu, .overlay, .drawer').removeClass('is-active');
        }
    });

   /////////////////////////////////////////////////////////////////////////////
   // Menu auto shut
   /////////////////////////////////////////////////////////////////////////////

    $(window).resize(function() {
        if(jQuery(window).width() > 960) {
            jQuery('.overlay, .drawer, .js-toggle-menu').removeClass('is-active');
            jQuery('body').removeClass('overlay-is-active');
        }
    }).resize();

   /////////////////////////////////////////////////////////////////////////////
   // Smooth scroll to start
   /////////////////////////////////////////////////////////////////////////////

    $('#to-start').click(function(){
        var start_y = $('#start').position().top;
        var header_offset = 45;
        window.scroll({ top: start_y - header_offset, left: 0, behavior: 'smooth' });
        return false;
    });

   /////////////////////////////////////////////////////////////////////////////
   // Capitalize first letter only in sentence (string) used in taxonomy categories
   /////////////////////////////////////////////////////////////////////////////

    $('.tags-item').text(function(_, txt) {
        return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
    });

   /////////////////////////////////////////////////////////////////////////////
   // Lightslider
   /////////////////////////////////////////////////////////////////////////////

    $('#lightSlider').lightSlider({
        gallery: true,
        item: 1,
        speed: 600,
        loop: true,
        slideMargin: 0,
        thumbItem: 8, // Width of thumbnails calculated by this setting
        galleryMargin: 0,
        thumbMargin: 2,
        enableTouch: true, // zoom ... set as false when using zoom
        freeMove: false, // not sure what freeMove is but disabled since slider fine without
        enableDrag: true // Desktop mouse support, set to false when zoom enabled
    });

   /////////////////////////////////////////////////////////////////////////////
   // Isotope
   /////////////////////////////////////////////////////////////////////////////

   // external js: isotope.pkgd.js, imagesloaded.pkgd.js

    // init Isotope (only IF .grid.isotope exists, otherwise get js errors in
    // console even though nothing is broken visually )
    if ( $(".grid-isotope").length ) {
      var grid = document.querySelector('.grid-isotope');

      var iso = new Isotope( grid, {
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
          columnWidth: '.grid-sizer'
        }
      });

      // images loaded
      imagesLoaded( grid ).on( 'progress', function() {
        // layout Isotope after each image loads
        iso.layout();
      });
    }
});
