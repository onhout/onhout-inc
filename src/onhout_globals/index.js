$(function () {
    $('form').validate();


    // Add smooth scrolling to all links in navbar
    $(".navbar a:not(a.link), .servicelink, .Learn-More").on('click', function (event) {
        var $anchor = $(this);
        event.preventDefault();
        var hash = this.hash;
        if (hash && window.location.pathname == '/') {
            $('html, body').animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeIn');
        } else {
            window.location.href = '/' + this.hash;
        }
    });
});