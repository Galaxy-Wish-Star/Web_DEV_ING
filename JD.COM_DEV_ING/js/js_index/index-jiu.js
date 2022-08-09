$(function() {
    // var menu=document.querySelector('.top .menu')
    $('.top .menu').mouseover(function() {
        $(this).children('.dd').stop().slideDown(1000);
    })
    $('.top .menu').mouseout(function() {
            $(this).children('.dd').stop().slideUp(1000);
        })
        // 左侧菜单
    $('.header .banner .one ul li').mouseenter(function() {
        //    console.log($(this).index());
        $('#J_popCtn').show();
        $('#J_popCtn .cate_part').eq($(this).index()).show();
    })
    $('.header .banner .one ul li').mouseleave(function() {
        //    console.log($(this).index());
        $('#J_popCtn').hide();
        $('#J_popCtn .cate_part').eq($(this).index()).hide();
    })
    $(".banner .one .cate_part").mouseover(function() {
        //    console.log($(this).index());
        $(".JS_popCtn").show();
        $(this).show();
    })
    $(".banner .one .cate_part").mouseout(function() {
            //    console.log($(this).index());
            $(".JS_popCtn").hide();
            $(this).hide();
        })
        // 广告
    $('.guanggao').fadeIn(2000).delay(3000).animate({
            opacity: '0',
            height: '1000',
            width: '5000'
        }, 2000, function() {
            $(this).hide();
        })
        // 电梯导航
    var elevator = $('.elevator');
    // scroll-窗口滚动事件
    $(window).scroll(function() {
        // console.log($(document).scrollTop());
        var h = $(document).scrollTop(); //获取滚动条滚动后页面向上卷去的高度
        var e_h = $('.main .one').offset().top; //距离顶端的距离
        // 当滚动到对应位置时，将电梯导航定位 方式固定改变固定定位
        if (h > e_h) {
            elevator.addClass('elevator_fix');
        } else {
            elevator.removeClass('elevator_fix');
        }
        //页面滚到某个位置，电梯导航相应位置文字颜色变红
        $('.main .inner .leval').each(function(i, e) {
            if (h >= $(e).offset().top) {
                $('.elevator>ul>li').eq(i).addClass('active').siblings().removeClass('active')
            } else {
                $('.elevator>ul>li').eq(i).removeClass('active')
            }
        })
    })

    //  点击电梯导航的某个位置，页面可以滚动到相应内容区域 点击事件
    $('.elevator>ul>li').click(function() {
            //  每次点击li 就需要计算出页面要去往的位置
            // 选出对应索引号的内容区的盒子  计算它的.offset().top
            var current;
            // 页面动画滚动效果
            if ($(this).index() == 4) {
                current = 0;
            } else {
                current = $('.main .inner .leval').eq($(this).index()).offset().top;
            }
            $("html").stop().animate({
                scrollTop: current + 1
            });
            // 点击之后，让当前的小li 添加active类名，其他一处active类名
            $(this).addClass('active').siblings().removeClass();
        })
        //  元素的宽度  width()    innerWidth()   outerWidth()   outerWidth(true)
        //  元素距离浏览器的间距（上，左）  offset()  top   left    offset().top    offset().left 
        // 元素在浏览器的滚动条时向上或向左卷去的距离   scrollTop()     scrollLeft() 
        // 滚动条滚动事件   scroll(function(){})
        // 页面滚动到某个内容区域，电梯导航相应位置颜色变化

})