watchcoreApp.controller('panel', ['$scope', '$rootScope', '$location', '$firebaseAuth', '$firebaseObject', '$firebaseArray','$routeParams', '$timeout', '$mdSidenav', '$log',
    function($scope, $rootScope, $location, $firebaseAuth, $firebaseObject, $firebaseArray, $routeParams, $timeout, $mdSidenav, $log) {

        $scope.authObj = $firebaseAuth();
        $scope.authObj.$onAuthStateChanged(function(authData) {
            if (authData) { 
            } else {
                $location.path('/login');
                $scope.errorMessage = 'You mast login to view this page'
            }
        });

        
        var ref = firebase.database().ref();
        var obj = $firebaseObject(ref);

        $scope.loader = true;

        obj.$loaded(
            function (data) {
                $scope.loader = false;
            }
        );

        var userRef = ref.child("users");
        userRef.once("value", function(snapshot) {
            $scope.userQts = snapshot.numChildren();
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });

        var postRef = ref.child("posts");
        postRef.once("value", function(snapshot) {
            $scope.postsQty = snapshot.numChildren();

            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });

        var watchesRef = ref.child("watches");
        watchesRef.once("value", function(snapshot) {
            $scope.watchesQts = snapshot.numChildren();
            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });

        var bannersRef = ref.child("banners");
        bannersRef.once("value", function(snapshot) {
            $scope.bannersQty = snapshot.numChildren();

            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });

        var messagesRef = ref.child("messages");
        bannersRef.once("value", function(snapshot) {
            $scope.bannersQty = snapshot.numChildren();

            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });



        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };



        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }

        $scope.toggleLeft = buildDelayedToggler('left');


        function buildDelayedToggler(navID) {
            return debounce(function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }

        $scope.close = function () {

            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        };

        
        
        
        
        // Navigation function starts
        $scope.dashbord = function () {
            $location.url('/');
        };
        $scope.banners = function () {
            $location.url('/banners');
        };
        $scope.posts = function () {
            $location.url('/posts');
        }; 
        $scope.wactfaces = function () {
            $location.url('/watchfaces');
        };
        $scope.users = function () {
            $location.url('/users');
        };
        $scope.message = function () {
            $location.url('/messages');
        };
        

    }]);