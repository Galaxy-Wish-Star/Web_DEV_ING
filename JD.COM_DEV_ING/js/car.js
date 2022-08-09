$(function() {
    // 设置商品数量的上下限额
    var min_num = 1;
    var max_num = 200;
    // 全选
    $('.checkall').change(function() {
        // var isChecked = $(this).prop('checked');
        // $('.j-checkbox').prop('.checked', isChecked);
        $('.j-checkbox,.checkall').prop('checked', $(this).prop('checked'));
        getSum();
        if ($(this).prop('checked')) {
            $('.cart-item').addClass('check-cart-item');
        } else {
            $('.cart-item').removeClass('check-cart-item');
        }
    })

    $('.j-checkbox').change(function() {
        // console.log($('.checkall').length);
        // console.log($('j-checkbox').length);
        // console.log($('j-checkbox:checked').length);
        if ($('.j-checkbox').length == $('.j-checkbox:checked').length) {
            $('.checkall').prop('checked', true);
        } else {
            $('.checkall').prop('checked', false);
            // $('.j-checkbox:checked').parents('.cart-item').addClass('check-cart-item');
        }
        getSum();
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
            if (n < max_num) {
                $(this).siblings('.itxt').val(n);
            } else {
                alert('最多需要选' + max_num + '件!');
                n = max_num;
            }
            // 商品小计
            // console.log($('p-price').html().substr(1));   //.substr(字符串，开始位置，长度）截取字符串
            var price = ($(this).parents('.p-num').siblings('.p-price').html().substr(1) * n).toFixed(2);
            $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);
            getSum();
        })
        // 点击减少按钮
    $('.decrement').click(function() {
            // 减少商品数量
            var n = $(this).siblings('.itxt').val();
            n--;
            if (n > 0) {
                $(this).siblings('.itxt').val(n);
            } else {
                alert('最少需要选' + min_num + '件!');
                n = mix_num;
            }
            // 商品小计
            var price = ($(this).parents('.p-num').siblings('.p-price').html().substr(1) * n).toFixed(2);
            $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);
            getSum();
        })
        // 当文本框里面的数量发生改变之后，自动进行商品小计的计算
    $('.itxt').change(function() {
        var n = $(this).val();
        if (n >= min_num && n <= max_num) {
            var price = ($(this).parents('.p-num').siblings('.p-price').html().substr(1) * n).toFixed(2);
            $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);
        }
        if (n <= 0) {
            alert('最少需要选' + min_num + '件!');
            n = min_num;
            $(this).val(n);
            var price = ($(this).parents('.p-num').siblings('.p-price').html().substr(1) * n).toFixed(2);
            $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);
        }
        if (n >= max_num) {
            alert('最多需要选' + max_num + '件!');
            n = max_num;
            $(this).val(n);
            var price = ($(this).parents('.p-num').siblings('.p-price').html().substr(1) * n).toFixed(2);
            $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);
        }
        getSum();
    })

    // 计算选中商品的总件数和总金额
    function getSum() {
        // 计算选中商品总件数
        var count = 0;
        var item = $('.j-checkbox:checked').parents('.cart-item'); //选中商品所在行
        item.find('.itxt').each(function(i, ele) {
            // count=count+$(ele).val();
            count += parseInt($(ele).val());
        })
        $('.amount-sum em').text(count);

        //计算选中商品总金额
        var sum = 0;
        var item = $('.j-checkbox:checked').parents('.cart-item'); //选中商品所在行
        item.find('.p-sum').each(function(i, ele) {
            // count=count+$(ele).val();
            sum += parseFloat($(ele).text().substr(1));
        })
        $('.price-sum em').text('￥' + sum.toFixed(2));
    }
    // 商品所在行的删除按钮
    $('.p-action a').click(function() {
        $(this).parents('.cart-item').remove();
        getSum();
    })

    // 删除选择商品
    $('.remove-batch').click(function() {
        $('.j-checkbox:checked').parents('.cart-item').remove();
        getSum();
    })

    // 清除购物车
    $('.clear-all').click(function() {
        $('.cart-item').remove();
        getSum();
    })

})