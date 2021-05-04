angular.module("myApp").controller("ctrl_ShowProducts", function ($scope, ProductsFactory,$location,DataTransferFactory,$timeout,settings) {
    DataTransferFactory.setItem('dataScope', $scope)
    

    $scope.$watch('products',function(){
            var obj=$('.CardsOrList i.active')
            if($(obj).hasClass('icard'))
             $scope.ProductClasses='item col-xs-12  col-md-6  '
            else
              $scope.ProductClasses='list-item'
    })

    $scope.Initialize=function(){    
    
    // to decode url encoding done for arabic words and for special charaacters like spaces , & , ....
    $scope.InitialpathName = decodeURIComponent(window.location.pathname).replace(settings.BaseUrl,"").replace(settings.AppName,"");

    var ar=$scope.InitialpathName.split("/");
    $scope.PageIndex = 1;
    $scope.PageSize = 10;
    $scope.Keyword = '';
    $scope.OrderBy = 'Latest';
    $scope.CatID = -1;
    $scope.CatName="All";

    
    if (ar.length==6){
        //  /Ecommerce-php/Products/Fruits/Latest/Apple/10/1
        //OR
        //  /Ecommerce-php/Fruits/Latest/Apple/10/1
         $scope.CatName=ar[1];
         $scope.OrderBy=ar[2];
         $scope.Keyword=ar[3];
         $scope.PageSize=parseInt(ar[4]);
         $scope.PageIndex=parseInt(ar[5]);
    }
    if (ar.length==5){
        //  /Ecommerce-php/Products/Fruits/Latest/10/1
        //OR
        //  /Ecommerce-php/Fruits/Latest/10/1
        $scope.CatName=ar[1];
        $scope.OrderBy=ar[2];
        $scope.Keyword='';
        $scope.PageSize=parseInt(ar[3]);
        $scope.PageIndex=parseInt(ar[4]);
   }
   ProductsFactory.getCatID({"Name":$scope.CatName}).then(function (data) {
       $scope.CatID=data.data.ID;
       $scope.show()
   }).catch(function (e) {}) 

    
    $scope.products = [];  
    $scope.showPager=true;
}
$scope.Initialize();

$scope.LoadPageIndex=function(x){
    var url=settings.BaseUrl+ "/" + $scope.CatName + "/" + $scope.OrderBy + "/" ;
            if($scope.Keyword!='')
             url=url + $scope.Keyword + "/";

            url=url + $scope.PageSize + "/"  ;

            $location.path(url + x);

            $scope.PageIndex=x;
            $scope.show();
}
    $scope.show = function () {
        var mainScope=DataTransferFactory.getItem('mainScope');
        mainScope.PageSize=$scope.PageSize.toString();
        mainScope.Keyword=$scope.Keyword;
        mainScope.OrderBy=$scope.OrderBy;
        mainScope.CatID=$scope.CatID;
        mainScope.CatName=$scope.CatName;

        var obj={
         "PageIndex":$scope.PageIndex,
         "PageSize":$scope.PageSize,
         "Keyword":$scope.Keyword,
         "OrderBy":$scope.OrderBy,
         "CatID":$scope.CatID
        };
        //console.log(obj);
        ProductsFactory.getProducts(obj).then(function (data) {
            $scope.products=data.data.records;
            $scope.result= data.data.nProducts + " Results Found";
            $scope.alert="success";
            $scope.showPager=true;
            $scope.nPages= (data.data.nProducts%$scope.PageSize) ==0?(data.data.nProducts/$scope.PageSize):Math.floor((data.data.nProducts/$scope.PageSize))+1;  
            

        }).catch(function (e) {
            $scope.products=[];
            $scope.result= e.data.message;
            $scope.alert="danger";
            $scope.showPager=false;
        });
    }

    $scope.getImagePath=function(id){
         return settings.ServiceUrl +  "/images/"+ id+ ".jpg"         
    }
    $scope.OpenDetails=function(id){
        console.log('22222')
        $scope.currentURL=$location.path();
        $location.path(settings.AppName + "/ProductDetails/" + id );
    }
    $scope.AddToCart=function(product, n){
        var mainScope=DataTransferFactory.getItem('mainScope');
        var CartItems=mainScope.CartItems;
         
        var productExist=  CartItems.filter(function(obj){return obj.product.ID==product.ID}).length>0;
        if(productExist){
           var CartItem= CartItems.filter(function(obj){return obj.product.ID==product.ID})[0];
           CartItem.nItems+=n;
          // console.log(CartItems)
        }
        else{
           CartItems.push({product:product , nItems:n});
           //console.log(CartItems) 
        }
       //mainScope.$apply(function(){mainScope.CartItems=CartItems;})
        mainScope.cartChange++;

    }
})


