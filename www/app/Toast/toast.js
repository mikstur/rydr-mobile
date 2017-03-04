angular.module('starter.controllers')
    .controller('ToastCtrl', function($scope, $cordovaToast) {
  $scope.showToast = function(message, duration, location) {
        $cordovaToast.show("Here's your toast", duration, location).then(function(success) {
            console.log("The toast was shown");
        }, function (error) {
            console.log("The toast was not shown due to " + error);
        });
    }

});