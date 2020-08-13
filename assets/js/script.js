'use strict';

var alert = (function() {
	
    var alertLifetime = 5000;

    var generate = function(type, message) {
        var newAlert = $('<div class="alert alert-' + type + ' fade show" id="page-alert" role="alert">' + message + '</div>');

        $('body').append(newAlert);

        setTimeout(function() {
            newAlert.alert('close');
        }, alertLifetime);
    };

    $(document).on('alert.show', function(e, type, message) {
        generate(type, message);
    });

})();

var Navbar = (function() {

    var $navbar = $('.navbar');
    var $navbarCollapse = $('.navbar-collapse');

    function makeNavbarDark() {
        $navbar.removeClass('navbar-light').addClass('navbar-dark');
    }

    function makeNavbarLight() {
        $navbar.removeClass('navbar-dark').addClass('navbar-light');
    }

    function toggleNavbarClass() {
        var scrollTop = $(window).scrollTop();

        if (scrollTop > 5) {
            makeNavbarDark();
        } else {
            makeNavbarLight();
        }
    }

    toggleNavbarClass();

    $(window).on({
        'scroll': function() {
            toggleNavbarClass();
        }
    });

    $navbarCollapse.on({
        'show.bs.collapse': function() {
            makeNavbarDark();
        },
        'hidden.bs.collapse': function() {
            if ($(window).scrollTop() == 0) {
                makeNavbarLight();
            }
        }
    });

})();

var Menu = (function() {

    var $menu = $('.section_menu_grid');
    var $menuNav = $('.section_menu_nav');
    var menuItem = '.menu_item';

    function initMenu() {
        $menu.each(function() {
            var $this = $(this);
            var menuId = $this.attr('id');
            var menuDefault = $menuNav.find('li.active > a[href="#' + menuId + '"]').data('filter');
            
			var grid = $this.isotope({
                itemSelector: menuItem,
                filter: menuDefault
            });

            grid.imagesLoaded().progress(function() {
                grid.isotope('layout');
            });

        });
    };

    function filterItems(e) {
        var targetMenu = $menu.filter(e.attr('href'));
        var targetCategory = e.data('filter');

        targetMenu.isotope({
            filter: targetCategory
        });
    };

    function toggleLinks(e) {
        e.parent('li').siblings('li').removeClass('active');
        e.parent('li').addClass('active');
    }

    if ($menu.length) {
        initMenu();
    }

    $menuNav.on('click', 'li > a', function(e) {
        e.preventDefault();

        var $this = $(this);

        filterItems($this);
        toggleLinks($this);
    });
})();

var Dishes = (function() {

    var $dishes = $('.section_dishes_carousel');

    function init() {
        $dishes.each(function() {
            $(this).flickity({
                cellAlign: 'left',
                setGallerySize: false,
                wrapAround: true,
                pageDots: false,
                imagesLoaded: true
            });
        });
    }

    if ($dishes.length) {
        init();
    }
})();

var Reservation = (function() {


    var $reservationButton = $('.btn[href="#section_reservation"]');
    var $form = $('#reservation_form');
    var formEmail = '#reservation_form_email';
    var formDate = '#reservation_form_date';
    var formSubmit = $form.find('[type="submit"]');


    function getCurrentDate() {
        var today = new Date();

        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }

        return yyyy + '-' + mm + '-' + dd;
    }

    function setCurrentDate() {
        var today = getCurrentDate();
        $(formDate).val(today);
    }

    function submitForm($this) {

        $form.find('.is-invalid').removeClass('is-invalid');
        $form.find('.invalid-feedback').html('');
        var errors = new Array();

        function isEmail(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }

        function showError(elem, message) {
            $(elem).addClass('is-invalid');
            $(elem).next('.invalid-feedback').html(message);
        }

        if (!isEmail($(formEmail).val())) {
            errors[formEmail] = "Please enter valid email!";
        }

        if (Object.keys(errors).length) {
            for (let key in errors) {
                showError(key, errors[key]);
            }
        } else {
            $(document).trigger('alert.show', ['success', "Table resetvation successfully!"]);
            $form[0].reset();
        }

    }

    setCurrentDate();

    $form.on('submit', function(e) {
        e.preventDefault();
        submitForm($(this));
    });

    $reservationButton.click(function(e) {
        e.preventDefault();
        $([document.documentElement, document.body]).stop().animate({
            scrollTop: $("#section_reservation").offset().top
        }, 2000);
    });

})();

var Events = (function() {
	
    var $events = $('.section_events_items');
    var $eventsItem = $('.section_events_item');
    var $eventsItemSm = $('.section_events_item_content_sm');
    var $eventsItemLg = $('.section_events_item_content_lg');

    function toggleItem(e) {
        e.closest($events).find($eventsItem).removeClass('active');
        e.closest($eventsItem).addClass('active');
    }

    $eventsItemSm.on('click', function() {
        toggleItem($(this));
    });
})();

var Newsletter = (function() {

    var $form = $('#subscribe-form');
    var $formEmail = $form.find('#email');

    function signup() {

        function isEmail(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }

        if (!isEmail($formEmail.val())) {
            $(document).trigger('alert.show', ['danger', "Please enter a valid email!"]);
        } else {
            $(document).trigger('alert.show', ['success', "Sign-up for newsletter successfully!"]);
            $form[0].reset();
        }
    }

    $form.on('submit', function(e) {
        e.preventDefault();
        signup();
		return false;
    });
})();

var Carousel = (function() {

    var $carousel = $('.section_carousel_slider');

    function init() {
        $carousel.each(function() {
            $(this).flickity({
                cellAlign: 'left',
                wrapAround: true,
                imagesLoaded: true
            });
        });
    }

    if ($carousel.length) {
        init();
    }
})();

var Gallery = (function() {

    var $gallery = $('.section_gallery_grid');
    var galleryItem = '.section_gallery_grid_item';

    function initGallery() {
        $gallery.each(function() {

            var grid = $(this).isotope({
                itemSelector: galleryItem
            });

            grid.imagesLoaded().progress(function() {
                grid.isotope('layout');
            });
        });
    };

    if ($gallery.length) {
        initGallery();
    }
})();

var Contact = (function() {

    var $form = $('#contact_form');
    var formEmail = '#contact_form_email';

    function contact() {
		
        $form.find('.is-invalid').removeClass('is-invalid');
        $form.find('.invalid-feedback').html('');
		
        var errors = new Array();

        function isEmail(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }

        function showError(elem, message) {
            $(elem).addClass('is-invalid');
            $(elem).next('.invalid-feedback').html(message);
        }

        if (!isEmail($(formEmail).val())) {
            errors[formEmail] = "Please enter valid email!";
        }

        if (Object.keys(errors).length) {
            for (let key in errors) {
                showError(key, errors[key]);
            }
        } else {
            $(document).trigger('alert.show', ['success', "Send message successfully!"]);
            $form[0].reset();
        }
    }

    $form.on('submit', function(e) {
        e.preventDefault();
        contact();
    });

})();

var CurrentDate = (function() {

    var $dateContainer = $('#js-current-year');

    function appendDate() {
        var currentYear = new Date().getFullYear();
        $dateContainer.text(currentYear);
    }

    if ($dateContainer.length) {
        appendDate();
    }

})();