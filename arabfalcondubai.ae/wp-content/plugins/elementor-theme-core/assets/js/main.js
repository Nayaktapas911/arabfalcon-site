(function($) {
    'use strict';

    $(window).on('elementor/frontend/init', function() {
        // elementor.hooks.addAction( 'etc-custom-section-classes', function( settings ) {
        //  settings.custom_section_classes = '312312312';
        //  return settings;
        // } );
        elementorFrontend.waypoint = elementorFrontend.waypoint || function(el, callback, args) {
            args = args || {};
            el = $(el);
            $.each(el, function(index, item) {
                const obj = $.extend({
                    callback: event => {
                        if (event.isInViewport) {
                            callback.apply(this, args);
                        }
                    }
                }, args);
                const observer = elementorModules.utils.Scroll.scrollObserver(obj);
                observer.observe(item);
            });
        };
    });

    var subMegamenu = $('.sub-megamenu');
    $.each(subMegamenu, function(index, megamenu) {
        megamenu = $(megamenu);
        if (megamenu.find('.menu .current-menu-item').length > 0) {
            megamenu.parents('.megamenu').addClass('current-menu-ancestor current-menu-parent');
        }
    });

    // load more
    $(document).on('click', '.cms-load-more', function() {
        var gridEl = $(this).parents('.cms-grid');
        var loadmore = $(this).data('loadmore') || gridEl.data('loadmore');
        var layout_type = gridEl.data('layout');
        var loading_text = $(this).data('loading-text');
        var no_text = $(this).data('no-text');

        loadmore.maxPages = parseInt(gridEl.data('max-pages'));
        loadmore.paged = parseInt(gridEl.data('start-page')) + 1;

        gridEl.find('.cms-grid-overlay').addClass('loader');
        $(this).addClass('loading');
        $(this).find('.cms-btn-icon').addClass('loading');
        $(this).find('.cms-btn-text').text(loading_text);
        $(document).trigger('etc_grid_before_load_more', gridEl);
        $.ajax({
            url: main_data.ajax_url,
            type: 'POST',
            beforeSend: function() {

            },
            data: {
                action: pagination_data.get_posts_action,
                settings: loadmore
            }
        }).done(function(res) {
            if (res.status == true) {
                let gridContent = gridEl.find('.cms-grid-content');
                if (gridContent.length == 0) {
                    gridEl.find('.cms-grid-inner').append(res.data.html);
                } else {
                    gridContent.append(res.data.html);
                }
                gridEl.data('start-page', res.data.paged);
                gridEl.find('.cms-grid-overlay').removeClass('loader');
                gridEl.find('.cms-load-more').removeClass('loading');
                gridEl.find('.cms-btn-icon').removeClass('loading');
                gridEl.find('.cms-btn-text').text('Load More');
                if (res.data.paged == loadmore.maxPages) {
                    gridEl.find('.cms-load-more').addClass('no-more');
                    gridEl.find('.cms-btn-text').text(no_text);
                }
                if (layout_type == 'masonry') {
                    // $.sep_grid_refresh();
                    gridEl.find('.cms-grid-masonry').imagesLoaded(function() {
                        $.sep_grid_refresh();
                    });
                }
                $.each(gridEl.find('.elementor-invisible'), function(index, item) {
                    var animate = $(this),
                        data = animate.data('settings');
                    if (typeof data['animation'] != 'undefined' || typeof data['_animation'] != 'undefined') {
                        $(this).addClass('cms-inview');

                        setTimeout(function() {
                            animate.removeClass('elementor-invisible').addClass('animated ' + data['animation']);
                        }, data['animation_delay']);

                        if (typeof data['_animation'] != 'undefined') {
                            setTimeout(function() {
                                animate.addClass(data['_animation']);
                            }, data['_animation_delay']);
                        }
                    }
                });
            } else if (res.status == false) {
                gridEl.find('.cms-load-more').addClass('no-more');
            }
            $(document).trigger('load_more_done', gridEl, res);
        }).fail(function(res) {
            gridEl.find('.cms-load-more').addClass('no-more');
            $(document).trigger('load_more_fail', gridEl, res);
            return false;
        }).always(function() {
            $(document).trigger('load_more_always', gridEl);
            return false;
        });
    });

    // pagination
    $(document).on('click', '.cms-grid-pagination .ajax a.page-numbers', function() {
        var gridEl = $(this).parents('.cms-grid');
        var loadmore = gridEl.find('.cms-grid-pagination').data('loadmore') || gridEl.data('loadmore');
        var query_vars = gridEl.find('.cms-grid-pagination').data('query') || gridEl.data('query');
        var layout_type = gridEl.data('layout');
        var paged = $(this).attr('href');
        paged = paged.replace('#', '');
        loadmore.paged = parseInt(paged);
        query_vars.paged = parseInt(paged);
        gridEl.find('.cms-grid-overlay').addClass('loader');
        $('html,body').animate({
            scrollTop: gridEl.offset().top - 100
        }, 750);
        $(document).trigger('etc_grid_before_paginate', gridEl);
        // reload pagination
        $.ajax({
            url: main_data.ajax_url,
            type: 'POST',
            beforeSend: function() {

            },
            data: {
                action: pagination_data.get_pagination_action,
                query_vars: query_vars
            }
        }).done(function(res) {
            if (res.status == true) {
                gridEl.find('.cms-grid-pagination').html(res.data.html);
                gridEl.find('.cms-grid-overlay').removeClass('loader');
            } else if (res.status == false) {}
            $(document).trigger('etc_grid_pagination_get_pagination_done', gridEl, res);
        }).fail(function(res) {
            $(document).trigger('etc_grid_pagination_get_pagination_fail', gridEl, res);
            return false;
        }).always(function() {
            $(document).trigger('etc_grid_pagination_get_pagination_always', gridEl);
            return false;
        });
        // load post
        $.ajax({
            url: main_data.ajax_url,
            type: 'POST',
            beforeSend: function() {

            },
            data: {
                action: pagination_data.get_posts_action,
                settings: loadmore
            }
        }).done(function(res) {
            if (res.status == true) {
                let gridContent = gridEl.find('.cms-grid-content');
                gridContent.find('.cms-item').remove();
                gridContent.find('.cms-grid-item').remove();
                gridEl.find('.cms-grid-inner .grid-item').remove();
                if (gridContent.length == 0) {
                    gridEl.find('.cms-grid-inner').append(res.data.html);
                } else {
                    gridContent.append(res.data.html);
                }
                gridEl.data('start-page', res.data.paged);
                if (layout_type == 'masonry') {
                    // $.sep_grid_refresh();
                    gridEl.find('.cms-grid-masonry').imagesLoaded(function() {
                        $.sep_grid_refresh();
                    });
                }
                $.each(gridEl.find('.elementor-invisible'), function(index, item) {
                    var animate = $(this),
                        data = animate.data('settings');
                    if (typeof data['animation'] != 'undefined' || typeof data['_animation'] != 'undefined') {
                        $(this).addClass('cms-inview');

                        setTimeout(function() {
                            animate.removeClass('elementor-invisible').addClass('animated ' + data['animation']);
                        }, data['animation_delay']);

                        if (typeof data['_animation'] != 'undefined') {
                            setTimeout(function() {
                                animate.addClass(data['_animation']);
                            }, data['_animation_delay']);
                        }
                    }
                });
            } else if (res.status == false) {}
            $(document).trigger('etc_grid_pagination_get_posts_done', gridEl, res);
        }).fail(function(res) {
            $(document).trigger('etc_grid_pagination_get_posts_fail', gridEl, res);
            return false;
        }).always(function() {
            $(document).trigger('etc_grid_pagination_get_posts_always', gridEl);
            return false;
        });
        return false;
    });

    // post filter
    $(document).on('click', '.cms-grid .grid-filter-wrap .filter-item', function() {
        if ($(this).hasClass('active')) {
            return false;
        }
        let gridEl = $(this).parents('.cms-grid');
        gridEl.find('.grid-filter-wrap .filter-item').removeClass('active');
        $(this).addClass('active');

        let loadmore = gridEl.find('.cms-grid-pagination').data('loadmore') || gridEl.find('.cms-load-more').data('loadmore') || gridEl.data('loadmore');
        loadmore = $.extend({}, loadmore);
        let query_vars = gridEl.find('.cms-grid-pagination').data('query') || gridEl.find('.cms-load-more').data('query') || gridEl.data('query');
        let layout_type = gridEl.data('layout');
        let filter = $(this).data('filter');
        if (typeof filter == 'undefined' || filter == '*' || filter == '') {
            filter = '';
        } else {
            loadmore.source = [filter];
        }

        loadmore.paged = 1;
        query_vars.paged = 1;
        gridEl.find('.cms-grid-overlay').addClass('loader');
        $(document).trigger('etc_grid_before_filter', gridEl);

        // reload pagination
        $.ajax({
            url: main_data.ajax_url,
            type: 'POST',
            beforeSend: function() {

            },
            data: {
                action: pagination_data.get_pagination_action,
                query_vars: query_vars,
                filter: filter,
            }
        }).done(function(res) {
            if (res.status == true) {
                gridEl.find('.cms-grid-pagination').html(res.data.html);
                gridEl.find('.cms-grid-overlay').removeClass('loader');
            } else if (res.status == false) {}
            $(document).trigger('etc_grid_filter_get_pagination_done', gridEl, res);
        }).fail(function(res) {
            $(document).trigger('etc_grid_filter_get_pagination_fail', gridEl, res);
            return false;
        }).always(function() {
            $(document).trigger('etc_grid_filter_get_pagination_always', gridEl);
            return false;
        });
        // load post
        $.ajax({
            url: main_data.ajax_url,
            type: 'POST',
            beforeSend: function() {

            },
            data: {
                action: pagination_data.get_posts_action,
                settings: loadmore
            }
        }).done(function(res) {
            if (res.status == true) {
                let gridContent = gridEl.find('.cms-grid-content');
                gridContent.find('.cms-item').remove();
                gridContent.find('.cms-grid-item').remove();
                gridEl.find('.cms-grid-inner .grid-item').remove();
                if (gridContent.length == 0) {
                    gridEl.find('.cms-grid-inner').append(res.data.html);
                } else {
                    gridContent.append(res.data.html);
                }
                gridEl.data('start-page', res.data.paged);
                $.each(gridEl.find('.elementor-invisible'), function(index, item) {
                    var animate = $(this),
                        data = animate.data('settings');
                    if (typeof data['animation'] != 'undefined' || typeof data['_animation'] != 'undefined') {
                        $(this).addClass('cms-inview');

                        setTimeout(function() {
                            animate.removeClass('elementor-invisible').addClass('animated ' + data['animation']);
                        }, data['animation_delay']);

                        if (typeof data['_animation'] != 'undefined') {
                            setTimeout(function() {
                                animate.addClass(data['_animation']);
                            }, data['_animation_delay']);
                        }
                    }
                });
            } else if (res.status == false) {}
            $(document).trigger('etc_grid_filter_get_posts_done', gridEl, res);
        }).fail(function(res) {
            $(document).trigger('etc_grid_filter_get_posts_fail', gridEl, res);
            return false;
        }).always(function() {
            $(document).trigger('etc_grid_filter_get_posts_always', gridEl);
            return false;
        });
        return false;
    });
}(jQuery));