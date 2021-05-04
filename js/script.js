
$('div.CardsOrList i').click(function(){
    $(this).addClass('active').siblings().removeClass('active');

    if($(this).hasClass("icard")){
        $('div.list-item').removeClass('list-item').addClass('item  col-xs-12  col-md-6')
        
    }
    else{
        $('div.item').removeClass('item  col-xs-12  col-md-6').addClass('list-item')
    }
    
})







