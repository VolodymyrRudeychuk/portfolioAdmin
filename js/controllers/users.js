watchcoreApp.controller('users', ['$scope', '$rootScope', '$location', '$firebaseAuth', '$firebaseObject', '$firebaseArray','$routeParams', '$timeout', '$mdSidenav', '$mdEditDialog', '$mdDialog', '$mdMedia',
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


        


        userRef = firebase.database().ref().child("users");
        // sourceRef = userRef.child("lastVisitTime");
        $scope.usersArray = $firebaseArray(userRef);




        function parseData(date) {

            var newDate = new Date(date);
            var day = newDate.getDate();
            var month = newDate.getMonth()+1;
            var year = newDate.getFullYear();

            return year + "/" + month + "/" + day;

        }

        function diffBetweenDate(date1, date2){

            var firstDate  = new Date(date1);
            var secondDate = new Date (date2);

            var timeDiff = Math.abs(secondDate.getTime() - firstDate.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            return diffDays;

        }




        // EMAIL PASS COUNTER
        $scope.myFunction = function() {

            console.log($scope.StartTime);
            console.log($scope.EndTime);


            $scope.resultWithPass = [];
            $scope.resultWithG = [];
            $scope.labelsA = [];
            $scope.startTimeUTC = new Date($scope.StartTime).getTime();
            $scope.endTimeUTC = new Date($scope.EndTime).getTime() + 86400000;



                var sourceData = userRef.orderByChild("lastVisitTime");


                sourceData.once("value", function (dataSnapshot) {

                    angular.forEach($scope.gap, function(value, key) {
                        var withPass =0;
                        var withGplus =0;
                        var startDate = new Date(value).getTime();
                        var endDate  =  startDate + 86400000;

                        dataSnapshot.forEach(function(childSnapshot) {
                            var childData = childSnapshot.val();
                            if (childData.lastVisitTime>= startDate && childData.lastVisitTime<= endDate)
                            {
                                if (childData.hasLoggedInWithPassword==true) {

                                    withPass++;

                                } else {
                                    withGplus++;

                                }
                            }
                        });
                        $scope.resultWithG.push(
                            [withGplus]
                        );
                         $scope.resultWithPass.push(
                            [withPass]
                        );

                        $scope.labelsA.push(
                            [value]
                        );





                    });
                });

            $scope.result = [$scope.resultWithG, $scope.resultWithPass];

            console.log($scope.result);




            $scope.gap = [];

            $scope.gap_result = diffBetweenDate($scope.StartTime, $scope.EndTime);



            var today = new Date($scope.StartTime);
            var tomorrow = today.setDate(today.getDate());
            $scope.gap.push(parseData(tomorrow));
            var i = 0;

            while (i < $scope.gap_result) {
                var tomorrow = today.setDate(today.getDate() + 1);
                $scope.gap.push(parseData(tomorrow));
                ++i;
            }

            

            $scope.labels = $scope.labelsA;
            $scope.series = ['G+', 'Email'];
            $scope.data = $scope.result;

            $scope.onClick = function (points, evt) {

            };
            $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
            $scope.options = {
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                        },
                        {
                            id: 'y-axis-2',
                            type: 'linear',
                            display: true,
                            position: 'right'
                        }
                    ]
                }
            };

            //
            //
            // // CHARTS ANGULAR SETINGS
            // $scope.data = {
            //     series: ['G+', 'Email'],
            //     data: $scope.result
            //
            // };
            //
            // $scope.chartType = 'bar';
            // $scope.config = {
            //     labels: true,
            //     title: "Statistic users in APP",
            //     legend: {
            //         display: true,
            //         position: 'left'
            //     },
            //     innerRadius: 0,
            //     lineLegend: "lineEnd"
            // };
            // // END CHARTS ANGULAR SETINGS





        };

















        // Table settings
        userRef.once("value", function(snapshot) {
            $scope.usersQty = snapshot.numChildren();

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








    }]);
