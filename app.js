var mod = angular.module("myApp", ['ngRoute']);

//to use it :settings.BaseUrl or settings.AppName
mod.constant('settings', {  
    isDotNetCore:true,//true to run the api hosted on visual studio (TestEcommerceAPI project) which connects to sql server DB(EcommerceCodeFirst) or to mysql database
    //false to run the php api which exists on this project which connects to mysql database named Ecommerce
    AppName: '/Ecommerce-php',
    BaseUrl: '/Ecommerce-php/Products',
    ServiceUrl: '/Ecommerce-php'

    }); 

    

mod.controller("mainCtrl", function ($scope, $location, DataTransferFactory,ProductsFactory,settings ) {

    if(settings.isDotNetCore)
    {
        settings.ServiceUrl='https://localhost:44353';
    }

    DataTransferFactory.setItem('mainScope', $scope)

    
    if(localStorage.Logged==undefined || localStorage.Logged=="undefined")
      $scope.Logged=null;
    else
      $scope.Logged=JSON.parse(localStorage.Logged)

    //$scope.Logged=getLoggedFromCookie()
    
 

    if(localStorage.CartItems==undefined)
      localStorage.CartItems="[]";

    $scope.CartItems=JSON.parse(localStorage.CartItems) //[];
    
    //$scope.cartChange=0;//changed when cart item added or deleted or updated

    $scope.$watch('[CartItems,TaxPercent,ShippingPercent]',function(){
     
      var n=0;
      var Total=0;
      var TotalBasicPrice=0;
      var TotalTax=0;
      var TotalShipping=0;
      $scope.CartItems.forEach(element => {
          n+=element.nItems;
          TotalBasicPrice+=element.product.Price * element.nItems *1;
          TotalTax+=element.product.Price * element.nItems * parseFloat($scope.TaxPercent);
          TotalShipping+=element.product.Price * element.nItems * parseFloat($scope.ShippingPercent);
          SubTotal=element.product.Price * element.nItems * (parseFloat( $scope.ShippingPercent)+ parseFloat($scope.TaxPercent)+1);
          Total+=SubTotal
      });
      
      $scope.nTotalItems=n;
      $scope.Total=Total;
      $scope.TotalBasicPrice=TotalBasicPrice;
      $scope.TotalTax=TotalTax;
      $scope.TotalShipping=TotalShipping;
      localStorage.CartItems=JSON.stringify($scope.CartItems);
    },true)// to watch properties of objects inside CartItems  (mainly nItems property)
    

    ProductsFactory.getAllCats().then(function (data) {
         $scope.AllCats=data.data.records;
    }).catch(function (e) {}) 
    
    ProductsFactory.getSettings().then(function (data) {
        $scope.StoreName=data.data.StoreName;
        $scope.ShippingPercent=data.data.ShippingPercent;
        $scope.TaxPercent=data.data.TaxPercent;
        

   }).catch(function (e) {}) 

    $scope.doSearch=function(){
    var dataScope=DataTransferFactory.getItem('dataScope');    
    dataScope.Keyword=$scope.Keyword;
    dataScope.CatID=$scope.CatID;
    dataScope.CatName=$scope.CatName;
    dataScope.OrderBy=$scope.OrderBy;
    dataScope.PageSize=$scope.PageSize;
    dataScope.LoadPageIndex(1);
    }

    $scope.SelectCat=function(){
        $scope.CatName=$scope.AllCats.filter(function(obj){return obj.ID==$scope.CatID})[0].Name;
        
    }
    $scope.ShowCart=function () {
        var dataScope=DataTransferFactory.getItem('dataScope');    
        dataScope.currentURL=$location.path();
        $location.path(settings.BaseUrl  + "/Cart")
      }
      $scope.GetUserImage=function(){
       return  settings.AppName + "/images/users/" + $scope.Logged.Gender + ".png"
      }
      $scope.doLogIn=function(){
        var dataScope=DataTransferFactory.getItem('dataScope');    
        dataScope.currentURL=$location.path();
        $location.path(settings.AppName + "/Login");
      }
      $scope.doSignUp=function(){
        var dataScope=DataTransferFactory.getItem('dataScope');    
        dataScope.currentURL=$location.path();
        $location.path(settings.AppName + "/SignUp");  
      }
      $scope.doLogOut=function(){
        $scope.Logged=null;
      }
      $scope.doCheckout=function(){
        var dataScope=DataTransferFactory.getItem('dataScope');    
        dataScope.currentURL=$location.path();
        
        $location.path(settings.BaseUrl + "/Checkout")
      }
      $scope.gotoMyOrders=function(){
        var dataScope=DataTransferFactory.getItem('dataScope');    
        dataScope.currentURL=$location.path();
        
        $location.path(settings.AppName + "/Orders")
      }
      /*
    function getLoggedFromCookie(){
        console.log(document.cookie)
        var list=document.cookie.split(";").filter(function(obj){return obj.indexOf("Logged=")>=0});
        if(list.length==0)
          return null;
       console.log(list)   
       var s=list[0].replace("Logged=","").trim();
       
       if(s=='' || s=="''" || s=='""')
        return null;

       
       console.log(JSON.parse(s)   )
       return JSON.parse(s)   
    }
*/
      $scope.$watch('Logged',function(){
          $scope.isLogged= $scope.Logged!=null;
          if($scope.isLogged)
            {
                localStorage.Logged=JSON.stringify($scope.Logged)
              //document.cookie= "Logged="+ JSON.stringify($scope.Logged)
            }
          else
             localStorage.Logged=undefined
             //document.cookie="Logged=''";
   
      })

     

})

