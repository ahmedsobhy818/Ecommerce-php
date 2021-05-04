angular.module("myApp").controller("ctrl_Checkout", function ($scope, ProductsFactory,$location,DataTransferFactory,$timeout,settings,$routeParams,$timeout) {

    var mainScope=DataTransferFactory.getItem("mainScope");
    $scope.Logged=mainScope.Logged;
   $scope.$watch('Logged',function(){
    $scope.ShowSignIn= ($scope.Logged==null  )
   })
   
    

    $scope.CartItems=[];
    mainScope.CartItems.filter(function(obj){return obj.nItems>0}).forEach(element => {
        s=JSON.stringify(element);
        $scope.CartItems.push(JSON.parse(s));
    });
    
$scope.Total=0;
$scope.nQtyError=0;
    $scope.$watch("[CartItems,ShippingPercent,TaxPercent]",function(){
       
        var Total=0;

        var TotalBasicPrice=0;
        var TotalTax=0;
        var TotalShipping=0;

 //$scope.msg='<ul>';
 $scope.qtyError=false;

        $scope.CartItems.forEach(element => {
            SubTotal=element.product.Price * element.nItems * (parseFloat( $scope.ShippingPercent)+ parseFloat($scope.TaxPercent)+1);
            
            TotalBasicPrice+= (element.product.Price * element.nItems)
            TotalTax += (element.product.Price * element.nItems*parseFloat($scope.TaxPercent))
            TotalShipping +=(element.product.Price * element.nItems*parseFloat($scope.ShippingPercent))

            ProductsFactory.getQtyForProduct({"ID":element.product.ID}).then(function(data){
                //$timeout(function(){
                    element.qty=data.data.Qty;//818
                    element.error="";
                    if (element.nItems>element.qty){
                                              
                    element.error= "Only " + element.qty + " unit(s) are available for product(" + element.product.Name + ")."
                    $scope.nQtyError++;
                    $scope.ShowMsg=true;
                    $scope.alert="danger"
                     }
                //})
                
                
            }).catch(function(e){

            })
            
 
            Total+=SubTotal
        });
        $scope.Total=Total;
        $scope.TotalBasicPrice=TotalBasicPrice;
        $scope.TotalTax=TotalTax;
        $scope.TotalShipping=TotalShipping;

    },true) //watching properties of CartItems

    mainScope.$watch("[ShippingPercent,TaxPercent]",function(){
        $scope.ShippingPercent=parseFloat(mainScope.ShippingPercent);
        $scope.TaxPercent=parseFloat(mainScope.TaxPercent);
    })

    $scope.getImagePath=function(id){
        //return settings.AppName +  "/images/"+ id+ ".jpg"         
        return settings.ServiceUrl +  "/images/"+ id+ ".jpg"         
   }
   $scope.gotoCart=function(){
       $location.path(settings.BaseUrl + "/Cart")
   }
   $scope.ErrorsList=[];
   $scope.$watch('nQtyError',function(){
    $scope.msg="";
    $scope.ErrorsList=[];
    $scope.CartItems.forEach(element=>{
        if(element.error!='')
          $scope.ErrorsList.push(element.error)
    })
   })

   $scope.doLogin=function(){
    DataTransferFactory.getItem("mainScope").doLogIn();
}


   $scope.address="";
   $scope.CreateOrder=function(){
    if($scope.address=="" || $scope.address==undefined || $scope.phone=="" || $scope.phone==undefined)
      return;

    

    var order={
        UserID:$scope.Logged.ID,
        Email:$scope.Logged.UserName,
        jwt:$scope.Logged.jwt,
        Address:$scope.address,
        Phone:$scope.phone,
        Price:$scope.TotalBasicPrice,
        Tax:$scope.TotalTax,
        Shipping:$scope.TotalShipping,
        Total:$scope.Total,
        lines:[]
    }

    $scope.CartItems.forEach(element => {
        var orderLine={
            productID:element.product.ID,
            unitPrice:element.product.Price,
            nItems:element.nItems,
            Tax: element.product.Price*element.nItems*$scope.TaxPercent,
            Shipping:element.product.Price*element.nItems*$scope.ShippingPercent,
            Total:($scope.ShippingPercent+$scope.TaxPercent+1) *element.nItems*element.product.Price

        }
        order.lines.push(orderLine)
    })
    
    ProductsFactory.AddOrder(order).then(function(data){
       //alert(data.data.Message)
            $scope.ShowMsg=true;
            $scope.alert="success";
            $scope.nQtyError++;
            $timeout(function(){
                $scope.msg=data.data.Message
            })

            var mainScope=DataTransferFactory.getItem("mainScope");
            mainScope.CartItems=[];
            var dataScope=DataTransferFactory.getItem('dataScope');
            dataScope.currentURL=null;

            
    }).catch(function(e){
        
        if(e.data.ErrorType=="login")//so it is login related error
        {
            alert(e.data.Message)
            DataTransferFactory.getItem("mainScope").doLogOut();//818 
            $scope.Logged=null;
            $scope.ShowMsg=false;
        }

        if(e.data.ErrorType=="qtyErrors")
        {   //qunatity out of stock after check on the server
            console.log(e.data.qtyErrors)
            e.data.qtyErrors.forEach(element=>{
                nItems=element.nItems;
                productID=element.productID;
                realNItems=element.realNItems;

                item=$scope.CartItems.filter(function(obj){return obj.product.ID==productID})[0]
                item.q=realNItems;
                item.error= "Only " + realNItems + " units are available for product (" + item.product.Name + ")"
            })
            
            $scope.nQtyError++;
            $scope.ShowMsg=true;
            $scope.alert="danger"

        }
        if(e.data.ErrorType=="DB_Error"){
            
            $scope.ShowMsg=true;
            $scope.alert="danger";
            $scope.nQtyError++;
            $timeout(function(){
                $scope.msg=e.data.Message
            })
            
        }
    })
         console.log(JSON.stringify( order))
   }
})

