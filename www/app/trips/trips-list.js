angular.module('starter.controllers')

    .controller('TripsListCtrl', function ($scope) {

        $scope.$on('$ionicView.enter', function (e) {
            console.log("Yay!!");
        });

    })