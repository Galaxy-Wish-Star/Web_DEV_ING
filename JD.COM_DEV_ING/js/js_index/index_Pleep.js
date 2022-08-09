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
        // 当滚动到对应位置，将电梯导航的定位方式改为固定定位
        if (h > e_h) {
            elevator.addClass('elevator_fix');
        } else {
            elevator.removeClass('elevator_fix');
        }
        // 当滚动到对应位置，将电梯导航对应文字颜色变红
        $('.main .inner .leval').each(function(i, e) {
            if (h >= $(e).offset().top) {
                $('.elevator>ul>li').eq(i).addClass('active').siblings().removeClass('active')
            } else {
                $('.elevator>ul>li').eq(i).removeClass('active')
            }
        })

        // 点击对应位置跳转到对应页面
        // $('.elevator>ul>li').click(function() {
        //     // $(this).addClass('current').siblings().removeClass();
        //     var index = $(this).index();
        //     var current = $('.elevator .m').eq(index).offset().top;
        //     $('html').stop().animate({
        //         scrollTop: current
        //     })
        // })
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
})

// 元素的宽度 width()   innerWidth()  outerWidth()
// 元素距离浏览器的间距（上，右） offset()  top left  offset().top     offset().left
// 元素在浏览器滚动条滚动时向上或向左卷去的距离   scrollTop()   scrollLeft()
// 滚动条滚动的事件    scroll(function(){})

// 遍历函数
// .children()每个元素的子元素
// .find()找到每个元素的后代
// .each()对象迭代，匹配元素执行函数，类似for循环，主要用DOM元素对象处理
// .eq()指定第几个元素，下标从0开始 
// .first() .last()第一个、最后一个
// .parent()找父亲 .parents()找到所有祖先
// .siblings()找同辈元素