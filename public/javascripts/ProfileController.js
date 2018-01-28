var athleteApp = angular.module("athleteApp", ["ui.router"]);

athleteApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('profileForm', {
        url: '',
        templateUrl: '../view/mainTemplate.ejs',
        controller: 'AthleteController'
    }).state('profileForm.basic', {
        url: '/basic',
        templateUrl: '../view/basicInfo.ejs'
    }).state('profileForm.professional', {
        url: '/professional',
        templateUrl: '../view/professionalInfo.ejs'
    }).state('profileForm.social', {
        url: '/social',
        templateUrl: '../view/socialInfo.ejs'
    }).state('profileForm.miscellaneous', {
        url: '/miscellaneous',
        templateUrl: '../view/miscellaneousInfo.ejs'
    }).state('profileForm.review', {
        url: '/review',
        templateUrl: '../view/review.ejs'
    }).state('profileForm.success', {
        url: '/success',
        templateUrl: '../view/success.ejs'
    })

    $urlRouterProvider.otherwise('/profileForm');
}]);


athleteApp.controller("AthleteController", ["$scope", "$http", "$location", function ($scope, $http, $location) {
    $scope.profile = {};

    $http.get('/getSportList').then(function (result) {
        $scope.sportsList = result.data[0].sports;
    });

    $scope.submitProfile = function () {

        var dateObj = new Date($scope.profile.dob);
        var month = dateObj.getUTCMonth() + 1;
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        $scope.profile.dob = year + "/" + month + "/" + day;

        if (typeof $scope.profile.name == 'undefined' || typeof $scope.profile.dob == 'undefined') {
            alert("Please Enter the mandatory fields and resubmit");
        }
        else {
            $http.post('/createProfile', {
                data: {
                    profile: $scope.profile
                }
            }).then(function (data) {
                $scope.profile = {};
                $location.path('/success');
            }, function (error) {
                console.log("error");
            })
        }
    }

}]);