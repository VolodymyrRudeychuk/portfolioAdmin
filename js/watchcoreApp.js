var watchcoreApp = angular.module('watchcoreApp', [ 'ngRoute', 'firebase', 'ngMaterial',  'md.data.table',  'file-model', 'chart.js', 'angularjs-datetime-picker'] );


watchcoreApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/',{
        templateUrl : 'views/panel.html',
        controller  : 'panel'
    }).
    when('/login',{
        templateUrl : 'views/login.html',
        controller  : 'login'
    }).
    when('/banners',{
        templateUrl : 'views/banners.html',
        controller  : 'banners'
    }).
    when('/posts',{
        templateUrl : 'views/posts.html',
        controller  : 'posts'
    }).
    when('/watchfaces',{
        templateUrl : 'views/watchfaces.html',
        controller  : 'watchfaces'
    }).
    when('/users',{
        templateUrl : 'views/users.html',
        controller  : 'users'
    }).
    when('/messages',{
        templateUrl : 'views/messages.html',
        controller  : 'messages'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);