mod.directive("checkout", function ($location, ProductsFactory, DataTransferFactory, $timeout,settings) {
    return {
    replace: true,
    restrict: 'AEC',
    template: `<div id="CheckoutModal" class="modal" tabindex="-1" role="dialog" ><form id="myForm">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Checkout</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
            <div class="sign-in" ng-show="ShowSignIn">
            <div class="alert alert-danger">
               You have to <span style="text-decoration:underline;cursor:pointer" ng-click="doLogin()">Log In</span> to place an order  
            </div>
           </div>

            <div class="alert alert-{{alert}}" ng-show="ShowMsg && !ShowSignIn">
            <span ng-show="ErrorsList.length==0">{{msg}}</span>
            <div ng-show="ErrorsList.length>0">
               <ul>
               <li ng-repeat="error in ErrorsList track by $index">{{error}}</li> 
               </ul>
            </div>            
            </div>

            <div ng-hide="ShowMsg || ShowSignIn" style="margin:30px; border:1px solid #ccc ; border-radius:10px;padding:10px;width:60%">
               <form id="orderForm">
                 Name : <input class="form-control" disabled value={{Logged.Name}}><br>
                 Email : <input class="form-control" disabled value={{Logged.UserName}}><br>
                 Address : <input class="form-control" ng-model="address" required >
                 Phone : <input class="form-control" ng-model="phone" required >
               </form>
            </div>
            <table class="table table-hover table-striped">
            <tr>
            <th style="width:100%">
            <div style="float:left;width:30px">#</div>
            <div style="float:left;width:130px">Image</div>
            <div style="float:left;width:300px">Name</div>
            <div class="CartHeader" style="width:150px">Price</div>
            <div class="CartHeader" style="width:120px">Number</div>
            <div class="CartHeader" style="width:120px">Total Price</div>
            <div class="CartHeader" style="width:120px">Tax</div>
            <div class="CartHeader" style="width:120px">Shipping</div>
            <div class="CartHeader" style="width:120px">Sub Total</div>
            
            </th>
            
            </tr>
            

                <tr ng-repeat="CartItem in CartItems track by $index"> 
                <td>
                <div style="float:left;width:30px">{{$index+1}}</div>   
                   <div style="float:left;width:130px"><img ng-src="{{getImagePath(CartItem.product.ID)}}"></img></div>
                   <div style="float:left;width:300px"><div style="height:25px">{{CartItem.product.Name}}</div><div style="height:25px">{{CartItem.product.ArabicName}}</div></div>
                   
                   <span class="label">Price :</span> <div class="CartItem" style="width:150px" >{{CartItem.product.Price}} </div>
                   <!--<span class="label">Number :</span><div class="CartItem" style="width:120px" >{{CartItem.nItems}}<i class="fas fa-exclamation-circle" ng-show="CartItem.nItems>CartItem.qty" style="font-size:20px;color:red;margin-left:5px;cursor:pointer" data-toggle="tooltip" data-placement="bottom" title="Only {{CartItem.qty}} units available for product: ({{CartItem.product.Name}})"></i><i class="fas fa-pencil-alt" ng-show="CartItem.nItems>CartItem.qty" style="font-size:20px;color:#333;margin-left:5px;cursor:pointer" data-toggle="tooltip" data-placement="bottom" title="Update Cart" ng-click="gotoCart()"></i></div>-->
                   <span class="label">Number :</span><div class="CartItem" style="width:120px" >{{CartItem.nItems}}<i class="fas fa-exclamation-circle" ng-show="CartItem.error!=''" style="font-size:20px;color:red;margin-left:5px;cursor:pointer" data-toggle="tooltip" data-placement="bottom" title="{{CartItem.error}}"></i><i class="fas fa-pencil-alt" ng-show="CartItem.error!=''" style="font-size:20px;color:#333;margin-left:5px;cursor:pointer" data-toggle="tooltip" data-placement="bottom" title="Update Cart" ng-click="gotoCart()"></i></div>
                   <span class="label">Total Price :</span><div class="CartItem" style="width:120px" >{{(CartItem.product.Price * CartItem.nItems).toFixed(2)}}</div>
                   <span class="label">Tax :</span><div class="CartItem" style="width:120px" >{{(CartItem.product.Price * CartItem.nItems * TaxPercent).toFixed(2)}}</div>
                   <span class="label">Shipping :</span><div class="CartItem" style="width:120px" >{{(CartItem.product.Price * CartItem.nItems * ShippingPercent).toFixed(2)}}</div>
                   <span class="label">Sub Total :</span><div class="CartItem" style="width:120px" >{{(CartItem.product.Price * CartItem.nItems * (ShippingPercent+TaxPercent+1)).toFixed(2)}}</div>
                   
                   
                </td>
                </tr>
               
            
            </table>

<div class="alert alert-success" style="width:30%">Total : {{Total.toFixed(2)}}</div>
            </div>
            <div class="modal-footer">
            <button class="btn btn-success " style="color:#fff;" ng-disabled="ShowMsg || ShowSignIn" ng-click="CreateOrder()">Checkout</button>        
            
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                
            </div>          
            
            
            
        </div>
    </div></form>
</div>`,
link: function (scope, elem, attrs) {
    
    $(elem).modal();
    $(elem).on('hidden.bs.modal', function (e) {//jquery event handler for the bootstrap modal shown in the directive
       
        var dataScope=DataTransferFactory.getItem('dataScope');
        var mainUrl=dataScope.currentURL
         if (mainUrl==null)
          mainUrl=settings.AppName 
        
          var tmp=mainUrl;
          dataScope.currentURL=null;
          $('.modal-backdrop').fadeOut();//remove the modal overlay layout
          $('body.modal-open').css('overflow-y','scroll')//show the body's vertical scrollbar

          $timeout(function () { $location.path(tmp) })//closing modal causes angular path to reset
        //this statment means the following : 1- call doRoute() 2- check all variables in the scope , if any changed then refresh the ui

    })
    

     


}

}
})