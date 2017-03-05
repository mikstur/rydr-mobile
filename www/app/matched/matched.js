angular.module('starter.controllers')

    .controller('MatchedCtrl', function ($scope, RbgUser, Trip, AdventureUserMapping) {

        $scope.currentAUM;
        $scope.otherAUM;

        $scope.$on('$ionicView.enter', function (e) {
            RbgUser.me({}, function (meResponse, responseHeaders) {
                Trip.findById(localStorage.getItem("tripId"), function (tripResponse, responseHeaders) {
                    AdventureUserMapping.find({
                        filter: {
                            where: {
                                adventureId: tripResponse.adventureId
                            },
                            include: ["adventure", "user"]
                        }
                    }, function (response, responseHeaders) {
                        response.forEach(function(aum) {
                            if (aum.userId == meResponse.user.id) {
                                $scope.currentAUM = aum.user;
                            } else {
                                $scope.otherAUM = aum.user;
                            }

                            console.log($scope.currentAUM, $scope.otherAUM);
                        })
                    });
                })
            });
        });

    })