angular.module("myApp").directive("doPager", function (ProductsFactory, DataTransferFactory, $timeout,$location) {
    return {
        replace: true,
        restrict: 'AEC',
        template: `
        <div class="pager">
          </div>
        `,
        link: function (scope, elem, attrs) {
           
            
           scope.$watchGroup(['products'],function(){
            if(scope.products.length==0)
            return;   
           $(elem).html(`<nav aria-label="...">
           <ul class="pagination">
             <li class="page-item" id="pgPrev">
               <a class="page-link"  href="#">Previous</a>
             </li>
             
             <li class="page-item" id="pg1"><a class="page-link"   >1</a></li>
             
             
         
             
             <li class="page-item" id="pgNxt">
               <a class="page-link" >Next</a>
             </li>
           </ul>
         </nav>
         `);
           if (scope.PageIndex!="1"){
            $('<li class="page-item" id="pgCurrent"><a class="page-link" >' + scope.PageIndex + '</a></li>').insertAfter( $(elem).find('#pg1'));
           }
           if (scope.PageIndex!="1" && scope.PageIndex!="2"){
             $('<li class="page-item" id="pts1"><a class="page-link" >...</a></li>').insertAfter( $(elem).find('#pg1'));
           }

            $(elem).find('#pgLast').remove();
            $(elem).find('#pts2').remove();
            if(parseInt(scope.nPages)>parseInt( scope.PageIndex)+1){
                $('<li class="page-item" id="pts2" ><a class="page-link" >...</a></li>').insertBefore( $(elem).find('#pgNxt'));    
            }
            if (scope.nPages!="1" && scope.PageIndex!=scope.nPages){
            $('<li class="page-item" id="pgLast" ><a class="page-link" >' + scope.nPages + '</a></li>').insertBefore( $(elem).find('#pgNxt'));
            }
            if (scope.PageIndex=="1"){
                $(elem).find('#pgPrev').addClass('disabled')
            }
            else{
                $(elem).find('#pgPrev').removeClass('disabled')
            }
            if (parseInt(scope.PageIndex)==parseInt(scope.nPages)){
                $(elem).find('#pgNxt').addClass('disabled')
            }
            else{
                $(elem).find('#pgNxt').removeClass('disabled')
            }

            if (scope.PageIndex!="1"){
                $(elem).find('#pgCurrent').addClass('active')
                $(elem).find('#pg1').removeClass('active')
            }
            else{
                $(elem).find('#pgCurrent').removeClass('active')
                $(elem).find('#pg1').addClass('active')
            }

           // $(elem).find('#pg1 .page-link').attr('href',url + "1");
           $(elem).find('#pg1 .page-link').click(function(){
               scope.LoadPageIndex(1);
           })
            //$(elem).find('#pgLast .page-link').attr('href',url + scope.nPages);
            $(elem).find('#pgLast .page-link').click(function(){
                scope.LoadPageIndex(scope.nPages);
            })


            //$(elem).find('#pgCurrent .page-link').attr('href',url + scope.PageIndex);
            $(elem).find('#pgCurrent .page-link').click(function(){
                scope.LoadPageIndex(scope.PageIndex);
            })

            //$(elem).find('#pgNxt .page-link').attr('href',url + (parseInt(scope.PageIndex)+1));
            $(elem).find('#pgNxt .page-link').click(function(){
                scope.LoadPageIndex(scope.PageIndex+1);
            })

            //$(elem).find('#pgPrev .page-link').attr('href',url + (parseInt(scope.PageIndex)-1));
            $(elem).find('#pgPrev .page-link').click(function(){
                scope.LoadPageIndex(scope.PageIndex-1);
            })

            //$(elem).find('#pts2 .page-link').attr('href',url + (parseInt(scope.PageIndex)+1));
            $(elem).find('#pts2 .page-link').click(function(){
                scope.LoadPageIndex(scope.PageIndex+1);
            })

            //$(elem).find('#pts1 .page-link').attr('href',url + (parseInt(scope.PageIndex)-1));
            $(elem).find('#pts1 .page-link').click(function(){
                scope.LoadPageIndex(scope.PageIndex-1);
            })

           })
        }
    }
});

/*

*/