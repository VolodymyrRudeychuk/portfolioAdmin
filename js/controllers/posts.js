watchcoreApp.controller('posts', ['$scope', '$rootScope', '$location', '$firebaseAuth', '$firebaseObject', '$firebaseArray','$routeParams', '$timeout', '$mdSidenav', '$mdEditDialog', '$mdDialog', '$mdMedia',
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




        postRef = firebase.database().ref().child("posts");

        $scope.post = $firebaseArray(postRef);

        
        
        


        // Add new banners
        $scope.uploadComplited = true;
        $scope.submit = function (ev) {


            $scope.loaderPhoto = true;
            var storageRef = firebase.storage().ref();

            var uploadTask = storageRef.child('images/banners/' + $scope.postImage.name).put($scope.postImage);
            uploadTask.on('state_changed', function (snapshot) {
            }, function (erorr) {
                console.log(erorr)
            }, function () {
                var downloadURL = uploadTask.snapshot.downloadURL;
                postRef.push({
                    title: $scope.title,
                    text: $scope.text,
                    buttonText: $scope.buttonText,
                    communityUrl: $scope.communityUrl,
                    imageUrl: downloadURL
                });
                //aler dialog
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Success')
                        .textContent('Your post successfully added')
                        .buttonText('Button has renamed')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Got it!')
                        .targetEvent(ev)
                );
                //aler dialog

                $scope.loaderPhoto = false;
                $scope.title = '';
                $scope.text = '';
                $scope.buttonText = '';
                $scope.communityUrl = '';
                $scope.postImage = '';

            });

        };
        // Add new banners


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
                refDel = postRef.child(data);
                refDel.remove();
            }, function() {

            });
        };
        //Deleting banners




        //Edit Banner

        $scope.showAdvanced = function(ev, data) {
            $scope.editBanner = true;
            editPostsRef = postRef.child(data);
            $scope.postEdit = $firebaseObject(editPostsRef);

            $scope.editText = function (title, text, buttonText, communityUrl, ev) {
                editPostsRef.update({
                    title: title,
                    text: text,
                    buttonText: buttonText,
                    communityUrl: communityUrl
                });
                
                    $scope.editBanner = false;
            };


            $scope.uploadEditPhoto =function (image) {
                $scope.editloaderPhoto = true;
                var storageRef = firebase.storage().ref();
                var uploadTask = storageRef.child('images/posts/' + image.name).put(image);
                uploadTask.on('state_changed', function (snapshot) {
                }, function (erorr) {
                    console.log(erorr)
                }, function () {
                    var downloadURL = uploadTask.snapshot.downloadURL;
                    editPostsRef.update({
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
        postRef.once("value", function(snapshot) {
            $scope.postsQty = snapshot.numChildren();

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

