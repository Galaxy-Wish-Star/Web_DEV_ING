$(function() {
    // 设置商品数量的上下限额
    var min_num = 1;
    var max_num = 800
        // 全选
    $('.checkall').change(function() {
        // var isChecked=$(this).prop('checked');
        // $('.j-checkbox').prop('.checked',isChecked);
        $('.j-checkbox,.checkall').prop('checked', $(this).prop('checked'));
        getSum();
        // 背景颜色
        if ($(this).prop('checked')) {
            $('.cart-item').addClass('check-cart-item');
        } else {
            $('.cart-item').removeClass('check-cart-item');
        }
    })
    $('.j-checkbox').change(function() {
            // console.log($('.checkall').length);
            // console.log($('.j-checkbok').length);
            // console.log($('.j-checkbok:checked').length);
            if ($('.j-checkbox').length == $('.j-checkbox:checked').length) {
                $('.checkall').prop('checked', true);

            } else {
                $('.checkall').prop('checked', false);
                // $('.j-checkbox:checked').parents('.cart-item').addClass('check-cart-item')

            }
            getSum();
            // 背景颜色
            if ($(this).prop('checked')) {
                $(this).parents('.cart-item').addClass('check-cart-item');
            } else {
                $(this).parents('.cart-item').removeClass('check-cart-item');
            }
        })
        // 点击增加按钮
    $('.increment').click(function() {
            // 增加商品数量
            var n = $(this).siblings('.itxt').val();
            n++;
            if (n > max_num) {
                alert('商品只能选' + max_num + '件');
                n = max_num;
            } else {
                $(this).siblings('.itxt').val(n);
                // 商品小计
                // console.log($('.p-price').html().substr(1));
                // 字符串. substr(2)
                var price = ($(this).parents('.p-num').siblings('.p-price').html().substr(1) * n).toFixed(2);
                $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);

            }
            getSum();

        })
        // 点击减少按钮
    $('.decrement').click(function() {
            // 减少商品数量
            var n = $(this).siblings('.itxt').val();
            n--;
            if (n < min_num) {
                alert('商品最少需要选' + min_num + '件')
                n = min_num
            } else {
                $(this).siblings('.itxt').val(n);
                // 商品小计
                var price = ($(this).parents('.p-num').siblings('.p-price').html().substr(1) * n).toFixed(2);
                $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);

            }
            getSum();

            // siblings兄弟

        })
        // 当文本框里面的商品数量发生改变之后，自动进行商品小计计算
    $('.itxt').change(function() {
            var n = $(this).val();
            //         var p_price = $(this).parents('.p-num').siblings('.p-price').html().substr(1);
            //         var p_sum = $(this).parents('.p-num').siblings('.p-sum');
            // if(n>min_num&&n<=200){
            //     p_sum.html('￥'+(p_price*n))
            // }

            if (n >= 1 && n <= 200) {
                var price = ($(this).parents('.p-num').siblings('.p-price').html().substr(1) * n).toFixed(2);
                $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);
            }
            if (n <= 0) {
                alert('商品不能小于1');
                n = 1;
                $(this).val(n);
                var price = ($(this).parents('.p-num').siblings('.p-price').html().substr(1) * n).toFixed(2);
                $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);
            }
            if (n >= 200) {
                alert('商品不能大于200');
                n = 200;
                $(this).val(n);
                var price = ($(this).parents('.p-num').siblings('.p-price').html().substr(1) * n).toFixed(2);
                $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);
            }
            getSum();


        })
        // 计算选中商品的总件数和总金额

    function getSum() {
        // 计算选中商品的总件数
        var count = 0;
        var item = $('.j-checkbox:checked').parents('.cart-item'); // 选中商品所在行
        item.find('.itxt').each(function(i, ele) {
            // count=count+$(ele).val()
            count += parseInt($(ele).val());
        })
        $('.amount-sum em').text(count);
        // 计算选中商品的总金额
        var sum = 0

        var item = $('.j-checkbox:checked').parents('.cart-item');
        item.find('.p-sum').each(function(i, ele) {
            // count=count+$(ele).val()
            sum += parseFloat($(ele).text().substr(1));
        })
        $('.price-sum em').text('￥' + sum.toFixed(2));
    }

    // 商品所在行的删除按钮
    $('.p-action a').click(function() {
        $(this).parents('.cart-item').remove();
        getSum();
    })

    // 删除选择的商品
    $('.remove-batch').click(function() {
        $(".j-checkbox:checked").parents('.cart-item').remove();
        getSum();

    })

    // 清空购物车
    $('.clear-all').click(function() {
        $(".cart-item").remove();
        getSum();
    })
})