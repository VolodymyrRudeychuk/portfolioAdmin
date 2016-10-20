watchcoreApp.controller( 'messages', ['$scope', '$rootScope', '$location', '$firebaseAuth', '$firebaseObject', '$firebaseArray','$routeParams', '$timeout', '$mdSidenav', '$mdEditDialog', '$mdDialog', '$mdMedia',
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



        messageRef = firebase.database().ref().child("jsonMessage");
        $scope.messages = $firebaseArray(messageRef);
        console.log($scope.messages);

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
            var uploadTask = storageRef.child($scope.className + '/circleIcon/' + data.name).put(data);
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




        // Add new watchface
        $scope.interactive = false;
        $scope.paid = false;
        $scope.price = '0';
        $scope.addJsonMessage = function (ev) {


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
            // if ($scope.type == "Play"){
            //     messageRef.push({
            //         buttonText:         $scope.buttonText,
            //         className:          "",
            //         imageUrl:           $scope.circleImage,
            //         message:            $scope.messagesJson,
            //         packageName:        "",
            //         tab:                null,
            //         type:               $scope.type,
            //         updated:            firebase.database.ServerValue.TIMESTAMP,
            //         url:                $scope.jsonMessageUrl
            //
            //     }).then(function(sucess) {
            //         $mdDialog.show(
            //             $mdDialog.alert()
            //                 .parent(angular.element(document.querySelector('#popupContainer')))
            //                 .clickOutsideToClose(true)
            //                 .title('Success')
            //                 .textContent('Watchface successfully added')
            //                 .ariaLabel('Alert Dialog Demo')
            //                 .ok('Got it!')
            //                 .targetEvent(ev)
            //         );
            //         //aler dialog
            //         $scope.user = null;
            //         // $scope.jsonMessageUrl = null;
            //         $scope.circleImage = null;
            //
            //     });
            //
            //
            // }

            messageRef.push({
                buttonText:         $scope.buttonText,
                className:          $scope.className ? $scope.className:"",
                imageUrl:           $scope.circleImage,
                message:            $scope.messagesJson,
                packageName: !$scope.packageName ?  "" : $scope.packageName,
                tab:                !$scope.categoriesValue ? "" :arrayToFirebase($scope.categoriesValue),
                type:               $scope.type,
                updated:            firebase.database.ServerValue.TIMESTAMP,
                url:                !$scope.url ? "" : $scope.url

            }).then(function(sucess) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Success')
                        .textContent('Json Messages successfully added')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Got it!')
                        .targetEvent(ev)
                );
                //aler dialog
                $scope.user = null;
                // $scope.tab = '';
                $scope.circleImage = null;

            });



        };
        // Add new watchface



        //Deleting watchface
        $scope.showConfirm = function(ev, data) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete this Push Message?')
                .textContent('Push Message will be deleted, and can not be restored')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Delete')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function() {
                refDel = messageRef.child(data);
                refDel.remove();
            }, function() {

            });
        };
        //Deleting watchface





        //Edit Watchface


        //Circle image upload
        $scope.circleImageFileUploadE = function (ev, data) {
            $scope.circleLoader = true;

            var storageRef = firebase.storage().ref();
            var uploadTask = storageRef.child($scope.watchFaceEdit.className + '/circleIcon/' + data.name).put(data);
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

            watchFaceEditRef = messageRef.child(data);
            $scope.watchFaceEdit = $firebaseObject(watchFaceEditRef);

            //categories
            $scope.categorySelected = [];
            watchfaceEditCategory = watchFaceEditRef.child('categories');
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
                    $scope.codeFileUrl = $scope.watchFaceEdit.previewUrl;
                }
                if (!$scope.circleImage){
                    $scope.circleImage = $scope.watchFaceEdit.imageUrl;
                }
                if(!$scope.squareImage){
                    $scope.squareImage =  $scope.watchFaceEdit.icon_square;
                }


                watchFaceEditRef.update({
                    type:               $scope.watchFaceEdit.type,
                    buttonText:         $scope.watchFaceEdit.buttonText,
                    className:          $scope.watchFaceEdit.className,
                    message:            $scope.watchFaceEdit.message,
                    packageName:        $scope.watchFaceEdit.packageName,
                    tab:                arrayToFirebase(categorySelected),
                    updated:            firebase.database.ServerValue.TIMESTAMP,
                    url:                $scope.watchFaceEdit.url,
                    imageUrl:           $scope.circleImage

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
                    $scope.codeFileUrl = null;
                    $scope.circleImage = null;
                    $scope.squareImage = null;
                })




            };

        };

        $scope.closeEditBanner = function () {
            $scope.editBanner = false;
        };

        $scope.showDiv = false;

        $scope.toggleShowDiv = function(){
            console.log('fired');
            $scope.showDiv = !$scope.showDiv;
        };

        //Edit Watchface



        // Table settings
        messageRef.once("value", function(snapshot) {
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


