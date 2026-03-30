$(document).ready(function () {

    // ====== AOS Init ======
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80
    });

    // ====== Navbar Scroll ======
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 60) {
            $('#mainNav').addClass('navbar-scrolled');
        } else {
            $('#mainNav').removeClass('navbar-scrolled');
        }
    });

    // ====== Smooth Scroll ======
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800, 'swing');
            // Close mobile menu
            $('.navbar-collapse').collapse('hide');
        }
    });

    // ====== Active Nav Link on Scroll ======
    $(window).on('scroll', function () {
        var scrollPos = $(this).scrollTop() + 100;
        $('section[id]').each(function () {
            var top = $(this).offset().top - 100;
            var bottom = top + $(this).outerHeight();
            var id = $(this).attr('id');
            if (scrollPos >= top && scrollPos < bottom) {
                $('#mainNav .nav-link').removeClass('active');
                $('#mainNav .nav-link[href="#' + id + '"]').addClass('active');
            }
        });
    });

    // ====== Menu Filter Tabs ======
    $('.menu-pills .nav-link').on('click', function () {
        $('.menu-pills .nav-link').removeClass('active');
        $(this).addClass('active');

        var filter = $(this).data('filter');
        $('.menu-category').removeClass('active');
        $('#cat-' + filter).addClass('active');

        // Re-trigger AOS for newly visible items
        AOS.refresh();
    });

    // ====== Counter Animation ======
    var counted = false;
    $(window).on('scroll', function () {
        if (counted) return;
        var heroBottom = $('#hero').offset().top + $('#hero').outerHeight();
        if ($(this).scrollTop() + $(window).height() > heroBottom - 200) {
            counted = true;
            $('.counter').each(function () {
                var $this = $(this);
                var target = parseFloat($this.data('target'));
                var isDecimal = target % 1 !== 0;
                $({ count: 0 }).animate({ count: target }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(isDecimal ? this.count.toFixed(1) : Math.floor(this.count));
                    },
                    complete: function () {
                        $this.text(isDecimal ? target.toFixed(1) : target);
                    }
                });
            });
        }
    });

    // ====== Hero Particles ======
    function createParticles() {
        var container = $('#particles');
        for (var i = 0; i < 20; i++) {
            var particle = $('<div class="particle"></div>');
            particle.css({
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                animationDuration: (5 + Math.random() * 8) + 's',
                width: (2 + Math.random() * 4) + 'px',
                height: (2 + Math.random() * 4) + 'px'
            });
            container.append(particle);
        }
    }
    createParticles();

    // ====== Gallery Lightbox (Simple) ======
    $('.gallery-item').on('click', function () {
        var imgSrc = $(this).find('img').attr('src');
        var overlay = $('<div class="lightbox-overlay"></div>');
        var img = $('<img src="' + imgSrc + '" class="lightbox-img">');
        var close = $('<button class="lightbox-close">&times;</button>');

        overlay.css({
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            cursor: 'pointer',
            animation: 'fadeSlideUp 0.3s ease'
        });

        img.css({
            maxWidth: '90%',
            maxHeight: '85vh',
            borderRadius: '20px',
            objectFit: 'contain'
        });

        close.css({
            position: 'absolute',
            top: '20px',
            right: '30px',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '2.5rem',
            cursor: 'pointer',
            zIndex: 100000
        });

        overlay.append(close).append(img);
        $('body').append(overlay);

        overlay.on('click', function () { overlay.remove(); });
    });

});
