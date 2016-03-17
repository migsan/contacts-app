var myApp =  angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log('Hello my friend, I am your controller');

    var refresh = function() {
        $http.get('/contactlist')
            .success(function(res) {
                console.log('Got the data');
                $scope.contactlist = res;
            });
        $scope.contact = '';
    };

    refresh();

    $scope.addContact = function() {
        console.log('ng-click');
        console.log($scope.contact);
        $http.post('/contactlist', $scope.contact)
            .success(function(res) {
                console.log(res);
            });
        refresh();
    };

    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/contactlist/' + id)
            .success(function(res) {
                refresh();
            });
    };

    $scope.edit = function(id) {
        console.log(id);
        $http.get('/contactlist/' + id)
            .success(function(res) {
                $scope.contact = res;
            });
    };

    $scope.update = function() {
        console.log($scope.contact._id);
        $http.put('/contactlist/' + $scope.contact._id, $scope.contact)
            .success(function(res) {
                refresh();
            });
    };

    $scope.deselect = function() {
        $scope.contact = '';
    }
}]);
