angular.module("myApp").factory('DataTransferFactory', function () {

    var data = {};

    return {
        getItem: function (itemName) {
            return data[itemName];
        },
        setItem: function (itemName, value) {
            data[itemName] = value;
            
        }
    };
});