
angular.module("myApp").controller("ctrl_Orders", function ($scope, ProductsFactory,$location,DataTransferFactory,$timeout,settings,$routeParams,$timeout) {
    


 mainScope=DataTransferFactory.getItem("mainScope")
$scope.ShowSignIn=(mainScope.Logged==null)
$scope.FirstTime=true;

if(!$scope.ShowSignIn){
    ProductsFactory.getOrders({
        "UserID":mainScope.Logged.ID,
        "jwt":mainScope.Logged.jwt,
        "Email":mainScope.Logged.UserName

    
    }).then(function(data){
      $scope.orders=data.data.Orders
      $scope.CurrentOrderID= $scope.orders.length>0?$scope.orders[0].OrderID:-1;
      if($routeParams.OrderID!=null)
        $scope.CurrentOrderID=$routeParams.OrderID
    }).catch(function(e){
        
      if(e.data.ErrorType=="login")
        {
            alert(e.data.Message)
            DataTransferFactory.getItem("mainScope").doLogOut();//818 
            
            $scope.ShowSignIn=true
        }
    })
}

$scope.$watch("CurrentOrderID",function(){
    console.log('chngd')
    //console.log(  settings.AppName + "/Orders/" +  ($scope.CurrentOrderID==-1?"":$scope.CurrentOrderID  ))
    if($scope.CurrentOrderID==-1)
       $scope.CurrentOrder= null;
    if($scope.orders==null)
     return;
    $scope.CurrentOrder=$scope.orders.filter(function(ord){return ord.OrderID==$scope.CurrentOrderID})[0]
if($scope.CurrentOrder==null && $routeParams.OrderID!=null){
$scope.NotAuth=true
}
    if(!$scope.FirstTime){
  $location.path(settings.AppName + "/Orders/" +  ($scope.CurrentOrderID==-1?"":$scope.CurrentOrderID )  );
   }
   $scope.FirstTime=false;
})
$scope.doLogin=function(){
    DataTransferFactory.getItem("mainScope").doLogIn();
}
$scope.getImagePath=function(id){
    return settings.ServiceUrl +  "/images/"+ id+ ".jpg"         
}
})


