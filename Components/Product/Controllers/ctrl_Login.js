angular.module("myApp").controller("ctrl_Login", function ($scope, ProductsFactory,$location,DataTransferFactory,$timeout,settings,$routeParams,$timeout) {
    var mainScope=DataTransferFactory.getItem('mainScope');
    $scope.isLogged=mainScope.isLogged;
    
    if($scope.isLogged){
        
        $scope.ShowMessage=true;
        $scope.message = "You are already logged in";
        $scope.alert="danger"
    }

    
})


mod.directive("login", function ($location, ProductsFactory, DataTransferFactory, $timeout,settings,AccountFactory) {
    return {
    replace: true,
    restrict: 'AEC',
    template: `<div id="LoginModal" class="modal" tabindex="-1" role="dialog" ><form id="myForm">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Login</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
            <div class="alert alert-{{alert}}" ng-show="ShowMessage">{{message}}</div>
            <table class="table table-hover table-striped" ng-show="!isLogged">
            <tr>
              <td> Email :</td>
              <td><input name="Email" class="form-control" ng-model="Email" required></td>
            </tr>
            <tr>
              <td> Password :</td>
              <td><input id="Password" name="Password" type="password" class="form-control" ng-model="Password" required></td>
            </tr>
            </table>


            </div>
            <div class="modal-footer">
            
                <button type="button" class="btn btn-primary" ng-show="!isLogged">Log In</button>
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

          var tmp=dataScope.currentURL;
          dataScope.currentURL=null;
        scope.$apply(function () { $location.path(tmp) })//closing modal causes angular path to reset
        //this statment means the following : 1- call doRoute() 2- check all variables in the scope , if any changed then refresh the ui

    })   
    $(elem).find('.btn-primary').on('click', function (e) {//jquery event handler for the bootstrap modal shown in the directive
        if (!$(elem).find('#myForm').valid())
          return;

var obj={
    Email:scope.Email,
    Password:scope.Password
}
scope.ShowMessage=false;
AccountFactory.doLogin(obj).then(function(data){

var mainScope=DataTransferFactory.getItem('mainScope');
mainScope.Logged=data.data.Data;
mainScope.Logged.jwt=data.data.jwt;
//mainScope.isLogged=true;


    scope.ShowMessage=true;
    scope.alert="success";
    scope.message=data.data.Message;
    scope.Email='';
    scope.Password='';
   
    $timeout(function(){
        $(elem).modal('hide');
        //$location.path(settings.AppName + "/Login");
    },3000)

}).catch(function(e){
    scope.ShowMessage=true;
    scope.alert="danger";
    scope.message=e.data.Message;
});


    })   


}

}
})