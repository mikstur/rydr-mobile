angular.module('starter.controllers')

    .controller('TripFeedCtrl', function ($scope) {

        $scope.$on('$ionicView.enter', function (e) {
            console.log("THIS IS YOUR TRIP!!!");
        });


    })