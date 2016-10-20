watchcoreApp.controller('watchfaces', ['$scope', '$rootScope', '$location', '$firebaseAuth', '$firebaseObject', '$firebaseArray','$routeParams', '$timeout', '$mdSidenav', '$mdEditDialog', '$mdDialog', '$mdMedia',
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
        


        watchesRef = firebase.database().ref().child("watches");
        $scope.watchfaces = $firebaseArray(watchesRef);


        //codeFileLoader
        $scope.codeFileUpload = function (ev, data) {
            $scope.codeFileLoader = true;

            var storageRef = firebase.storage().ref();
            var uploadTask = storageRef.child( $scope.user.className + '/binaryCode/' + data.name).put(data);
            uploadTask.on('state_changed', function (snapshot) {
            }, function (erorr) {
                console.log(erorr)
            }, function () {

                $scope.codeFileUrl = uploadTask.snapshot.downloadURL;
              
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Success')
                        .textContent('Your file successfully added')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Got it!')
                        .targetEvent(ev)
                );
                //aler dialog

                $scope.codeFileLoader = false;
             

            });
        };
        //codeFileLoader

        //Circle image upload
        $scope.circleImageFileUpload = function (ev, data) {
            $scope.circleLoader = true;

            var storageRef = firebase.storage().ref();
            var uploadTask = storageRef.child($scope.user.className + '/circleIcon/' + data.name).put(data);
            uploadTask.on('state_changed', function (snapshot) {
            }, function (erorr) {
                console.log(erorr)
            }, function () {

                $scope.circleImage = uploadTask.snapshot.downloadURL;

                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Success')
                        .textContent('Your file successfully added')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Got it!')
                        .targetEvent(ev)
                );
                //aler dialog

                $scope.circleLoader = false;

            });
        };
        //Circle image upload

        //square image upload
        $scope.squareImageFileUpload = function (ev, data) {
            $scope.squareLoader = true;

            var storageRef = firebase.storage().ref();
            var uploadTask = storageRef.child($scope.user.className + '/squareIcon/' + data.name).put(data);
            uploadTask.on('state_changed', function (snapshot) {
            }, function (erorr) {
                console.log(erorr)
            }, function () {

                $scope.squareImage = uploadTask.snapshot.downloadURL;

                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Success')
                        .textContent('Your file successfully added')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Got it!')
                        .targetEvent(ev)
                );
                //aler dialog

                $scope.squareLoader = false;

            });
        };
        //square image upload

        //Resources file upload
        $scope.resourceFileUpload = function (ev, data) {
            $scope.resLoader = true;
            var storageRef = firebase.storage().ref();

            var onComplete = data.length;

            angular.forEach(data, function (value, key) {

                var uploadTask = storageRef.child($scope.user.className + '/resources/' + value.name).put(value);
                uploadTask.on('state_changed', function (snapshot) {
                }, function (erorr) {
                    console.log(erorr)
                }, function () {
                    if (-- onComplete === 0){
                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('Success')
                                .textContent('Your files successfully added')
                                .ariaLabel('Alert Dialog Demo')
                                .ok('Got it!')
                                .targetEvent(ev)
                        );
                        //aler dialog

                        $scope.resLoader = false;
                    }
                });
            });



        };
        //Resources file upload




        // Add new watchface
        $scope.interactive = false;
        $scope.paid = false;
        $scope.price = '0';
        $scope.addWatchFace = function (ev) {


            function arrayToFirebase(trans) {

                var key, tmp_ar = {};

                if (trans && typeof trans === 'object' && trans.change_key_case) {
                    return trans.flip();
                }

                for (key in trans) {
                    if (!trans.hasOwnProperty(key)) {
                        continue;
                    }
                    tmp_ar[trans[key]] = true;
                }

                return tmp_ar;
            }
            
                watchesRef.push({
                    name:               $scope.user.name,
                    packageName:        $scope.user.packageName,
                    className:          $scope.user.className,
                    configPath:         $scope.user.configPath,
                    previewClassName:   $scope.user.previewClass,
                    previewUrl:         $scope.codeFileUrl,
                    interactive:        $scope.interactive,
                    paid:               $scope.paid,
                    categories:         arrayToFirebase($scope.user.categoriesValue),
                    price:              $scope.price,
                    tag:                $scope.user.tagValue,
                    timeStamp:          firebase.database.ServerValue.TIMESTAMP,
                    icon_circle:        $scope.circleImage,
                    icon_square:        $scope.squareImage
                }).then(function(sucess) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Success')
                            .textContent('Watchface successfully added')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('Got it!')
                            .targetEvent(ev)
                    );
                    //aler dialog
                    $scope.user = null;
                    $scope.codeFileUrl =null;
                    $scope.circleImage = null;
                    $scope.squareImage = null;
                });


        };
        // Add new watchface

        
        
        //Deleting watchface
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
                refDel = watchesRef.child(data);
                refDel.remove();
            }, function() {

            });
        };
        //Deleting watchface



        
        
        //Edit Watchface

        //codeFileLoader
        $scope.codeFileUploadE = function (ev, data) {
            $scope.codeFileLoader = true;

            var storageRef = firebase.storage().ref();
            var uploadTask = storageRef.child( $scope.watchFacesEdit.className + '/binaryCode/' + data.name).put(data);
            uploadTask.on('state_changed', function (snapshot) {
            }, function (erorr) {
                console.log(erorr)
            }, function () {

                $scope.codeFileUrl = uploadTask.snapshot.downloadURL;

                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Success')
                        .textContent('Your file successfully added')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Got it!')
                        .targetEvent(ev)
                );
                //aler dialog

                $scope.codeFileLoader = false;


            });
        };
        //codeFileLoader

        //Circle image upload
        $scope.circleImageFileUploadE = function (ev, data) {
            $scope.circleLoader = true;

            var storageRef = firebase.storage().ref();
            var uploadTask = storageRef.child($scope.watchFacesEdit.className + '/circleIcon/' + data.name).put(data);
            uploadTask.on('state_changed', function (snapshot) {
            }, function (erorr) {
                console.log(erorr)
            }, function () {

                $scope.circleImage = uploadTask.snapshot.downloadURL;

                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Success')
                        .textContent('Your file successfully added')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Got it!')
                        .targetEvent(ev)
                );
                //aler dialog

                $scope.circleLoader = false;

            });
        };
        //Circle image upload

        //square image upload
        $scope.squareImageFileUploadE = function (ev, data) {
            $scope.squareLoader = true;

            var storageRef = firebase.storage().ref();
            var uploadTask = storageRef.child($scope.watchFacesEdit.className + '/squareIcon/' + data.name).put(data);
            uploadTask.on('state_changed', function (snapshot) {
            }, function (erorr) {
                console.log(erorr)
            }, function () {

                $scope.squareImage = uploadTask.snapshot.downloadURL;

                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Success')
                        .textContent('Your file successfully added')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Got it!')
                        .targetEvent(ev)
                );
                //aler dialog

                $scope.squareLoader = false;

            });
        };
        //square image upload

        //Resources file upload
        $scope.resourceFileUploadE = function (ev, data) {
            $scope.resLoader = true;
            var storageRef = firebase.storage().ref();

            var onComplete = data.length;

            angular.forEach(data, function (value, key) {

                var uploadTask = storageRef.child($watchfaceEdit.className + '/resources/' + value.name).put(value);
                uploadTask.on('state_changed', function (snapshot) {
                }, function (erorr) {
                    console.log(erorr)
                }, function () {
                    if (-- onComplete === 0){
                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('Success')
                                .textContent('Your files successfully added')
                                .ariaLabel('Alert Dialog Demo')
                                .ok('Got it!')
                                .targetEvent(ev)
                        );
                        //aler dialog

                        $scope.resLoader = false;
                    }
                });
            });



        };
        //Resources file upload


        $scope.showAdvanced = function(ev, data) {
            $scope.editBanner = true;

            watchFacesEditRef = watchesRef.child(data);
            $scope.watchFacesEdit = $firebaseObject(watchFacesEditRef);


            //categories
            $scope.categorySelected = [];
            watchfaceEditCategory = watchFacesEditRef.child('categories');
            watchfacecategory = $firebaseArray(watchfaceEditCategory);
            watchfacecategory.$loaded(
                function (data) {
                    angular.forEach(watchfacecategory, function (value, key) {
                        $scope.categorySelected.push(value.$id)
                    });
                }
            );
            //categories

            $scope.editText = function ($event, categorySelected) {

                function arrayToFirebase(trans) {

                    var key, tmp_ar = {};

                    if (trans && typeof trans === 'object' && trans.change_key_case) {
                        return trans.flip();
                    }

                    for (key in trans) {
                        if (!trans.hasOwnProperty(key)) {
                            continue;
                        }
                        tmp_ar[trans[key]] = true;
                    }

                    return tmp_ar;
                }


                if(!$scope.codeFileUrl){
                    $scope.codeFileUrl = $scope.watchFacesEdit.previewUrl;
                }
                if (!$scope.circleImage){
                    $scope.circleImage = $scope.watchFacesEdit.icon_circle;
                }
                if(!$scope.squareImage){
                    $scope.squareImage =  $scope.watchFacesEdit.icon_square;
                }



                watchFacesEditRef.update({
                    name:               $scope.watchFacesEdit.name,
                    packageName:        $scope.watchFacesEdit.packageName,
                    className:          $scope.watchFacesEdit.className,
                    configPath:         $scope.watchFacesEdit.configPath,
                    previewClassName:   $scope.watchFacesEdit.previewClassName,
                    interactive:        $scope.watchFacesEdit.interactive,
                    paid:               $scope.watchFacesEdit.paid,
                    categories:         arrayToFirebase(categorySelected),
                    price:              $scope.watchFacesEdit.price,
                    tag:                $scope.watchFacesEdit.tag,
                    timeStamp:          firebase.database.ServerValue.TIMESTAMP,
                    previewUrl:         $scope.codeFileUrl,
                    icon_circle:        $scope.circleImage,
                    icon_square:        $scope.squareImage

                }).then(function (sucess) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Success')
                            .textContent('Watchface successfully edited')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('Got it!')
                            .targetEvent(ev)
                    );
                    $scope.codeFileUrl =null;
                    $scope.circleImage = null;
                    $scope.squareImage = null;
                })




            };
            
        };

        $scope.closeEditBanner = function () {
            $scope.editBanner = false;
        };
        //Edit Watchface












        // Table settings
        watchesRef.once("value", function(snapshot) {
            $scope.watchQty = snapshot.numChildren();

            if(!$scope.$$phase) {
                $scope.$apply();
            }
        });

        $scope.limitOptions = [10, 15, 150];
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
            limit: 10,
            page: 1
        };

        $scope.logOrder = function (order) {
            console.log('order: ', order);
        };
        // Tabale settings

        //Select categoryes setting

        $scope.categories = [
            'All',
            'Giveaway',
            'Paid',
            'Free'
            // 'Customizable',
            // 'Animated',
            // 'Simple'
        ];


        $scope.tags = ['None', 'New', 'Popular', 'Upadated'];
   
        //ends settings category





    }]);


