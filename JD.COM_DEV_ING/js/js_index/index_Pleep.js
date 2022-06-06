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
        // 广告
    $('.ggtc img').fadeIn(2000).delay(3000).animate({
        opacity: '0',
        width: '0'
    }, 2000, function() {
        $(this).hide();
    })


    // console.log($('.main inner one').offset().top);

    //电梯导航
    var elevator = $('.elevator'); //窗口滚动事件
    $(window).scroll(function() {
        // console.log($(document).scrollTop()); //鼠标滚动的高度
        var h = $(document).scrollTop(); //h:卷去的头部
        var e_h = $('.main .one').offset().top; //距离屏幕顶端的距离
        console.log(e_h);
        if (h > e_h) {
            elevator.addClass('elevator_fix');
        } else {
            elevator.removeClass('elevator_fix');
        }
    })
})