angular.module('starter.controllers')

    .controller('FeedTabCtrl', function ($scope) {

        $scope.$on('$ionicView.enter', function (e) {
            console.log("THIS IS YOUR TRIP!!!");
        });

    })