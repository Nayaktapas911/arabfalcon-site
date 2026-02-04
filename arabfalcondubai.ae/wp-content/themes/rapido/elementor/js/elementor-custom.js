(function($) {
    "use strict";
    $(window).on('elementor/frontend/init', function($scope, settings) {
        var _elementor = typeof elementor != 'undefined' ? elementor : elementorFrontend;
        // lazy load image
        var GlobalLazyLoad = function($scope, $) {
            $.each($scope.find('.cms-lazy'), function(index, item) {
                const observer = elementorModules.utils.Scroll.scrollObserver({
                    callback: event => {
                        if (event.isInViewport) {
                            // remove css class
                            $(this).removeClass('lazy-loading').addClass('cms-lazy-loaded');
                            // add style
                            var duration = $(this).data('duration');
                            if (typeof duration != 'undefined') {
                                $(this).css({
                                    'animation-duration': duration + 'ms'
                                });
                            }
                        }
                    },
                    // offset: '0px',
                });
                observer.observe(item);
            });
        };
        elementorFrontend.hooks.addAction('frontend/element_ready/global', GlobalLazyLoad);
        // Animate
        var GlobalWidgetAnimateHandler = function($scope, $) {
            elementorFrontend.waypoint($scope.find('.elementor-invisible'), function() {
                var $heading = $(this),
                    data = $heading.data('settings');

                if (typeof data['_animation'] != 'undefined') {
                    //$heading.addClass(data['_animation']+' animated').removeClass('elementor-invisible');
                    setTimeout(function() {
                        $heading.removeClass('elementor-invisible').addClass('animated ' + data['_animation']);
                    }, data['animation_delay']);
                }
            });
        };
        elementorFrontend.hooks.addAction('frontend/element_ready/global', GlobalWidgetAnimateHandler);
        // Hover add/remove class active
        var WidgetCMSHoverAddRemoveClasses = function($scope, $) {
            $scope.find(".cms-hover-active").on('mouseenter', function(e) {
                e.preventDefault();
                // hide all
                $scope.find(".cms-hover-active").removeClass('active');
                // Show current
                $(this).addClass("active");
            }).on('mouseleave', function(e) {
                $scope.find(".cms-hover-active").removeClass('active');
            });
        };
        elementorFrontend.hooks.addAction('frontend/element_ready/global', WidgetCMSHoverAddRemoveClasses);
        // Accordion
        var WidgetCMSAccordionHandler = function($scope, $) {
            $scope.find('.cms-accordion-title').on('click', function(e) {
                e.preventDefault();
                var self = $(this);
                if (self.hasClass('animating')) {
                    return false;
                }
                self.addClass('animating');
                var target = self.data('target');
                var parent = self.parents('.cms-accordion-wrap');
                var active_items = parent.find('.cms-accordion-title.active');
                $.each(active_items, function(index, item) {
                    var item_target = $(item).data('target');
                    if (item_target != target) {
                        $(item).removeClass('active');
                        self.parent().removeClass('active');
                        $(item_target).slideUp(400);
                    }
                });

                if (self.hasClass('active')) {
                    self.parent().removeClass('active');
                    self.removeClass('active');
                    $(target).slideUp(400);
                } else {
                    self.parents('.cms-accordion').find('.cms-accordion-item').removeClass('active');
                    self.parents('.cms-accordion').find('.cms-accordion-title').removeClass('active');
                    self.parents('.cms-accordion').find('.cms-accordion-content').slideUp(400);
                    self.parent().addClass('active');
                    self.addClass('active');
                    $(target).slideDown(400);
                }
                setTimeout(function() {
                    self.removeClass('animating');
                }, 400);
            });
        };
        elementorFrontend.hooks.addAction('frontend/element_ready/global', WidgetCMSAccordionHandler);
        // Accordion Sticky
        var WidgetCMSAccordionStickyHandler = function($scope, $) {
            $scope.find('.cms-accordion-sticky').on('click', function(e) {
                e.preventDefault();
                var self = $(this);
                if (self.hasClass('animating')) {
                    return false;
                }
                self.addClass('animating');
                var target = self.data('target');
                var parent = self.parents('.cms-accordions-sticky');
                var active_items = parent.find('.cms-accordion-sticky.active');

                // active items
                /*$.each(active_items, function(index, item) {
                    var item_target = $(item).data('target');
                    if (item_target != target) {
                        $(item).removeClass('active');
                        self.parents('.cms-accordion-item').removeClass('active');
                        $(item_target).slideUp(400);
                    }
                });*/

                if (self.hasClass('active')) {
                    /*self.parents('.cms-accordion-item').removeClass('active');
                    self.removeClass('active');
                    $(target).slideUp(400);*/
                } else {
                    self.parents('.cms-accordions-sticky').find('.cms-accordion-item').removeClass('active');
                    self.parents('.cms-accordions-sticky').find('.cms-accordion-sticky').removeClass('active');
                    self.parents('.cms-accordions-sticky').find('.cms-accordion-content').slideUp(400);
                    self.parents('.cms-accordion-item').addClass('active');
                    self.addClass('active');
                    $(target).slideDown(400);
                }
                setTimeout(function() {
                    self.removeClass('animating');
                }, 400);
                // animate to top
                $('html,body').animate({
                    scrollTop: parent.offset().top - 100
                }, 30);
            });
        };
        elementorFrontend.hooks.addAction('frontend/element_ready/global', WidgetCMSAccordionStickyHandler);

        // Counter
        var WidgetCMSCounterHandler = function($scope, $) {
            elementorFrontend.waypoint($scope.find('.cms-counter-number'), function() {
                var $number = $(this),
                    data = $number.data();

                var decimalDigits = data.toValue.toString().match(/\.(.*)/);

                if (decimalDigits) {
                    data.rounding = decimalDigits[1].length;
                }

                $number.numerator(data);

            }, {
                offset: '95%',
                triggerOnce: true
            });
            // add class active to counter chart bar
            elementorFrontend.waypoint($scope.find('.cms-counter-chart-bar'), function() {
                $(this).addClass('active');
            });
            //
            $scope.find('.counter-item').on('click', function(e) {
                e.preventDefault();
                var self = $(this);
                if (self.hasClass('animating')) {
                    return false;
                }
                self.addClass('animating');
                var target = self.data('target');
                var parent = self.parents('.cms-counter-sticky');
                var active_items = parent.find('.counter-item.active');
                $.each(active_items, function(index, item) {
                    var item_target = $(item).data('target');
                    if (item_target != target) {
                        //$(item).removeClass('active');
                        //self.parent().removeClass('active');
                        //$(item_target).slideUp(400);
                        //$(item_target).removeClass('active');
                    }
                });

                if (self.hasClass('active')) {
                    //self.parent().removeClass('active');
                    //self.removeClass('active');
                    //$(target).slideUp(400);
                    //$(target).removeClass('active');
                } else {
                    self.parent().addClass('active');
                    self.addClass('active');
                    //$(target).slideDown(400);
                    $(target).addClass('active');
                }
                setTimeout(function() {
                    self.removeClass('animating');
                }, 400);
            });
            $scope.find('.counter-item').on('hover', function(e) {
                e.preventDefault();
                var self = $(this);
                if (self.hasClass('animating')) {
                    return false;
                }
                self.addClass('animating');
                var target = self.data('target');
                var parent = self.parents('.cms-counter-sticky');
                var active_items = parent.find('.counter-item.active');
                $.each(active_items, function(index, item) {
                    var item_target = $(item).data('target');
                    if (item_target != target) {
                        $(item).removeClass('active');
                        self.parent().removeClass('active');
                        //$(item_target).slideUp(400);
                        $(item_target).removeClass('active');
                    }
                });

                if (self.hasClass('active')) {
                    //self.parent().removeClass('active');
                    //self.removeClass('active');
                    //$(target).slideUp(400);
                    //$(target).removeClass('active');
                } else {
                    //$(target).slideDown(400);
                    self.parent().addClass('active');
                    self.addClass('active');
                    $(target).addClass('active');
                }
                setTimeout(function() {
                    self.removeClass('animating');
                }, 400);
            });
        };
        elementorFrontend.hooks.addAction('frontend/element_ready/global', WidgetCMSCounterHandler);
        // Tabs
        var WidgetCMSTabsHandler = function($scope, $) {
            $scope.find(".cms-tab-title").on("click", function(e) {
                e.preventDefault();
                var target = $(this).data("target");
                var target2 = $(this).data("target-2");
                var parent = $(this).parents(".cms-tabs");
                // hide all
                parent.find(".cms-tabs-content").hide().removeClass('active');
                parent.find(".cms-tab-title").removeClass('active');
                // Show current
                $(this).addClass("active");
                $(target).show().addClass('active');
                $(target2).show().addClass('active');
            });
            $scope.find(".cms-tab-title").on('mouseenter', function(e) {
                e.preventDefault();
                var target = $(this).data("target");
                var target2 = $(this).data("target-2");
                var parent = $(this).parents(".cms-tabs");
                // hide all
                parent.find(".cms-tabs-content").hide().removeClass('active');
                parent.find(".cms-tab-title").removeClass('active');
                // Show current
                $(this).addClass("active");
                $(target).show().addClass('active');
                $(target2).show().addClass('active');
            });
            $(window).on('load', function() {
                if ($(window).width() <= 575) {
                    $scope.find(".cms-tab-title").addClass('active');
                } else {
                    $scope.find('.cms-tab-title:not([data-active="active"])').removeClass('active');
                }
            });
            $(window).on('resize', function() {
                if ($(window).width() <= 575) {
                    $scope.find(".cms-tab-title").addClass('active');
                } else {
                    $scope.find('.cms-tab-title:not([data-active="active"])').removeClass('active');
                }
            });
        };
        elementorFrontend.hooks.addAction('frontend/element_ready/global', WidgetCMSTabsHandler);
        // Hover Show
        var WidgetCMSHoverShowHandler = function($scope, $) {
            $scope.find(".cms-hover").on("click", function(e) {
                e.preventDefault();
                var target = $(this).data("target");
                var target2 = $(this).data("target-2");
                var parent = $(this).parents(".cms-hovers");
                // hide all
                parent.find(".cms-hover-content").hide().removeClass('active');
                parent.find(".cms-hover").removeClass('active');
                // Show current
                $(this).addClass("active");
                $(target).show().addClass('active');
                $(target2).show().addClass('active');
            });
            $scope.find(".cms-hover").hover(function(e) {
                e.preventDefault();
                var target = $(this).data("target");
                var target2 = $(this).data("target-2");
                var parent = $(this).parents(".cms-hovers");
                // hide all
                parent.find(".cms-hover-content").hide().removeClass('active');
                parent.find(".cms-hover").removeClass('active');
                // Show current
                $(this).addClass("active");
                $(target).show().addClass('active');
                $(target2).show().addClass('active');
            });
        };
        elementorFrontend.hooks.addAction('frontend/element_ready/global', WidgetCMSHoverShowHandler);
        // CountDown
        var WidgetCMSCountDownHandler = function($scope, $) {
            var countdown = $scope.find(".cms-countdown");
            countdown.each(function() {
                var _this = $(this);
                var count_down = $(this).find('> div').data("count-down");
                setInterval(function() {
                    var startDateTime = new Date().getTime();
                    var endDateTime = new Date(count_down).getTime();
                    var distance = endDateTime - startDateTime;
                    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    var text_day = days !== 1 ? _this.attr('data-days') : _this.attr('data-day');
                    var text_hour = hours !== 1 ? _this.attr('data-hours') : _this.attr('data-hour');
                    var text_minu = minutes !== 1 ? _this.attr('data-minutes') : _this.attr('data-minute');
                    var text_second = seconds !== 1 ? _this.attr('data-seconds') : _this.attr('data-second');
                    days = days < 10 ? '0' + days : days;
                    hours = hours < 10 ? '0' + hours : hours;
                    minutes = minutes < 10 ? '0' + minutes : minutes;
                    seconds = seconds < 10 ? '0' + seconds : seconds;

                    _this.html('' +
                        '<div class="countdown-item"><div class="countdown-item-inner"><div class="countdown-amount">' + days + '</div><div class="countdown-period">' + text_day + '</div></div></div>' +
                        '<div class="countdown-item"><div class="countdown-item-inner"><div class="countdown-amount">' + hours + '</div><div class="countdown-period">' + text_hour + '</div></div></div>' +
                        '<div class="countdown-item"><div class="countdown-item-inner"><div class="countdown-amount">' + minutes + '</div><div class="countdown-period">' + text_minu + '</div></div></div>' +
                        '<div class="countdown-item"><div class="countdown-item-inner"><div class="countdown-amount">' + seconds + '</div><div class="countdown-period">' + text_second + '</div></div></div>'
                    );
                }, 100);
            });
        };
        elementorFrontend.hooks.addAction('frontend/element_ready/global', WidgetCMSCountDownHandler);
        // CMS Text Scroll with Swiper
        var CMSTextScrollHandler = function($scope, $) {
            // Swiper Text Scroll
            const Swiper = elementorFrontend.utils.swiper,
                carousel = $scope.find(".cms-swiper-container"),
                carousel_settings = {
                    wrapperClass: 'cms-swiper-wrapper',
                    slideClass: 'cms-swiper-slide',
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    spaceBetween: 10,
                    speed: 4000,
                    watchSlidesProgress: true,
                    watchSlidesVisibility: true,
                    autoplay: {
                        delay: 0,
                        pauseOnMouseEnter: false
                    },
                    loop: true,
                    navigation: false,
                    pagination: false
                };
            carousel.each(function(index, element) {
                var swiper = new Swiper(carousel, carousel_settings);
            });
            // Swiper Banner Scroll
            const banner_carousel = $scope.find(".cms-banner-swiper-container"),
                banner_carousel_settings = {
                    wrapperClass: 'cms-banner-swiper-wrapper',
                    slideClass: 'cms-swiper-slide',
                    effect: 'fade',
                    slidesPerView: 1,
                    centeredSlides: true,
                    spaceBetween: 10,
                    speed: 500,
                    watchSlidesProgress: true,
                    watchSlidesVisibility: true,
                    autoplay: {
                        delay: 2000,
                        pauseOnMouseEnter: false
                    },
                    loop: false,
                    navigation: false,
                    pagination: false
                };
            banner_carousel.each(function(index, element) {
                var swiper = new Swiper(banner_carousel, banner_carousel_settings);
            });

        };
        // Make sure you run this code under Elementor.
        elementorFrontend.hooks.addAction('frontend/element_ready/cms_text_scroll.default', CMSTextScrollHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/cms_video_player.default', CMSTextScrollHandler);

        // CMS Swiper Split Slider
        var CMSSplitSliderHandler = function($scope, $) {
            // Swiper Scroll
            const Swiper = elementorFrontend.utils.swiper,
                carousel = $scope.find(".cms-swiper-splits"),
                carousel_settings = {
                    wrapperClass: 'swiper-split-wrapper',
                    slideClass: 'cms-swiper-split',
                    slidesPerView: 1,
                    effect: 'fade',
                    direction: 'vertical',
                    loop: false,
                    mousewheel: {
                        enabled: true,
                        invert: false,
                        releaseOnEdges: true,
                        sensitivity: 3,
                    },
                    keyboard: true,
                    spaceBetween: 0,
                    speed: 500,
                    watchSlidesProgress: true,
                    watchSlidesVisibility: true,
                    autoplay: {
                        delay: 5000,
                        pauseOnMouseEnter: true
                    },
                    navigation: false,
                    pagination: {
                        el: '.cms-swiper-splits-dots',
                        type: 'bullets',
                        bulletClass: 'cms-swiper-pagination-bullet',
                        bulletActiveClass: 'cms-swiper-pagination-bullet-active',
                        clickable: true,
                        renderBullet: function(index, className) {
                            var number = (index + 1);
                            if (number < 10) number = '0' + number;
                            return '<span class="' + className + '">' + number + "</span>";
                        }
                    }
                };
            carousel.each(function(index, element) {
                var swiper = new Swiper(carousel, carousel_settings);
            });
        }
        elementorFrontend.hooks.addAction('frontend/element_ready/global', CMSSplitSliderHandler);
        // CMS multiScroll Split Slider
        var CMSmultiScrollHandler = function($scope, $) {
            // multiScroll
            const multiScroll = $scope.find('.cms-multiScroll'),
                data_settings = multiScroll.data('settings'),
                multiScroll_settings = {
                    menu: false,
                    sectionsColor: [],
                    navigation: true,
                    navigationPosition: 'right',
                    navigationColor: '#00ff00',
                    navigationTooltips: [],
                };
            multiScroll.each(function() {
                $(this).multiscroll({
                    licenseKey: 'YOUR KEY HERE',
                    //sectionsColor: ['#00b3d7', '#ed2', '#ff73a1'],
                    //anchors: ['first', 'second', 'third'],
                    //menu: '#menu',
                    loopTop: false,
                    loopBottom: false,
                    navigation: true,
                    navigationPosition: 'right',
                    // selector
                    sectionSelector: '.ms-section',
                    leftSelector: '.ms-left',
                    rightSelector: '.ms-right',
                    // Navigation
                    navigationColor: '#fff',
                    // responsive
                    responsiveWidth: 880,
                    responsiveHeight: 600,
                    responsiveExpand: true,
                    // events
                    afterRender: function() {
                        multiScroll.addClass('cms-rendered');
                        $('body').addClass(multiScroll.data('class'));
                        $('body').find('#multiscroll-nav').addClass(multiScroll.data('menu-class'));
                        //alert("The resulting DOM structure is ready");
                    },
                    // Resize
                    afterResize: function() {}
                });
                // Fix Responsive
                if ($(window).width() < 768) {
                    $(this).multiscroll.destroy();
                    // fix
                    $(this).parents('html').css({
                        'overflow': '',
                        'height': ''
                    });
                    $(this).parents('body').css({
                        'overflow': '',
                        'height': ''
                    });
                } else {
                    $(this).multiscroll.build();
                    // fix
                    $(this).parents('html').css({
                        'overflow': 'hidden',
                        'height': '100%'
                    });
                    $(this).parents('body').css({
                        'overflow': 'hidden',
                        'height': '100%'
                    });
                }
                $(window).on('resize', function() {
                    if ($(window).width() < 768) {
                        multiScroll.multiscroll.destroy();
                        // fix
                        $scope.parents('html').css({
                            'overflow': '',
                            'height': ''
                        });
                        $scope.parents('body').css({
                            'overflow': '',
                            'height': ''
                        });
                    } else {
                        multiScroll.multiscroll.build();
                        // fix
                        $scope.parents('html').css({
                            'overflow': 'hidden',
                            'height': '100%'
                        });
                        $scope.parents('body').css({
                            'overflow': 'hidden',
                            'height': '100%'
                        });
                    }
                });
            });
        }
        elementorFrontend.hooks.addAction('frontend/element_ready/cms_products_showcase.default', CMSmultiScrollHandler);
        // CMS Progress Bar
        var WidgetCMSProgressBarHandler = function($scope, $) {
            elementorFrontend.waypoint($scope.find('.cms-progress-bar-wrap'), function() {
                var $progressbar = $(this).find('.cms-progress-bar');
                $progressbar.css('width', $progressbar.data('max') + '%');

                var $number = $(this).find('.cms-progress-bar-number'),
                    data = $number.data(),
                    decimalDigits = data.toValue.toString().match(/\.(.*)/);
                if (decimalDigits) {
                    data.rounding = decimalDigits[1].length;
                }
                $number.numerator(data);
            });
        };
        elementorFrontend.hooks.addAction('frontend/element_ready/global', WidgetCMSProgressBarHandler);
        // CMS Image Cursor
        var WidgetCMSPointerImageCursor = function($scope, $) {
            var $links = $scope.find('.cms-img-cursor'),
                x = 0,
                y = 0,
                currentXCPosition = 0,
                currentYCPosition = 0;

            if ($links.length) {
                $links.on(
                    'mouseenter',
                    function() {
                        $links.removeClass('cms--active');
                        $(this).addClass('cms--active');
                    }
                ).on(
                    'mousemove',
                    function(event) {
                        var $thisLink = $(this),
                            $followInfoHolder = $thisLink.find('.cms-cursor-pointer'),
                            $followImage = $followInfoHolder.find('.cms-cursor--pointer'),
                            $followImageItem = $followImage.find('img'),
                            followImageWidth = $followImageItem.width(),
                            followImagesCount = parseInt($followImage.data('images-count'), 10),
                            followImagesSrc = $followImage.data('images'),
                            $followTitle = $followInfoHolder.find('.cms-cursor--title'),
                            itemWidth = $thisLink.outerWidth(),
                            itemHeight = $thisLink.outerHeight(),
                            itemOffsetTop = $thisLink.offset().top - $(window).scrollTop(),
                            itemOffsetLeft = $thisLink.offset().left;
                        x = (event.clientX - itemOffsetLeft) >> 0;
                        y = (event.clientY - itemOffsetTop) >> 0;

                        if (x > itemWidth) {
                            currentXCPosition = itemWidth;
                        } else if (x < 0) {
                            currentXCPosition = 0;
                        } else {
                            currentXCPosition = x;
                        }

                        if (y > itemHeight) {
                            currentYCPosition = itemHeight;
                        } else if (y < 0) {
                            currentYCPosition = 0;
                        } else {
                            currentYCPosition = y;
                        }

                        if (followImagesCount > 1) {
                            var imagesUrl = followImagesSrc.split('|'),
                                itemPartSize = itemWidth / followImagesCount;

                            $followImageItem.removeAttr('srcset');

                            if (currentXCPosition < itemPartSize) {
                                $followImageItem.attr('src', imagesUrl[0]);
                            }

                            // -2 is constant - to remove first and last item from the loop
                            for (var index = 1; index <= (followImagesCount - 2); index++) {
                                if (currentXCPosition >= itemPartSize * index && currentXCPosition < itemPartSize * (index + 1)) {
                                    $followImageItem.attr('src', imagesUrl[index]);
                                }
                            }

                            if (currentXCPosition >= itemWidth - itemPartSize) {
                                $followImageItem.attr('src', imagesUrl[followImagesCount - 1]);
                            }
                        }

                        $followImage.css({
                            'top': itemHeight / 2,
                        });
                        $followTitle.css({
                            'transform': 'translateY(' + -(parseInt(itemHeight, 10) / 2 + currentYCPosition) + 'px)',
                            'left': -(currentXCPosition - followImageWidth / 2),
                        });
                        $followInfoHolder.css({
                            'top': currentYCPosition,
                            'left': currentXCPosition
                        });
                    }
                ).on(
                    'mouseleave',
                    function() {
                        $links.removeClass('cms--active');
                    }
                );
            }
        }
        elementorFrontend.hooks.addAction('frontend/element_ready/global', WidgetCMSPointerImageCursor);
        // Parallax
        var CMSParallax = function($scope, $) {
            var $items = $scope.find('.cms-parallax'),
                parallaxInstances = $('[data-parallax]');
            if (parallaxInstances.length && typeof ParallaxScroll === 'object') {
                ParallaxScroll.init(); //initialization removed from plugin js file to have it run only on non-touch devices
            }
        }
        elementorFrontend.hooks.addAction('frontend/element_ready/global', CMSParallax);
        // GSAP horizontal Scroll Left/Right when mouse scroll Up/Down
        var WidgetCMSGsapScrollContentHorizontal = function($scope, $) {
            if (typeof gsap !== 'undefined') {
                gsap.registerPlugin(ScrollTrigger);
                //if($(window).innerWidth() > 1024){
                cms_gsap_scroll_horizontal();
                cms_gsap_sticky_scroll_horizontal();
                //}
            }
        }
        elementorFrontend.hooks.addAction('frontend/element_ready/global', WidgetCMSGsapScrollContentHorizontal);

        function cms_gsap_scroll_horizontal() {
            /**
             * https://codepen.io/noeldelgado/pen/BaogqYy
             * */
            let sections = gsap.utils.toArray(".cms-scroll-hozr-wrap");
            sections.forEach((section, index) => {
                const w = section.querySelector('.cms-scroll-hozr');
                const [x, xEnd] = (index % 2) ? [w.scrollWidth * -1, 0] : ['100%', (w.scrollWidth - section.offsetWidth) * -1];
                gsap.fromTo(w, {
                    x
                }, {
                    x: xEnd,
                    scrollTrigger: {
                        trigger: section,
                        scrub: 0.5,
                    }
                });
            });
        }

        function cms_gsap_sticky_scroll_horizontal() {
            /**
             * https://codepen.io/jimmyadaro/pen/jOWaZZV
             * */
            let sections = gsap.utils.toArray(".cms-sticky-scroll-hozr .cms-scroll-item");
            gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: ".cms-sticky-scroll-hozr-wrap",
                    pin: true,
                    start: "top +=10px",
                    markers: false, // true/false
                    scrub: 1,
                    snap: {
                        snapTo: 1 / (sections.length - 1),
                        duration: {
                            min: 0.4,
                            max: 0.6
                        },
                        delay: 0
                    },
                    // Base vertical scrolling on how wide the container is so it feels more natural.
                    //end: () => "+=" + (document.querySelector(".cms-scroll-hozr").offsetWidth / 5)
                    end: () => "+=300"
                }
            });
        }
    });
}(jQuery));