var myApp = angular.module('myApp', ['ngRoute','ui.bootstrap', 'ngAnimate', 'ngFileUpload']);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'template/home.html',
      controller: 'homeCtrl',
      access: {restricted: false}
    })
    .when('/rewards', {
      templateUrl: 'template/rewards.html',
      access: {restricted: false}
    })
    .when('/questions', {
      templateUrl: 'template/questions.html',
      access: {restricted: false}
    })
    .otherwise({redirectTo: '/'});
});


myApp.run(function ($rootScope, $location, $route) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    console.log('running'); 
  });
});
