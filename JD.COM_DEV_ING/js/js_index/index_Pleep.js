$(function() {
    // 顶部菜单弹出

    $('.top .menu').mouseenter(function() {
        $(this).children('.dd').fadeIn();

    })
    $('.top .menu').mouseleave(function() {
        $(this).children('.dd').fadeOut();

    })

    // 左侧菜单弹出

    $('.header .banner .one>ul>li').mouseenter(function() {
        // console.log($(this).index());
        $('#J_popCtn').show();
        $('#J_popCtn .cate_part').eq($(this).index()).show();
    })
    $('.header .banner .one>ul>li').mouseleave(function() {
        // console.log($(this).index());
        $('#J_popCtn').hide();
        $('#J_popCtn .cate_part').eq($(this).index()).hide();
    })
    $('#J_popCtn .cate_part').mouseenter(function() {
        $('#J_popCtn').show();
        $('#J_popCtn .cate_part').eq($(this).index()).show();
    })
    $('#J_popCtn .cate_part').mouseleave(function() {
        $('#J_popCtn').hide();
        $('#J_popCtn .cate_part').eq($(this).index()).hide();
    })
})