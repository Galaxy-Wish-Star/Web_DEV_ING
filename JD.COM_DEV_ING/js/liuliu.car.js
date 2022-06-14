$(function(){
    $('.checkall').change(function(){
        // var isChecked=$(this).prop('checked');
        // $('.j-checkbox').prop('checked',isChecked)
        $('.j-checkbox').prop('checked',$(this).prop('checked'));
        // $('.checkall,j-checkbox').prop('checked',$(this).prop('checked'));
        // 全选中的商品增加背景色
        if($(this).prop('checked')){
            $('.cart-item').addClass('check-cart-item')
        }else{
            $('.cart-item').removeClass('check-cart-item')
        }
    })
    // 被单选中的商品添加背景色
    $('.j-checkbox').click(function(){
        if($('.j-checkbox:checked').length==3){
            $('.checkall').prop('checked',true)
        }else{
            $('.checkall').prop('checked',false)
        }
        if($(this).prop('checked')){
            $(this).parent().parent('.cart-item').addClass('check-cart-item')
        }else{
            $(this).parent().parent('.cart-item').removeClass('check-cart-item')
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
    // 商品数量的增加与单价的增加
    $('.increment').click(function(){
        var n=$(this).siblings('.itxt').val();
        if(n<10){
            n++;
            $(this).siblings('.itxt').val(n);
            var p=$(this).parent().parent().siblings('.p-price').html().substr(1);
            var sum=(p*n).toFixed(2);
            $(this).parent().parent().siblings('.p-sum').html('￥'+sum);    
        }else{
            alert('商品数量已达上线!');
            $(this).siblings('.itxt').val(1);
            var p=$(this).parent().parent().siblings('.p-price').html().substr(1);
                var sum=(p*n).toFixed();
            $(this).parent().parent().siblings('.p-sum').html('￥'+p);
        }
    })
    // 商品数量的减少与单价的减少
    $('.decrement').click(function(){
        var m=$(this).siblings('.itxt').val();
        if(m>1){
            m--;
            $(this).siblings('.itxt').val(m);
            var p=$(this).parent().parent().siblings('.p-price').html().substr(1);
            var sum=(p*m).toFixed(2);
            $(this).parent().parent().siblings('.p-sum').html('￥'+sum);
        }else{
            alert('最少购买一件哦!');
            return false;
        }
    })
    // 数量模块的增减的同时改变价格小计
    // $('.itxt').change(function(){
    //     var n=$(this).val();
    //     var p=$(this).parent().parent().siblings('.p-price').html().substr(1);
    //     var sum=(p*n).toFixed(2);
    //     $(this).parent().parent().siblings('.p-sum').html('￥'+sum);
    // })
    // 计算商品总价值
    getSum();
    function getSum(){
        var count=0;
        var price=0;
        $('.itxt').each(function(index,element){
            count+=parseInt($(element).val());
        })
        $('.amount-sum em').text(count);
        $('.p-sum').each(function(i,ele){
            price+=parseFloat($(ele).text().substr(1));
        })
        $('.price-sum em').text('￥'+ price.toFixed(2));
    }
    // 删除商品
    $('.p-action a').click(function(){
        $(this).parent().parent('.cart-item').remove();
        getSum();
    })
    // 删除被选中的商品
    $('.remove-batch').click(function(){
        $('.j-checkbox:checked').parent().parent('.cart-item').remove();
        getSum();
    })
    // 删除所有的商品
    $('.clear-all').click(function(){
        $('.cart-item').remove();
        getSum();
    })
})