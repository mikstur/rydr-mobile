angular.module('starter.controllers')

    .controller('RegistrationCtrl', function ($scope, $state, LoopBackAuth, Trip) {

        $scope.$on('$ionicView.enter', function (e) {
            if (window.cordova) {
                var ref = cordova.InAppBrowser.open('http://rydr-api-qa.herokuapp.com/auth/facebook', "_blank");
                console.log(ref);
                ref.addEventListener('loadstart', function () {
                    console.log("start", ref);
                });

                ref.addEventListener('loadstop', function () {
                    console.log("stop", ref);
                    ref.executeScript(
                        { code: "document.body.innerHTML" },
                        function (values) {
                            var jsonHtml = values[0].replace(/<(?:.|\n)*?>/gm, '');
                            //console.log("inner html stripped", jsonHtml);
                            var jsonUser = JSON.parse(jsonHtml);
                            LoopBackAuth.setUser(jsonUser.user.accessToken.id, jsonUser.user.id, jsonUser.user || null);
                            LoopBackAuth.rememberMe = true;
                            LoopBackAuth.save();

                            ref.close();

                            Trip.updateAttributes({
                                id: localStorage.getItem("tripId")
                            }, { userId: jsonUser.user.id }, function (response, responseHeaders) {
                                $state.go("premiumappOne.tinder-profile", { userId: jsonUser.user.id });
                            });
                        }
                    );
                });
            } else {
                LoopBackAuth.setUser("jwbx6519FGxkxOy4bnM4epmK76rNOHk9eZPVeUnaLQdmz7FgcUWHosFarSUTbFXY", 54, null);
                LoopBackAuth.rememberMe = true;
                LoopBackAuth.save();

                Trip.updateAttributes({
                    id: localStorage.getItem("tripId")
                }, { userId: 54 }, function (response, responseHeaders) {
                    $state.go("premiumappOne.tinder-profile", { userId: 54 });
                });
            }
        });

    })