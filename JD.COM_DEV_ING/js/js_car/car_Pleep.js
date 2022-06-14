$(function() {
    // 全选按钮的选中
    $('.checkall').change(function() {
        // var isChecked=$(this).prop('checked');
        // $('.j-checkbox').prop('checked',isChecked)
        //获取属性值  利用prop()一个值是获取值  两个值是设置
        $('.j-checkbox,.checkall').prop('checked', $(this).prop('checked'));
        // $('.checkall,j-checkbox').prop('checked',$(this).prop('checked'));
        // 全选中的商品增加背景色
        if ($(this).prop('checked')) {
            $('.cart-item').addClass('check-cart-item')
        } else {
            $('.cart-item').removeClass('check-cart-item')
        }
    })

    // 反选
    $('.j-checkbox').change(function() {
        if ($('.j-checkbox:checked').length == 3) {
            $('.checkall').prop('checked', true)
        } else {
            $('.checkall').prop('checked', false)
        }
        // 被单选中的商品添加背景色
        if ($(this).prop('checked')) {
            $(this).parent().parent('.cart-item').addClass('check-cart-item')
        } else {
            $(this).parent().parent('.cart-item').removeClass('check-cart-item')
        }
    })

    //增减商品数量,声明一个变量，点击+号（increment），就让这个值++，然后赋值给文本框。
    // 加
    $('.increment').click(function() {
        var n = $(this).siblings('.itxt').val(); //获取值 n数量
        if (n < 10) {
            n++;
        } else {
            alert('商品购买数量已达库存容量！');
        }
        $(this).siblings('.itxt').val(n)

        //计算金额 
        var d = $(this).parents('.p-num').siblings('.p-price').html().substr(1) //d单价
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + (d * n).toFixed(2))
    })

    // 减
    $('.decrement').click(function() {
        var n = $(this).siblings('.itxt').val();
        if (n == 1) {
            alert('是否要删除该商品？');
            $(".cart-item").remove();
            return false;
        } else {
            n--;
        }
        $(this).siblings('.itxt').val(n)

        //计算金额
        var d = $(this).parents('.p-num').siblings('.p-price').html().substr(1) //p单价    /substr从第二位开始获取字符串
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + (d * n).toFixed(2))

    })

    //商品总数量






    $('.p-action').click(function() {
        $(this).parent().parent().remove();
        getSum()
    })
})