watchcoreApp.factory('Authentication', ['$scope','$rootScope', '$firebaseAuth', '$firebaseObject', '$location',
    function($scope, $rootScope, $firebaseAuth, $firebaseObject, $location){

        $rootScope.authObj = $firebaseAuth();
        
        return{
            login: function(user){
                authObj.$signInWithEmailAndPassword(user.email, user.password).then(function(authData){
                    console.log("Logged in as:", authData.uid);
                }).catch(function(error){
                    $rootScope.message =  error.message;
                });
            }, //login


            logout: function(){
                return $location.path('/').then(auth.$unauth());
            }, //logout


            requireAuth: function() {
                return auth.$requireAuth();
            } //require Authentication

        };


    }]);