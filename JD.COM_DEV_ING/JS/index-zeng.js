$(function() {

    // var menu=document.querySelector('.top.menu')
    $('.top .menu').mouseenter(function() {
        $(this).children('.dd').stop().slideDown(1000);

    })
    $('.top .menu').mouseleave(function() {
        $(this).children('.dd').stop().slideUp(1000);
    })


    // 左菜单
    $('.header .banner .one ul li').mouseenter(function() {
        // console.log($(this)(index)());
        $('#J_popCtn').show();
        $('#J_popCtn .cate_part').eq($(this).index()).show();
    })

    $('.header .banner .one ul li').mouseleave(function() {
        // console.log($(this)(index)());
        $('#J_popCtn').hide();
        $('#J_popCtn .cate_part').eq($(this).index()).hide();
    })

    $(".banner .one .cate_part").mouseover(function() {
        $(".JS_popCtn").show();
        $(this).show();
    })
    $(".banner .one .cate_part").mouseout(function() {
        $(".JS_popCtn").hide();
        $(this).hide();
    })













    // $(document).ready(function() {
    //     $("banner.cate.li").hover(function() {
    //             $("cate_detail_con_lk").show("show");
    //         },
    //         function() {
    //             $("cate_detail_con_lk").hide("fast");
    //         }
    //     );
    // })





























})