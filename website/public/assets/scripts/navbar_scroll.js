$(function () {
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 1) {
            $('.navbar').addClass('active');
        } else {
            $('.navbar').removeClass('active');
        }
    });
});