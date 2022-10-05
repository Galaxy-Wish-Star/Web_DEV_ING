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
    $('span').click(function(){
        $('.advert').remove()
    })
    //电梯导航
    var elevator = $('.elevator');
    $(window).scroll(function() {
     var h = $(document).scrollTop(); //卷去的头部
     var e_h = $('.main .one').offset().top; //距离页面顶端的距离
     // 将电梯导航固定到绝对位置
    if (h > e_h) {
        elevator.addClass('elevator_fix');
    } else {
        elevator.removeClass('elevator_fix');
    }
     // 滚动时电梯随之改变
    $('.main .inner .leval').each(function(i, e) {
        if (h >= $(e).offset().top) {
            $('.elevator>ul>li').eq(i).addClass('active').siblings().removeClass('active')
        } else {
            ('.elevator>ul>li').eq(i).removeClass('active')
        }
    })
    $('.elevator>ul>li').click(function() {
        var current;
        if ($(this).index() == 4) {
        current = 0;
        } else {
            current = $('.main .inner .leval').eq($(this).index()).offset().top;
        }
        $('html').stop().animate({
            scrollTop: current + 1
        });
        $(this).addClass('active').siblings().removeClass();
    })
})
    // 广告方式
    $('.advert').stop().slideDown(1000).fadeOut.dadeln(1000);
})
