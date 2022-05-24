$(function () {
    // var menu = document.querySelector('.top .menu')
    $('.top .menu').mouseenter(function () {
        $(this).children('.dd').show();
    })
    $('.top .menu').mouseleave(function () {
        $(this).children('.dd').hide();
    })

})