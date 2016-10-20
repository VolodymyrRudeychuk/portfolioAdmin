watchcoreApp.controller('login', ['$scope', '$rootScope', '$location', '$firebaseAuth', '$firebaseObject', '$firebaseArray','$routeParams',
    function($scope, $rootScope, $location, $firebaseAuth, $firebaseObject, $firebaseArray, $routeParams) {

        $scope.authObj = $firebaseAuth();
        $scope.loader = false;
        $scope.login = function () {
            $scope.loader = true;
            $scope.authObj.$signInWithEmailAndPassword(
                $scope.user.email, 
                $scope.user.password
            ).then(function(authData) {
                console.log("Logged in as:", authData.uid);
            }).then(function(){
                $location.path('/panel');
            }).catch(function(error) {
                console.error("Authentication failed:", error);
            });
        };


    }]);