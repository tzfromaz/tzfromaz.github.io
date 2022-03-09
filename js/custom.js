// JavaScript Document
var sel = "*";

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

window.addEventListener('load', AOS.refresh)

$(window).load(function () {
    "use strict";
    // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({
        'overflow': 'visible'
    });
})

$(document).ready(function () {
    "use strict";

    // scroll menu
    var sections = $('.section'),
        nav = $('.navbar-fixed-top,footer'),
        nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();

        sections.each(function () {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                if ($('.navbar-fixed-top')) {
                    nav.find('a').removeClass('active-navbar');
                }

                $(this).addClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
                if ($('.navbar-fixed-top')) {
                    nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active-navbar');
                }
            }
        });
    });

    nav.find('a').on('click', function () {
        var $el = $(this),
            id = $el.attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top - nav_height + 2
        }, 600);

        return false;
    });


    // Menu opacity
    if ($(window).scrollTop() > 80) {
        $(".navbar-fixed-top").addClass("bg-nav");
        $(".navbar-brand").show();
    } else {
        $(".navbar-fixed-top").removeClass("bg-nav");
        $(".navbar-brand").hide();
    }
    $(window).scroll(function () {
        if ($(window).scrollTop() > 80) {
            $(".navbar-fixed-top").addClass("bg-nav");
            $(".navbar-brand").show();
        } else {
            $(".navbar-fixed-top").removeClass("bg-nav");
            $(".navbar-brand").hide();
        }
    });



    // Parallax
    var parallax = function () {
        $(window).stellar();
    };

    $(function () {
        parallax();
    });

    // AOS
    AOS.init({
        duration: 1200,
        once: true,
        disable: 'mobile'
    });

    //  isotope
    $('#projects').waitForImages(function () {
        var $container = $('.portfolio_container');
        $container.isotope({
            filter: '*',
        });
        var $container_more = $('.portfolio_container_additional');
        $container_more.isotope({
            filter: '.nothing',
        });

        $('.portfolio_filter a').click(function () {
            $('.portfolio_filter .active').removeClass('active');
            $(this).addClass('active');

            var selector = $(this).attr('data-filter');
            sel = selector;
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 500,
                    animationEngine: "jquery"
                }
            });
            if ($('.js-fh5co-view').hasClass('active')) {
                $container_more.isotope({
                    filter: sel,
                    animationOptions: {
                        duration: 500,
                        animationEngine: "jquery"
                    }
                });
            }
            return false;
        });
    });

    //animatedModal
    // $("#demo01,#demo02,#demo03,#demo04,#demo05,#demo06,#demo07,#demo08,#demo09").animatedModal();
    var externalLinks = [2, 4, 8, 10]
    for (var i = 0; i < 13; i++) {
        if (!externalLinks.includes(i)) {
            $("#demo" + i).animatedModal({
                modalTarget: "modal" + i,
            });
        }
    }

    // Contact Form 	

    // validate contact form
    $(function () {
        $('#contact-form').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true
                },
                phone: {
                    required: false
                },
                message: {
                    required: true
                }

            },
            messages: {
                name: {
                    required: "This field is required",
                    minlength: "Your name must consist of at least 2 characters"
                },
                email: {
                    required: "This field is required"
                },
                message: {
                    required: "This field is required"
                }
            },
            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    type: "POST",
                    data: $(form).serialize(),
                    url: "../process.php",
                    success: function () {
                        $('#contact :input').attr('disabled', 'disabled');
                        $('#contact').fadeTo("slow", 1, function () {
                            $(this).find(':input').attr('disabled', 'disabled');
                            $(this).find('label').css('cursor', 'default');
                            $('#success').fadeIn();
                        });
                    },
                    error: function () {
                        $('#contact').fadeTo("slow", 1, function () {
                            $('#error').fadeIn();
                        });
                    }
                });
            }
        });

    });
});

; (function () {

    'use strict';

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };


    var fullHeight = function () {

        if (!isMobile.any()) {
            $('.js-fullheight').css('height', $(window).height());
            $(window).resize(function () {
                $('.js-fullheight').css('height', $(window).height());
            });
        }
    };

    // Parallax
    var parallax = function () {
        $(window).stellar();
    };

    var contentWayPoint = function () {
        var i = 0;
        $('.animate-box').waypoint(function (direction) {

            if (direction === 'down' && !$(this.element).hasClass('animated-fast')) {

                i++;

                $(this.element).addClass('item-animate');
                setTimeout(function () {

                    $('body .animate-box.item-animate').each(function (k) {
                        var el = $(this);
                        setTimeout(function () {
                            var effect = el.data('animate-effect');
                            if (effect === 'fadeIn') {
                                el.addClass('fadeIn animated-fast');
                            } else if (effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft animated-fast');
                            } else if (effect === 'fadeInRight') {
                                el.addClass('fadeInRight animated-fast');
                            } else {
                                el.addClass('fadeInUp animated-fast');
                            }

                            el.removeClass('item-animate');
                        }, k * 100, 'easeInOutExpo');
                    });

                }, 50);

            }

        }, { offset: '85%' });
    };



    var goToTop = function () {

        $('.js-gotop').on('click', function (event) {

            event.preventDefault();

            $('html, body').animate({
                scrollTop: $('html').offset().top
            }, 500, 'easeInOutExpo');

            return false;
        });

        $(window).scroll(function () {

            var $win = $(window);
            if ($win.scrollTop() > 200) {
                $('.js-top').addClass('active');
            } else {
                $('.js-top').removeClass('active');
            }

        });

    };

    var pieChart = function () {
        $('.chart').easyPieChart({
            scaleColor: false,
            lineWidth: 4,
            lineCap: 'butt',
            barColor: '#FF9000',
            trackColor: "#f5f5f5",
            size: 160,
            animate: 1000
        });
    };

    var skillsWayPoint = function () {
        if ($('#fh5co-skills').length > 0) {
            $('#fh5co-skills').waypoint(function (direction) {

                if (direction === 'down' && !$(this.element).hasClass('animated')) {
                    setTimeout(pieChart, 400);
                    $(this.element).addClass('animated');
                }
            }, { offset: '90%' });
        }

    };


    // Loading page
    var loaderPage = function () {
        $(".fh5co-loader").fadeOut("slow");
    };

    var viewWorks = function () {
        $('.js-fh5co-view').click(function (evt) {

            var $container = $('.portfolio_container_additional');
            $container.isotope({
                filter: '.nothing',
            });
            var $this = $(this);
            $this.toggleClass('active');
            setTimeout(function () {
                if ($this.hasClass('active')) {
                    $container.isotope({
                        filter: sel,
                        animationOptions: {
                            duration: 500,
                            animationEngine: "jquery"
                        }
                    });
                    $this.find('.js-fh5co-view-text').text('View Less');
                } else {
                    $this.find('.js-fh5co-view-text').text('View All');
                }
            }, 500);

            evt.preventDefault();

        })
    };


    $(function () {
        contentWayPoint();
        goToTop();
        loaderPage();
        fullHeight();
        parallax();
        // pieChart();
        skillsWayPoint();
        viewWorks();
    });


}());