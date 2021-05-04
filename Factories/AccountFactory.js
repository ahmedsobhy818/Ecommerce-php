angular.module("myApp").factory('AccountFactory', function ($http,settings) {
    function doSignUp(obj) {
        return $http({ method: 'POST', url: settings.ServiceUrl+ '/api/queries/signup.php'.replace('.php',settings.isDotNetCore?'':'.php') , data:obj })        
    }

    function doLogin(obj) {
        return $http({ method: 'POST', url: settings.ServiceUrl+ '/api/queries/login.php'.replace('.php',settings.isDotNetCore?'':'.php') , data:obj })        
    }

    return {
        doSignUp:doSignUp,
        doLogin:doLogin
    }
})