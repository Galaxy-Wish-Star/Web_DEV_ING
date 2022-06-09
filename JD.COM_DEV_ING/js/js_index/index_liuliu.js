$(function(){
    $('.top .menu').mouseenter(function(){
        $(this).children('.dd').show();
    })
    $('.top .menu').mouseleave(function(){
        $(this).children('.dd').hide();
    })
    
    $('.header .banner .one>ul li').mouseenter(function(){
        // console.log($(this).index());
        $('#J_popCtn').show();
        $('#J_popCtn .cate_part').eq($(this).index()).show();
    })
    $('.header .banner .one>ul li').mouseleave(function(){
        $('#J_popCtn').hide();
        $('#J_popCtn .cate_part').eq($(this).index()).hide();
    })
    $('#J_popCtn .cate_part').mouseenter(function(){
        $('#J_popCtn').show();
        $('#J_popCtn .cate_part').eq($(this).index()).show();
    })
    $('#J_popCtn .cate_part').mouseleave(function(){
        $('#J_popCtn').hide();
        $('#J_popCtn .cate_part').eq($(this).index()).hide();
    })
})
