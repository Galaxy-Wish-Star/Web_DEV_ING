$(function() {
    // 全选
    $('.checkall').change(function() {
        // var isChecked=$(this).prop('checked');
        // $('.j-checkbox').prop('.checked',isChecked);
        $('.j-checkbox,.checkall').prop('checked', $(this).prop('checked'));
    })
    $('.j-checkbox').change(function() {
            // console.log($('.checkall').length);
            // console.log($('.j-checkbok').length);
            // console.log($('.j-checkbok:checked').length);
            if ($('.j-checkbox').length == $('.j-checkbox:checked').length) {
                $('.checkall').prop('checked', true);
            } else {
                $('.checkall').prop('checked', false);
            }
        })
        // 点击增加按钮
    $('.increment').click(function() {
            // 增加商品数量
            var n = $(this).siblings('.itxt').val();
            n++;
            if (n > 200) {
                alert('商品不能大于200')
            } else {

                $(this).siblings('.itxt').val(n);
            }
            // 商品小计
            // console.log($('.p-price').html().substr(1));
            // 字符串. substr(2)
            var price = ($(this).parents('.p-num').siblings('.p-price').html().substr(1) * n).toFixed(2);
            $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);

        })
        // 点击减少按钮
    $('.decrement').click(function() {
            // 减少商品数量
            var n = $(this).siblings('.itxt').val();
            n--;
            if (n <= 0) {
                alert('商品不能小于1')
                n = 1
            } else {
                $(this).siblings('.itxt').val(n);
            }

            // siblings兄弟
            // 商品小计
            var price = ($(this).parents('.p-num').siblings('.p-price').html().substr(1) * n).toFixed(2);
            $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);
        })
        // 当文本框里面的商品数量发生改变之后，自动进行商品小计计算
    $('.itxt').change(function() {
        var n = $(this).val();
        if (n >= 1) {
            var price = ($(this).parents('.p-num').siblings('.p-price').html().substr(1) * n).toFixed(2);
            $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);
        } else {
            alert('商品不能小于1')
        }
        if (n <= 200) {
            var price = ($(this).parents('.p-num').siblings('.p-price').html().substr(1) * n).toFixed(2);
            $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);
        } else {
            alert('商品不能大于200')
        }
        var price = ($(this).parents('.p-num').siblings('.p-price').html().substr(1) * n).toFixed(2);
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);

    })




})