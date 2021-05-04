angular.module("myApp").controller("ctrl_Cart", function ($scope, ProductsFactory,$location,DataTransferFactory,$timeout,settings,$routeParams,$timeout) {

    var mainScope=DataTransferFactory.getItem("mainScope");
    $scope.CartItems=[];
    mainScope.CartItems.filter(function(obj){return obj.nItems>0}).forEach(element => {
        s=JSON.stringify(element);
        $scope.CartItems.push(JSON.parse(s));
    });
    
$scope.Total=0;
    $scope.$watch("[CartItems,ShippingPercent,TaxPercent]",function(){
       
        var Total=0;
        $scope.CartItems.forEach(element => {
            SubTotal=element.product.Price * element.nItems * (parseFloat( $scope.ShippingPercent)+ parseFloat($scope.TaxPercent)+1);
            Total+=SubTotal
        });
        $scope.Total=Total;

    },true) //watching properties of CartItems

    mainScope.$watch("[ShippingPercent,TaxPercent]",function(){
        $scope.ShippingPercent=parseFloat(mainScope.ShippingPercent);
        $scope.TaxPercent=parseFloat(mainScope.TaxPercent);
    })

    $scope.getImagePath=function(id){
        return settings.ServiceUrl +  "/images/"+ id+ ".jpg"         
   }
$scope.updateCartItem=function(item){
    
    var id=item.product.ID;
    var nItems=item.nItems;
        mainScope.CartItems.filter(function(obj){return obj.product.ID==id})[0].nItems=nItems
        //mainScope.cartChange++;
    
}
$scope.clearCartItem=function(item){
    var id=item.product.ID;
    
        mainScope.CartItems.filter(function(obj){return obj.product.ID==id})[0].nItems=0
       // mainScope.cartChange++;
        item.nItems=0;

}   

$scope.doCheckout=function () {
    var dataScope=DataTransferFactory.getItem('dataScope');
    dataScope.currentURL=settings.BaseUrl + "/Cart";
   
    
    
    $location.path(settings.BaseUrl + "/Checkout")
  }
})

mod.directive("showCart", function ($location, ProductsFactory, DataTransferFactory, $timeout,settings) {
    return {
    replace: true,
    restrict: 'AEC',
    template: `<div id="CartModal" class="modal" tabindex="-1" role="dialog" ><form id="myForm">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Shopping Cart</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
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
                   
                   <span class="label">Price :</span> <div class="CartItem" style="width:150px" >{{CartItem.product.Price}}</div>
                   <span class="label">Number :</span><div class="CartItem" style="width:120px" ><input type=number min=0 ng-Model="CartItem.nItems" class="form-control" style="width:100px;display:inline-block"></div>
                   <span class="label">Total Price :</span><div class="CartItem" style="width:120px" >{{(CartItem.product.Price * CartItem.nItems).toFixed(2)}}</div>
                   <span class="label">Tax :</span><div class="CartItem" style="width:120px" >{{(CartItem.product.Price * CartItem.nItems * TaxPercent).toFixed(2)}}</div>
                   <span class="label">Shipping :</span><div class="CartItem" style="width:120px" >{{(CartItem.product.Price * CartItem.nItems * ShippingPercent).toFixed(2)}}</div>
                   <span class="label">Sub Total :</span><div class="CartItem" style="width:120px" >{{(CartItem.product.Price * CartItem.nItems * (ShippingPercent+TaxPercent+1)).toFixed(2)}}</div>
                   
                   <div style="float:left;clear:both" ><button  class="btn btn-primary" ng-click="updateCartItem(CartItem)">Update</button></div>   
                   <div style="float:left;margin-left:20px" ><button  class="btn btn-danger" ng-click="clearCartItem(CartItem)">Clear</button></div>   
                
                </td>
                </tr>
               
            
            </table>

<div class="alert alert-success" style="width:30%">Total : {{Total.toFixed(2)}}</div>
            </div>
            <div class="modal-footer">
            <button class="btn btn-success" style="color:#fff;" ng-click="doCheckout()">Checkout</button>        
            <!--<button type="button" class="btn btn-primary">ok</button>-->
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

          scope.$apply(function () { $location.path(tmp) })//closing modal causes angular path to reset
        //this statment means the following : 1- call doRoute() 2- check all variables in the scope , if any changed then refresh the ui

    })   


}

}
})