mod.config(function ($routeProvider, $locationProvider,settings) {
    
    $routeProvider
    .when(settings.AppName + "/ProductDetails/:productId", {
        templateUrl: settings.AppName + "/Components/Product/Views/ProductDetails.html",
        controller: "ctrl_ProductDetails"//
    })
    .when(settings.AppName + "/ProductDetails/:productId/Comments", {
        templateUrl: settings.AppName + "/Components/Product/Views/ProductDetails.html",
        controller: "ctrl_ProductDetails"//
    })
    .when(settings.BaseUrl + "/Cart", {
        templateUrl: settings.AppName + "/Components/Product/Views/Cart.html",
        controller: "ctrl_Cart"//
    })
    .when(settings.BaseUrl + "/Checkout", {
        templateUrl: settings.AppName + "/Components/Product/Views/Checkout.html",
        controller: "ctrl_Checkout"//
    })
    .when(settings.AppName + "/SignUp", {
        templateUrl: settings.AppName + "/Components/Product/Views/SignUp.html",
        controller: "ctrl_SignUp"//
    })
    .when(settings.AppName + "/Login", {
        templateUrl: settings.AppName + "/Components/Product/Views/Login.html",
        controller: "ctrl_Login"//
    })
    .when(settings.AppName + "/Orders", {
        templateUrl: settings.AppName + "/Components/Product/Views/Orders.html",
        controller: "ctrl_Orders"//
    })
    .when(settings.AppName + "/Orders/:OrderID", {
        templateUrl: settings.AppName + "/Components/Product/Views/Orders.html",
        controller: "ctrl_Orders"//
    })
    
    /*.when( "/Delete/:studentId", {
        templateUrl: "/Components/Student/Views/DeleteStudents.html",
        controller: "ctrl_DeleteStudents"//
    }).when("/Add", {
        templateUrl: "/Components/Student/Views/AddStudent.html",
        controller: "ctrl_AddStudent"//
    })*/
    //.otherwise({
    //    templateUrl: "/Components/Student/Views/ShowAllStudents.html",
    //    controller:"ctrl_ShowStudents"
    //});

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

//mod.run code to detect browser back & brevious 
mod.run(function ($rootScope, $route, $location,DataTransferFactory) {
    //Bind the `$locationChangeSuccess` event on the rootScope, so that we dont need to 
    //bind in induvidual controllers.

    $rootScope.$on('$locationChangeSuccess', function () {
        $rootScope.actualLocation = $location.path();
    });

    $rootScope.$watch(function () { return $location.path() }, function (newLocation, oldLocation) {
        if ($rootScope.actualLocation === newLocation) {
           if($('#productDetailsModal').length==0 && $('#CartModal').length==0 && $('#SignUpModal').length==0 && $('#LoginModal').length==0 && $('#CheckoutModal').length==0 && $('#OrdersModal').length==0)//if no modal is shown
            { 
                 $('.modal-backdrop').fadeOut();//remove the modal overlay layout
                 $('body.modal-open').css('overflow-y','scroll')//show the body's vertical scrollbar
        }
            var dataScope=DataTransferFactory.getItem('dataScope');
            dataScope.Initialize();            

        }
    });
});


mod.directive("searchItem", function (ProductsFactory, DataTransferFactory, $location, settings ){
    return {
        replace: true,
        restrict: 'AEC',
        template: `<input  class="form-control" ng-model="Keyword">`,
        link: function (scope, elem, attrs) {
            $(elem).autocomplete({
                source: function (request, response) {

                    $.ajax({
                        url:  settings.ServiceUrl +"/api/queries/Search.php".replace('.php',settings.isDotNetCore?'':'.php')  ,
                        dataType:settings.isDotNetCore?'text':'json',//in .net core api , set data type=text
                        type: 'POST',
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({term : request.term}),//in php & .net core send the object after converting it to json
                        success: function (data) {
                            if(settings.isDotNetCore)
                              data=JSON.parse(data)// in .net core , the data returned as text so convert it to array

                            response($.map(data, function (item) {
                                return {
                                    label: item.data,
                                    value: item.value,
                                    
                                }
                            }));
                        }
                    })
                },
                select: function (event, ui) {
                    $(elem).val(ui.item.label.split('-')[0]);
                    var id = ui.item.value;
                   
                    ProductsFactory.getAProduct({ID : id}).then(function (data) {
                        dataScope = DataTransferFactory.getItem('dataScope')
                        dataScope.products = [];
                        dataScope.products.push(data.data);
                        dataScope.showPager = false;
                        dataScope.result = ui.item.label + " is found";
                        //$location.path(settings.BaseUrl + '/' + dataScope.CatName + '/' + dataScope.OrderBy + '/' + ui.item.label.split('-')[0] + '/' + dataScope.PageSize + '/1');
                        $location.path(settings.BaseUrl + '/All/' + dataScope.OrderBy + '/' + ui.item.label.split('-')[0] + '/' + dataScope.PageSize + '/1');
                    }).catch(function (e) { })

                    return false;//stops default action when select an element which is showing value (ID) inside the input element
                },
                minLength: 1
            });

        }
    }
});


