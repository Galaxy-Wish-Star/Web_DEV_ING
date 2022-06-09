$(function() {
    // 全选
    $('.checkall').change(function() {
        // var isChecked=$(this).prop('checked');
        // $('.j-checkbox').prop('.checked',isChecked);
        $('.j-checkbox').prop('checked', $(this).prop('checked'));
    })
    $('.j-checkbok').change(function() {
        console.log($('.checkall').length);
        console.log($('.j-checkbok').length);
        console.log($('.j-checkbok:checked').length);
    })



})