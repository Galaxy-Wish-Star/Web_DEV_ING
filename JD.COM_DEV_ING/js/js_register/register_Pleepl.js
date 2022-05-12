window.onload = function() {
    // 手机号验证
    //1.获取元素 =表示赋值 右边给左边
    var phone = document.querySelector('#phone');
    var sjts = document.querySelector('#sjts');
    var wzts1 = document.querySelector('#wzts1');
    // 2.设置手机号验证规则-正则表达式(/^开始 $/结束)
    var gz1 = /^[1][3-9][0-9]{9}$/;
    // {9}只管[0-9]
    // 3.手机号文本框获取焦点或失去焦点时的提示事件
    phone.addEventListener('focus', function() {
            if (this.value == '') {
                sjts.style.display = 'block';
                wzts1.innerText = '请输入手机号码！';
            } else {
                sjts.style.display = 'none';
            }


        })
        // focus 获得焦点
    phone.addEventListener('blur', function() {
        // sjts.style.display = 'none';
        if (this.value == '') {
            wzts1.innerText = '手机号不能为空！';
        } else {
            if (gz1.test(this.value) === true) {
                sjts.style.display = 'none';
            } else {
                sjts.style.display = 'block';
                wzts1.innerText = '手机号格式错误！';
            }
        }


    })
}