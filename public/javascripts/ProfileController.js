var athleteApp = angular.module("athleteApp", ["ui.router"]);

athleteApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('profileForm', {
        url: '',
        templateUrl: '../view/mainTemplate.ejs',
        controller: 'AthleteController'
    }).state('profileForm.basic', {
        url: '/basic',
        templateUrl: '../view/basicInfo.ejs'
    })
    $urlRouterProvider.otherwise('/profileForm');
}]);

athleteApp.controller("AthleteController", ["$scope", "$http", "$location", function ($scope, $http, $location) {
    console.log("inside conntroller");
}])