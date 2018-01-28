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
    }).state('profileForm.error', {
        url: '/error',
        templateUrl: '../view/error.ejs'
    }).state('profileForm.profileList', {
        url: '/list',
        templateUrl: '../view/profileList.ejs',
        controller: 'ListController'
    })

    $urlRouterProvider.otherwise('/profileForm');
}]);


athleteApp.controller("AthleteController", ["$scope", "$http", "$location", function ($scope, $http, $location) {
    $scope.profile = {};

    $http.get('/profile/getSportList').then(function (result) {
        $scope.sportsList = result.data[0].sports;
    }, function (error) {
        console.log("error");
    });

    $scope.submitProfile = function () {


        if(typeof $scope.profile.dob != 'undefined') {
            var dateObj = new Date($scope.profile.dob);
            var month = dateObj.getUTCMonth() + 1;
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();

            $scope.profile.dob = year + "/" + month + "/" + day;
        }
        if (typeof $scope.profile.name == 'undefined' || typeof $scope.profile.dob == 'undefined') {
            alert("Please Enter the mandatory fields and resubmit");

        }
        else {
            $http.post('/profile/createProfile', {
                data: {
                    profile: $scope.profile
                }
            }).then(function (data) {
                $scope.profile = {};
                $location.path('/success');
            }, function (error) {
                console.log("error");
                $scope.profile = {};
                location.path('/profileForm.error');
            })
        }
    }
}]);

athleteApp.controller("ListController", ["$scope", "$http", "$location", function ($scope, $http, $location) {
    $http.get('.profile/getProfileList').then(function (result) {
        $scope.profileList = result.data;
    }, function (error) {
        console.log("error");
    });
}]);