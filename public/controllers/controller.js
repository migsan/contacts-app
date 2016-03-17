var myApp =  angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log('Hello my friend, I am your controller');

    $http.get('/contactlist')
        .success(function(res) {
            console.log('Got the data');
            $scope.contactlist = res;
        });
}]);
