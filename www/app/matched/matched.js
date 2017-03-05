angular.module('starter.controllers')

    .controller('MatchedCtrl', function ($scope) {

        $scope.$on('$ionicView.enter', function (e) {
            console.log("MATCHED!!");
        });

    })