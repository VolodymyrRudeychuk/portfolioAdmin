watchcoreApp.controller('banners', ['$scope', '$rootScope', '$location', '$firebaseAuth', '$firebaseObject', '$firebaseArray','$routeParams', '$timeout', '$mdSidenav', '$mdEditDialog', '$mdDialog', '$mdMedia',
    function($scope, $rootScope, $location, $firebaseAuth, $firebaseObject, $firebaseArray, $routeParams, $timeout, $mdSidenav, $mdEditDialog, $mdDialog, $mdMedia) {

        // login cheking
        $scope.authObj = $firebaseAuth();
        $scope.authObj.$onAuthStateChanged(function(authData) {
            if (authData) {
            } else {
                $location.path('/login');
                $scope.errorMessage = 'You mast login to view this page'
            }
        });
        // login cheking




        bannersRef = firebase.database().ref().child("banners");
        $scope.banneres = $firebaseArray(bannersRef);


        // Add new banners
        $scope.uploadComplited = true;
        $scope.submit = function (ev) {


          $scope.loaderPhoto = true;
             var storageRef = firebase.storage().ref()

            var uploadTask = storageRef.child('images/banners/' + $scope.bannerImage.name).put($scope.bannerImage);
            uploadTask.on('state_changed', function (snapshot) {
            }, function (erorr) {
                    console.log(erorr)
             }, function () {
                var downloadURL = uploadTask.snapshot.downloadURL;
                bannersRef.push({
                    packageName: $scope.packageName,
                    imageUrl: downloadURL,
                    archives: false
                });
                //aler dialog
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Success')
                        .textContent('Your banner successfully added')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Got it!')
                        .targetEvent(ev)
                );
                //aler dialog

                $scope.loaderPhoto = false;
                $scope.bannerImage = '';
                $scope.packageName = ''

                });

        };
        // Add new banners

        //Add banners to archives
        $scope.updateArchives = function (item, id) {
            firebase.database().ref('banners/' + id + '/archives').set(item);
        };
        //Add banners to archives
        
        //Deleting banners
        $scope.showConfirm = function(ev, data) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete this banner?')
                .textContent('Banner will be deleted, and can not be restored')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Delete')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function() {
                refDel = bannersRef.child(data);
                refDel.remove();
            }, function() {

            });
        };
        //Deleting banners 




        //Edit Banner

        $scope.showAdvanced = function(ev, data) {
            $scope.editBanner = true;
            editBannerRef = bannersRef.child(data);
            $scope.baner = $firebaseObject(editBannerRef);

            $scope.editPackageName = function (packageName) {
                editBannerRef.update({
                    packageName: packageName
                })
            };
            

            $scope.uploadEditPhoto =function (image) {
                $scope.editloaderPhoto = true;
                var storageRef = firebase.storage().ref();
                var uploadTask = storageRef.child('images/banners/' + image.name).put(image);
                uploadTask.on('state_changed', function (snapshot) {
                }, function (erorr) {
                    console.log(erorr)
                }, function () {
                    var downloadURL = uploadTask.snapshot.downloadURL;

                    editBannerRef.update({
                        imageUrl: downloadURL
                    });

                    $scope.editloaderPhoto = false;


                });
            }

        };

        $scope.closeEditBanner = function () {
            $scope.editBanner = false;
        };
        //Edit Banner


        // Table settings
        bannersRef.once("value", function(snapshot) {
            $scope.bannersQty = snapshot.numChildren();

            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });

        $scope.limitOptions = [5, 10, 15];
        $scope.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            decapitate: false,
            largeEditDialog: false,
            boundaryLinks: false,
            limitSelect: true,
            pageSelect: true
        };

        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1
        };

        $scope.logOrder = function (order) {
            console.log('order: ', order);
        };
        // Tabale settings








    }]);
