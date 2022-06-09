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
    // 商品数量的增加
    $('.increment').click(function(){
        var n=$(this).siblings('.itxt').val();
        if(n<10){
            n++;
            $(this).siblings('.itxt').val(n);
            var p=$(this).parent().parent().siblings('.p-price').html().substr(1);
            var sum=(p*n).toFixed(2);
            $(this).parent().parent().siblings('.p-sum').html('￥'+sum);
        }else{
            alert('商品数量已达上线');
            return true;
        }
    })
    // 商品数量的减少
    $('.decrement').click(function(){
        var m=$(this).siblings('.itxt').val();
        if(m>1){
            m--;
            $(this).siblings('.itxt').val(m);
            var p=$(this).parent().parent().siblings('.p-price').html().substr(1);
            var sum=(p*m).toFixed(2);
            $(this).parent().parent().siblings('.p-sum').html('￥'+sum);
        }else{
            alert('是否删除该商品');
            return false;
        }
    })
    // 数量模块的增减的同时改变价格小计
    $('.itxt').change(function(){
        var n=$(this).val();
        var p=$(this).parent().parent().siblings('.p-price').html().substr(1);
        var sum=(p*n).toFixed(2);
        $(this).parent().parent().siblings('.p-sum').html('￥'+sum);
    })
    // 计算商品总价值
    // getSum();
    // function getSum(){
    //     var count=0;
    //     var price=0;
    //     $('.itxt').each(function(index,element){
    //         count+=parseInt($(element).val());
    //     })
    //     $('.amount-sum em').text(count);
    //     $('.p-sum').each(function(i,ele){
    //         price+=parseFloat($(ele).text().substr(1));
    //     })
    //     $('.price-sum em').text('￥'+price.toFixed(2));
    // }
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