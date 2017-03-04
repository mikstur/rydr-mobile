// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js


angular.module('starter', ['ionic', 'starter.controllers', 'angular-preload-image', 'ionic.contrib.ui.tinderCards', 'ngResource', 'starter.loaders', 'ion-datetime-picker','ngCordova','ion-floating-menu'])

  .run(function ($ionicPlatform) {
    // $cordovaStatusbar.hide();
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
        // StatusBar.hide();
      }
      ionic.Platform.fullScreen();
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      // BASIC Style Cards:
      // ----------------------------------
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: "templates/basic/menu.html",
        controller: 'AppCtrl'
      })

      .state('app.tinder-one', {
        url: "/tinder-one",
        views: {
          'menuContent': {
            templateUrl: "templates/basic/tinder-one.html"
          }
        }
      })

      .state('app.walkthrough', {
        url: "/walkthrough",
        views: {
          'menuContent': {
            templateUrl: "templates/basic/walkthrough.html",
            controller: 'WalkthroughCtrl'
          }
        }
      })

      .state('app.tinder-two', {
        url: "/tinder-two",
        views: {
          'menuContent': {
            templateUrl: "templates/basic/tinder-two.html"
          }
        }
      })

      .state('app.tinder-three', {
        url: "/tinder-three",
        views: {
          'menuContent': {
            templateUrl: "templates/basic/tinder-three.html"
          }
        }
      })

      .state('app.tinder-four', {
        url: "/tinder-four",
        views: {
          'menuContent': {
            templateUrl: "templates/basic/tinder-four.html"
          }
        }
      })

      .state('app.tinder-profile', {
        url: "/tinder-profile/:profileID",
        views: {
          'menuContent': {
            templateUrl: "templates/basic/profile.html"
          }
        }
      })

      // Premium Style (Premium1) States
      // -------------------------------------------
      .state('premiumappOne', {
        url: '/appPremiumOne',
        abstract: true,
        templateUrl: "templates/premium1/menu.html",
        controller: 'AppCtrl'
      })

      // .state('premiumappOne.tinder-one', {
      //   url: "/tinder-one",
      //   views: {
      //     'menuContent': {
      //       templateUrl: "templates/premium1/tinder-one.html"
      //     }
      //   }
      // })

      .state('premiumappOne.walkthrough', {
        url: "/walkthrough",
        views: {
          'menuContent': {
            templateUrl: "templates/premium1/walkthrough.html",
            controller: 'WalkthroughCtrl'
          }
        }
      })

      .state('premiumappOne.cardSwipe', {
        url: "/cardswipe",
        views: {
          'menuContent': {
            templateUrl: "templates/premium1/card-swipe.html"
          }
        }
      })

      .state('premiumappOne.tinder-profile', {
        url: "/profile/:profileID",
        views: {
          'menuContent': {
            templateUrl: "templates/premium1/profile.html"
          }
        }
      })

      .state('premiumappOne.chat', {
        url: "/chat",
        views: {
          'menuContent': {
            templateUrl: "templates/premium1/chat.html"
          }
        }
      })

      .state('premiumappOne.trips', {
        url: "/trips",
        views: {
          'menuContent': {
            templateUrl: "app/trips/trips-list.html",
            controller: "TripsListCtrl"
          }
        }
      })

      .state('premiumappOne.matched', {
        url: "/matched",
        views: {
          'menuContent': {
            templateUrl: "app/matched/matched.html",
            controller: "MatchedCtrl"
          }
        }
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/appPremiumOne/walkthrough');
    // $urlRouterProvider.otherwise('/app/tinder-one');
  });
