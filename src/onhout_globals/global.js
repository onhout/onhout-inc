$(function () {
// $('form').validate();


// Add smooth scrolling to all links in navbar
    $(".navbar a:not(a.link), .servicelink, .Learn-More").on('click', function (event) {

        const target = $(this.hash);
        const self = $(this);
        event.preventDefault();
        if (self[0].hash && window.location.pathname == '/') {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1500, 'easeInOutExpo', function () {
                // Callback after animation
                // Must change focus!
                const $target = $(target);
                $target.focus();
                if ($target.is(":focus")) { // Checking if the target was focused
                    return false;
                } else {
                    $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                    $target.focus(); // Set focus again
                }
            });
        } else {
            window.location.href = self.attr('href');
        }
    });
});