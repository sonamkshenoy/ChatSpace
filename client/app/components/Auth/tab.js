$(document).ready(function(){
    $('.tabs').tabs();
    $("#createAccount").click(function(e) {
        e.preventDefault();
        $('ul.tabs').tabs('select', 'test-swipe-4');
    });
    $('.sidenav').sidenav();
});
