$('document').ready(function () {


    //设置登录按钮不可点击。
    $('.login-button').attr('disabled', true);
    $('.login-button').css('background', '#9db0ff');
    //设置登录按钮的悬浮游标为禁用状态
    $('.login-button').css('cursor', 'not-allowed');

    $('#username, #password').bind('input', function () {
        var username = $.trim($('#username').val());
        var password = $.trim($('#password').val());

        if (username !== '' && password !== '') {
            $('.login-button').attr('disabled', false);
            $('.login-button').css('background', '#2f54eb');
            $('.login-button').css('cursor', 'pointer');
        } else {
            //设置登录按钮不可点击。
            $('.login-button').attr('disabled', 'true');
            $('.login-button').css('background', '#9db0ff');
            //设置登录按钮的悬浮游标为禁用状态
            $('.login-button').css('cursor', 'not-allowed');
        }
    });

});