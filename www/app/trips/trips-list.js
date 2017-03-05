angular.module('starter.controllers')

    .controller('TripsListCtrl', function ($scope, LoaderService, Trip) {

        $scope.trips = [];

        $scope.$on('$ionicView.enter', function (e) {
            LoaderService.show();
            Trip.findWithAdventures({}, function(response, responseHeaders) {
                LoaderService.hide();
                $scope.trips = response.trips;
            }, function(httpResponse) {
                LoaderService.hide();
            });
        });

    })