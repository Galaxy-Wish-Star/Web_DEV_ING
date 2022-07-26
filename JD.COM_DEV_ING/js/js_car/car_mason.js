$(function () {
  // 全选按钮的选中
  $(".checkall").change(function () {
    // var isChecked=$(this).prop('checked');
    // $('.j-checkbox').prop('checked',isChecked)
    //获取属性值  利用prop()一个值是获取值  两个值是设置
    $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
    // $('.checkall,j-checkbox').prop('checked',$(this).prop('checked'));
    getSum();
  });

  // 全选中的商品增加背景色
  if ($(this).prop("checked")) {
    $(".cart-item").addClass("check-cart-item");
  } else {
    $(".cart-item").removeClass("check-cart-item");
  }

  // 反选
  $(".j-checkbox").change(function () {
    if ($(".j-checkbox:checked").length == 3) {
      $(".checkall").prop("checked", true);
    } else {
      $(".checkall").prop("checked", false);
    }
    getSum();
  });

  // 被单选中的商品添加背景色
  if ($(this).prop("checked")) {
    $(this).parent().parent(".cart-item").addClass("check-cart-item");
  } else {
    $(this).parent().parent(".cart-item").removeClass("check-cart-item");
  }

  //增减商品数量,声明一个变量，点击+号（increment），就让这个值++，然后赋值给文本框。
  //设置商品数量限额
  var min_num = 1;
  var max_num = 200;

  // 增加数量
  $(".increment").click(function () {
    var n = $(this).siblings(".itxt").val(); //获取值 n数量
    if (n < max_num) {
      n++;
    } else {
      alert("商品购买数量已达" + max_num + "上限！");
    }

    $(this).siblings(".itxt").val(n);

    //小计金额
    var d = $(this).parents(".p-num").siblings(".p-price").html().substr(1); //d单价
    $(this)
      .parents(".p-num")
      .siblings(".p-sum")
      .html("￥" + (d * n).toFixed(2));
    getSum();
  });

  // 减少数量
  $(".decrement").click(function () {
    var n = $(this).siblings(".itxt").val();
    if (n <= min_num) {
      alert("最少购买" + min_num + "件商品");
      // $(".cart-item").remove();
      return false;
    } else {
      n--;
    }

    $(this).siblings(".itxt").val(n);

    //小计金额
    var d = $(this).parents(".p-num").siblings(".p-price").html().substr(1); //d单价    /substr从第二位开始获取字符串
    $(this)
      .parents(".p-num")
      .siblings(".p-sum")
      .html("￥" + (d * n).toFixed(2));
    getSum();
  });

  //用户修改数量
  $(".itxt").change(function () {
    var n = $(this).val();
    var d = $(this).parents(".p-num").siblings(".p-price").html().substr(1);
    var x = $(this).parents(".p-num").siblings(".p-sum"); //x 小记
    $(this)
      .parents(".p-num")
      .siblings(".p-sum")
      .html("￥" + (d * n).toFixed(2));
    if (n >= min_num && n <= max_num) {
      x.html("￥" + (d * n).toFixed(2));
    }
    if (n <= min_num) {
      var n = $(this).val(min_num);
      alert("至少选" + min_num + "件");
      $(this).val();
      x.html("￥" + (d * min_num).toFixed(2));
    }
    if (n > max_num) {
      alert("商品购买数量已达" + max_num + "上限！");
      $(this).val(max_num);
      x.html("￥" + (d * max_num).toFixed(2));
    }
    getSum();
  });

  //商品总价/总数量
  function getSum() {
    var count = 0;
    var price = 0;
    $(".itxt").each(function (index, element) {
      count += parseInt($(element).val());
    });
    $(".amount-sum em").text(count);
    $(".p-sum").each(function (i, ele) {
      price += parseFloat($(ele).text().substr(1));
    });
    $(".price-sum em").text("￥" + price.toFixed(2));
  }
  // 删除商品
  $(".p-action a").click(function () {
    $(this).parent().parent(".cart-item").remove();
    getSum();
  });

  // 删除被选中的商品
  $(".remove-batch").click(function () {
    $(".j-checkbox:checked").parent().parent(".cart-item").remove();
    getSum();
  });

  // 删除所有的商品
  $(".clear-all").click(function () {
    $(".cart-item").remove();
    getSum();
  });
});
