$(function(){

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var self=this;
    $('.tab-pane').toggleClass('no-shadow');
    $( ".nav-tabs" ).slideToggle("fast");
    $( ".nav-tabs" ).slideToggle("slow",function(){
        $('.tab-pane').toggleClass('no-shadow');
    });
    
});
});