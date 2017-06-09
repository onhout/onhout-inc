$(function () {
    $('.contactForm').validate();
    // $('.res-nav_click').click(function () {
    //     $('.main-nav').slideToggle();
    //     return false
    //
    // });
    //
    // $('.main-nav li a, .servicelink').bind('click', function (event) {
    //     var $anchor = $(this);
    //
    //     $('html, body').stop().animate({
    //         scrollTop: $($anchor.attr('href')).offset().top - 102
    //     }, 1500, 'easeInOutExpo');
    //     /*
    //      if you don't want to use the easing effects:
    //      $('html, body').stop().animate({
    //      scrollTop: $($anchor.attr('href')).offset().top
    //      }, 1000);
    //      */
    //     if ($(window).width() < 768) {
    //         $('.main-nav').hide();
    //     }
    //     event.preventDefault();
    // });

    // Add smooth scrolling to all links in navbar
    $(".navbar a:not(a.link), .servicelink, .Learn-More").on('click', function (event) {
        var $anchor = $(this);
        event.preventDefault();
        var hash = this.hash;
        if (hash && window.location.pathname == '/') {
            $('html, body').animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
        } else {
            window.location.href = '/' + this.hash;
        }
    });
});