mod.directive("orders", function ($location, ProductsFactory, DataTransferFactory, $timeout,settings) {
    return {
    replace: true,
    restrict: 'AEC',
    template: `<div id="OrdersModal" class="modal" tabindex="-1" role="dialog" ><form id="myForm">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">My Orders</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
            <div class="sign-in" ng-show="ShowSignIn">
            <div class="alert alert-danger">
               You have to <span style="text-decoration:underline;cursor:pointer" ng-click="doLogin()">Log In</span> to see your orders  
            </div>
           </div>

           <div ng-hide="ShowSignIn||orders.length==0" style="margin-bottom:20px;overflow:hidden">
           <div class="float-left col-xs-4"> Select Order #</div>
           <select ng-model="CurrentOrderID" class="form-control float-left col-xs-8" style="display:block">
              <option value="-1"></option>
              <option ng-repeat="order in orders" value="{{order.OrderID}}">{{order.OrderID}}</option> 
           </select>           
           </div>

           <div ng-show="!ShowSignIn&&CurrentOrder!=null" style="border-bottom:1px solid #000;overflow:hidden;margin-top:20px;clear:both;background-color:#eee">
                 <div class="float-left col-xs-12 col-md-5 offset-md-1" style="border:1px solid #ccc;border-radius:5px;padding:10px;margin-top:10px;margin-bottom:10px;color:red">Order ID:{{CurrentOrder.OrderID}}</div>
                 <div class="float-left col-xs-12 col-md-5 offset-md-1" style="border:1px solid #ccc;border-radius:5px;padding:10px;margin-top:10px;margin-bottom:10px;color:green">Address:{{CurrentOrder.Address}}</div>
                 <div class="float-left col-xs-12 col-md-5 offset-md-1" style="border:1px solid #ccc;border-radius:5px;padding:10px;margin-top:10px;margin-bottom:10px;color:green">Phone:{{CurrentOrder.Phone}}</div>
                 <div class="float-left col-xs-12 col-md-5 offset-md-1" style="border:1px solid #ccc;border-radius:5px;padding:10px;margin-top:10px;margin-bottom:10px;color:green">Email:{{CurrentOrder.Email}}</div>
                 <div class="float-left col-xs-12 col-md-5 offset-md-1" style="border:1px solid #ccc;border-radius:5px;padding:10px;margin-top:10px;margin-bottom:10px;color:green">Name:{{CurrentOrder.UserName}}</div>
                 <div class="float-left col-xs-12 col-md-5 offset-md-1" style="border:1px solid #ccc;border-radius:5px;padding:10px;margin-top:10px;margin-bottom:10px;color:red">Total:{{CurrentOrder.Total}}</div>
                 <div class="float-left col-xs-12 col-md-5 offset-md-1" style="border:1px solid #ccc;border-radius:5px;padding:10px;margin-top:10px;margin-bottom:10px;color:green">Order Time:{{CurrentOrder.OrderTime}}</div>
                 <div class="float-left col-xs-12 col-md-5 offset-md-1" style="border:1px solid #ccc;border-radius:5px;padding:10px;margin-top:10px;margin-bottom:10px;color:green">Status:{{CurrentOrder.Status}}</div>
           </div>

           <div ng-show="!ShowSignIn&&CurrentOrder!=null" style="border:1px solid #000;border-radius:10px;overflow:hidden;margin-top:20px;clear:both;padding:10px">
              <div class="container">
              <div ng-repeat="line in CurrentOrder.lines" style="border-bottom:1px solid #f00;overflow:hidden;margin-top:20px;clear:both">
             <!-- <div><img ng-src="/Ecommerce-php/images/{{line.ProductID}}.jpg" style="width:100px;height:100px;margin:5px"></div>-->
             <div><img ng-src="{{getImagePath(line.ProductID)}}" style="width:100px;height:100px;margin:5px"></div> 
             

              <div class="float-left col-xs-12 col-md-5 offset-md-1" style="border:1px solid #ccc;border-radius:5px;padding:10px;margin-top:10px;margin-bottom:10px;color:blue">Product Name:{{line.Name}}</div>
              <div class="float-left col-xs-12 col-md-5 offset-md-1" style="border:1px solid #ccc;border-radius:5px;padding:10px;margin-top:10px;margin-bottom:10px;color:blue">Arabic Name:{{line.ArabicName}}</div>
              <div class="float-left col-xs-12 col-md-5 offset-md-1" style="border:1px solid #ccc;border-radius:5px;padding:10px;margin-top:10px;margin-bottom:10px;color:blue">Unit Price:{{line.UnitPrice}}</div>
              <div class="float-left col-xs-12 col-md-5 offset-md-1" style="border:1px solid #ccc;border-radius:5px;padding:10px;margin-top:10px;margin-bottom:10px;color:blue">Number of items:{{line.nItems}}</div>
              <div class="float-left col-xs-12 col-md-5 offset-md-1" style="border:1px solid #ccc;border-radius:5px;padding:10px;margin-top:10px;margin-bottom:10px;color:blue">Tax:{{line.Tax}}</div>
              <div class="float-left col-xs-12 col-md-5 offset-md-1" style="border:1px solid #ccc;border-radius:5px;padding:10px;margin-top:10px;margin-bottom:10px;color:blue">Shipping:{{line.Shipping}}</div>
              <div class="float-left col-xs-12 col-md-5 offset-md-1" style="border:1px solid #ccc;border-radius:5px;padding:10px;margin-top:10px;margin-bottom:10px;color:blue">Total:{{line.Total}}</div>
              </div>
              </div>
           </div>

           <div ng-show="!ShowSignIn&&orders.length==0">
           <div class="alert alert-danger">
               You have no orders
            </div>
           </div>
           <div ng-show="!ShowSignIn&&NotAuth">
           <div class="alert alert-danger">
               You are not authorized to see this order
            </div>
           </div>
           

            </div>
            <div class="modal-footer">
            
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