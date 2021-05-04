angular.module("myApp").factory("ProductsFactory", function ($http,settings) {

    function getAllProducts() {
            return $http({ method: 'GET', url:  settings.ServiceUrl+ '/api/queries/AllProducts.php'.replace('.php',settings.isDotNetCore?'':'.php') })        
    }
    function getAllCats() {
        return $http({ method: 'GET', url: settings.ServiceUrl+ '/api/queries/AllCats.php'.replace('.php',settings.isDotNetCore?'':'.php') })        
}
    function getProducts(obj) {
        return $http({ method: 'POST', url: settings.ServiceUrl+ '/api/queries/Products.php'.replace('.php',settings.isDotNetCore?'':'.php') , data:obj })        
    }
    function getAProduct(obj) {
        return $http({ method: 'POST', url: settings.ServiceUrl+ '/api/queries/GetAProduct.php'.replace('.php',settings.isDotNetCore?'':'.php') , data:obj })        
    }
    function getCatID(obj) {
        return $http({ method: 'POST', url: settings.ServiceUrl+ '/api/queries/getCatID.php'.replace('.php',settings.isDotNetCore?'':'.php') , data:obj })        
    }
    function getProductComments(obj) {
        return $http({ method: 'POST', url: settings.ServiceUrl+ '/api/queries/getProductComments.php'.replace('.php',settings.isDotNetCore?'':'.php') , data:obj })        
    }
    function getSettings(obj) {
        return $http({ method: 'GET', url: settings.ServiceUrl+ '/api/queries/GetSettings.php'.replace('.php',settings.isDotNetCore?'':'.php') })        
    }

    function addComment(obj) {
        return $http({ method: 'POST', url: settings.ServiceUrl+ '/api/queries/AddComment.php'.replace('.php',settings.isDotNetCore?'':'.php') ,data:obj})        
    }

    function getQtyForProduct(obj) {
        return $http({ method: 'POST', url: settings.ServiceUrl+ '/api/queries/getQtyForProduct.php'.replace('.php',settings.isDotNetCore?'':'.php') ,data:obj})        
    }
    function AddOrder(obj) {
        return $http({ method: 'POST', url: settings.ServiceUrl+ '/api/queries/AddOrder.php'.replace('.php',settings.isDotNetCore?'':'.php') ,data:obj})        
    }
    function getOrders(obj) {
        return $http({ method: 'POST', url: settings.ServiceUrl+ '/api/queries/getOrders.php'.replace('.php',settings.isDotNetCore?'':'.php') ,data:obj})        
    }
    return {
        getAll: getAllProducts,
        getProducts: getProducts,
        getAProduct: getAProduct,
        getCatID:getCatID,
        getAllCats:getAllCats,
        getProductComments:getProductComments,
        getSettings:getSettings,
        addComment:addComment,
        getQtyForProduct:getQtyForProduct,
        AddOrder:AddOrder,
        getOrders:getOrders
    }
})