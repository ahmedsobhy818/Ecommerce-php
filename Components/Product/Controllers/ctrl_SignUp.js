angular.module("myApp").controller("ctrl_SignUp", function ($scope, ProductsFactory,$location,DataTransferFactory,$timeout,settings,$routeParams,$timeout) {

    var mainScope=DataTransferFactory.getItem('mainScope');
    $scope.isLogged=mainScope.isLogged;
    
    if($scope.isLogged){
        
        $scope.ShowMessage=true;
        $scope.message = "You are already logged in";
        $scope.alert="danger"
    }
})


mod.directive("signUp", function ($location, ProductsFactory, DataTransferFactory, $timeout,settings,AccountFactory) {
    return {
    replace: true,
    restrict: 'AEC',
    template: `<div id="SignUpModal" class="modal" tabindex="-1" role="dialog" ><form id="myForm">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Sign Up</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
            <div class="alert alert-{{alert}}" ng-show="ShowMessage" >{{message}}</div>
            <table class="table table-hover table-striped" ng-show="!isLogged">
            <tr>
              <td> Name :</td>
              <td><input name="Name" class="form-control" ng-model="Name" required></td>
            </tr>
            <tr>
              <td> Email :</td>
              <td><input name="Email" class="form-control" ng-model="Email" required></td>
            </tr>
            <tr>
              <td> Gender :</td>
              <td class="TD_SignUpGender">
              
              <input type="Radio" name="Gender" ng-model="Gender" value="M"       >Male
              <input type="Radio" name="Gender" ng-model="Gender" value="F"   style="margin-left:10px;" >Female
              
              </td>
            </tr>
            <tr>
              <td> Password :</td>
              <td><input id="Password" name="Password" type="password" class="form-control" ng-model="Password" required></td>
            </tr>
            <tr>
              <td> Confirm Password :</td>
              <td><input name="Confirm" type="password" class="form-control" ng-model="Confirm" required></td>
            </tr>
            </table>


            </div>
            <div class="modal-footer">
            
                <button type="button" class="btn btn-primary" ng-show="!isLogged">Sign Up</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                
            </div>          
            
            
            
        </div>
    </div></form>
</div>`,
link: function (scope, elem, attrs) {
    $(elem).find('#myForm').validate({
        rules: {
            Email: {
                 remote: {
                     url:settings.AppName+"/api/queries/check-username.php",
                     type:'post'
            },
                 email:true
            },
            Confirm: {
                equalTo: "#Password"
            },
            Gender : {required :true}
        },
        messages: {
            Email:{
                remote: "This email is already taken! Try another."
            },
            Confirm: " Enter Confirm Password Same as Password"
        }
        ,
       errorPlacement: function(error, element) {
        if ( element.is(":radio") ) {
            error.appendTo( element.parent() );
            //by default in radio case , the error message is shown after first radio 
            //with this line , the error message will be shown after all radios
        }
        else { // This is the default behavior of the script for all fields
            error.insertAfter( element );
        }
    }
    });
    $(elem).modal();
    $(elem).on('hidden.bs.modal', function (e) {//jquery event handler for the bootstrap modal shown in the directive
       
        var dataScope=DataTransferFactory.getItem('dataScope');
        var mainUrl=dataScope.currentURL
         if (mainUrl==null)
          mainUrl=settings.AppName 

          var tmp=mainUrl;
          dataScope.currentURL=null;

          scope.$apply(function () { $location.path(tmp) })//closing modal causes angular path to reset
        //this statment means the following : 1- call doRoute() 2- check all variables in the scope , if any changed then refresh the ui

    })   
    $(elem).find('.btn-primary').on('click', function (e) {//jquery event handler for the bootstrap modal shown in the directive
        if (!$(elem).find('#myForm').valid())
          return;

var obj={
    Name:scope.Name ,
    Email:scope.Email,
    Gender:scope.Gender,
    Password:scope.Password
}
scope.ShowMessage=false;
AccountFactory.doSignUp(obj).then(function(data){

    scope.ShowMessage=true;
    scope.alert="success";
    scope.message=data.data.Message;
    scope.Name='';
    scope.Email='';
    scope.Gender='';
    scope.Password='';
    scope.Confirm='';

    $timeout(function(){
        $(elem).modal('hide');
        $location.path(settings.AppName + "/Login");
    },5000)

}).catch(function(e){
    scope.ShowMessage=true;
    scope.alert="danger";
    scope.message=e.data.Message;
});


    })   


}

}
})