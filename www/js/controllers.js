angular.module('starter.controllers', ['ngSanitize'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})


.controller('WalkthroughCtrl', function($scope, $state, $ionicSlideBoxDelegate) {

  $scope.slideIndex = 0;
  $scope.slideCount = 3;  //$ionicSlideBoxDelegate.slidesCount() currently returns underfined. Looking into this
  $scope.slideCount = $scope.slideCount - 1;

  $scope.leftButton = {
    text: 'Previous',
    show: false,
    tapFxn: function(e){
      // console.log('Tap Function Activated');
      $scope.previous();
    }
  }

  $scope.rightButton = {
    text: 'Next',
    show: true,
    tapFxn: function(e){
      // console.log('Tap Function Activated');
      $scope.next();
    }
  }
 
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('premiumappOne.cardSwipe');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
    console.log($scope.slideIndex);
    // In between first and last slide
    if($scope.slideIndex > 0)
    {
      $scope.leftButton.show = true;
      $scope.rightButton.show = true;
      $scope.rightButton.text = 'Next';
      $scope.rightButton.tapFxn = function(){
        $scope.next();
      }
    }

    if($scope.slideIndex < 1)
    {
      $scope.leftButton.show = false;
      $scope.rightButton.show = true;
    }

    if($scope.slideIndex == $scope.slideCount)
    {
      console.log('last slide');
      $scope.rightButton.text = 'Go to App';

      $scope.rightButton.tapFxn = function(){
        console.log('function to launch app success!!!');
        $scope.startApp();
      }
    }

  };
})


.controller('StaticTinderProfileCtrl', function($scope, $stateParams){

  $scope.profileDetails =  {
        image: 'img/demo/tinder-full-pic.jpg',
        title: 'Tyler Myles',
        location: 'Manchester',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        vipStatus: false,
        sliderImages: [
            'img/demo/tinder-full-pic-2.jpg',
            'img/demo/tinder-full-pic-3.jpg',
            'img/demo/tinder-full-pic-4.jpg'
        ]
      }
  
  console.log($scope.profileDetails);
})


.controller('TinderProfileCtrl', function($scope, ApiClient, LoaderService, $stateParams){

  // Run the LoaderService ("Loading....")
  LoaderService.show()

  $scope.profileID = $stateParams.profileID;
  console.log('profileID is = '+$scope.profileID);
  $scope.ajaxRequest = ApiClient.ProfileDetails.get({profileID : $scope.profileID });
  $scope.ajaxRequest.$promise.then(function(){
    // If API Call is successful
    LoaderService.hide();
    $scope.profileDetails = $scope.ajaxRequest;
  },
    //If API call fails
  function(){
              var ErrorMessage = 'Api Call not successful. Check your apiBaseUrl (www/api-client/services/card-api-service.js) or ensure your proxy is well configured';
              console.error(ErrorMessage);
              LoaderService.errorLoading('Something went wrong. Please try again later');

              //Set Deck to empty to enable the user reload the cards
              $scope.deckIsEmpty = true;
          }

  )
  
})

.controller('StaticCardsCtrl', function($scope, ApiClient, LoaderService) {
  console.log('CARDS CTRL Initiated');

  // Static JSON Data to test.
   var cardTypes = [
    { 
      image: 'img/demo/tinder-full-pic.jpg',
      title: 'Samantha Gamblesx', location: 'Manchester', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      vipStatus : false,
      profileID: '1'
    },
    { 
      image: 'img/demo/tinder-full-pic-2.jpg', 
      title: 'Junior Max', location: 'Manchester', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      vipStatus : true,
      profileID: '2'
    },
    { 
      image: 'img/demo/tinder-full-pic-3.jpg', 
      title: 'Karla Valentine', location: 'Manchester', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      vipStatus : true,
      profileID: '3'
    }
  ];

  $scope.cardsControl = {};
  
  //Reloading the cards.
  $scope.reload = function() {

     console.log(cardTypes);

            $scope.cards = Array.prototype.slice.call(cardTypes, 0);

            //we'll need to have a counter for the cards deck
            $scope.cardCounter = $scope.cards.length;

            //we'll need a variable to tell us if the deck is empty or full. since we're reloading, default is false
            $scope.deckIsEmpty = false;

            //we'll clone our $scope.cards for our own custom functions (like counting and exposing card data)
            $scope.cardDataArray = $scope.cards.slice(0);

            //If a card is swyped, its details will always be here. if we are resetting/updating the stack, 
            // this variable will be reset. refer to the $scope.exposeSwypedCard function
            $scope.swypedCard = null;

            // debug data
            console.log('cards in deck: '+$scope.cards.length);

  }

  $scope.exposeSwypedCard = function() {
    //since a card has been removed from deck, reduce counter by 1 
    //we're doing this to balance the 0-notation of arrays vs the array.lenght
    $scope.cardCounter -= 1;

    //if deck is empty set variable to true
    if ($scope.cardCounter === 0){
      $scope.deckIsEmpty = true;
      console.log('deck is empty!');
    }
    

    //we'll use the cardCounter as the index in our cloned array for that card's data
    $scope.swypedCard = $scope.cardDataArray[$scope.cardCounter];


    //output to console. use to your preference (return it or use the $scope.swypedCard variable itself)
    console.log($scope.swypedCard);
  }

  //Takes out the swiped card data from the original array $scope.cards
  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  };
  
  // On tapping the accept function - triggers the $scope.cardSwipedRight() function
  $scope.yesClick = function() {
    $scope.cardsControl.swipeRight();
  };
  
  // On tapping the reject function triggers the $scope.cardSwipedLeft () function
  $scope.noClick = function() {
    $scope.cardsControl.swipeLeft();
  };
  
  //Callback Function on swiping to the left
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.exposeSwypedCard();  
  };
  
  //Callback Function on swiping to the right
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.exposeSwypedCard();
  };
  
  $scope.reload()
})

.controller('AjaxCardsCtrl', function($scope, ApiClient, LoaderService) {
  console.log('CARDS CTRL Initiated');

  $scope.cardsControl = {};
  //we'll need a variable to tell us if the deck is empty or full. Default is false
  // $scope.deckIsEmpty = false;
  
  //Reloading the cards.
  $scope.reload = function() {

      // Run the LoaderService ("Loading....")
      LoaderService.show()

      //We're making an ajax request to an endpoint giving us the json.
      //Refer to www/api-client/services/card-api-servie.js
      $scope.ajaxRequest = ApiClient.CardStack.query();

      // If promise is successful, attach json to cardTypes variable
        $scope.ajaxRequest.$promise.then(function(){
              // Function for successful api call
              // End the LoaderService
              LoaderService.hide();
              cardTypes = $scope.ajaxRequest;
              console.log(cardTypes);

              $scope.cards = Array.prototype.slice.call(cardTypes, 0);

              //we'll need to have a counter for the cards deck
              $scope.cardCounter = $scope.cards.length;

              //we'll need a variable to tell us if the deck is empty or full. since we're reloading, default is false
              // $scope.deckIsEmpty = false;

              //we'll clone our $scope.cards for our own custom functions (like counting and exposing card data)
              $scope.cardDataArray = $scope.cards.slice(0);

              //If a card is swyped, its details will always be here. if we are resetting/updating the stack, 
              // this variable will be reset. refer to the $scope.exposeSwypedCard function
              $scope.swypedCard = null;

              // debug data
              console.log('cards in deck: '+$scope.cards.length);
              
          },
          // Function for error handling
          function(){
              var ErrorMessage = 'Api Call not successful. Check your apiBaseUrl (www/api-client/services/card-api-service.js) or ensure your proxy is well configured';
              console.error(ErrorMessage);
              LoaderService.errorLoading('Something went wrong. Please try again later');

              //Set Deck to empty to enable the user reload the cards
              $scope.deckIsEmpty = true;
          }
        )

  }

  $scope.exposeSwypedCard = function() {
    //since a card has been removed from deck, reduce counter by 1 
    //we're doing this to balance the 0-notation of arrays vs the array.lenght
    $scope.cardCounter -= 1;

    //if deck is empty set variable to true
    if ($scope.cardCounter === 0){
      $scope.deckIsEmpty = true;
      console.log('deck is empty!');
    }
    

    //we'll use the cardCounter as the index in our cloned array for that card's data
    $scope.swypedCard = $scope.cardDataArray[$scope.cardCounter];


    //output to console. use to your preference (return it or use the $scope.swypedCard variable itself)
    console.log($scope.swypedCard);
  }

  //Takes out the swiped card data from the original array $scope.cards
  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  };
  
  // On tapping the accept function - triggers the $scope.cardSwipedRight() function
  $scope.yesClick = function() {
    $scope.cardsControl.swipeRight();
  };
  
  // On tapping the reject function triggers the $scope.cardSwipedLeft () function
  $scope.noClick = function() {
    $scope.cardsControl.swipeLeft();
  };
  
  //Callback Function on swiping to the left
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.exposeSwypedCard();  
  };
  
  //Callback Function on swiping to the right
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.exposeSwypedCard();
  };
  
  $scope.reload()
})

.controller('LocalJSONCtrl', function($scope, ApiClient, LoaderService) {
  console.log('Local JSON CARDS CTRL Initiated. Pulling data from www/json');

  $scope.cardsControl = {};
  //we'll need a variable to tell us if the deck is empty or full. Default is false
  // $scope.deckIsEmpty = false;
  
  //Reloading the cards.
  $scope.reload = function() {

      // Run the LoaderService ("Loading....")
      LoaderService.show()

      //We're making an ajax request to an endpoint giving us the json.
      //Refer to www/api-client/services/card-api-servie.js
      $scope.ajaxRequest = ApiClient.LocalJSONCards.query();

      // If promise is successful, attach json to cardTypes variable
        $scope.ajaxRequest.$promise.then(function(){
              // Function for successful api call
              // End the LoaderService
              LoaderService.hide();
              cardTypes = $scope.ajaxRequest;
              console.log(cardTypes);

              $scope.cards = Array.prototype.slice.call(cardTypes, 0);

              //we'll need to have a counter for the cards deck
              $scope.cardCounter = $scope.cards.length;

              //we'll need a variable to tell us if the deck is empty or full. since we're reloading, default is false
              // $scope.deckIsEmpty = false;

              //we'll clone our $scope.cards for our own custom functions (like counting and exposing card data)
              $scope.cardDataArray = $scope.cards.slice(0);

              //If a card is swyped, its details will always be here. if we are resetting/updating the stack, 
              // this variable will be reset. refer to the $scope.exposeSwypedCard function
              $scope.swypedCard = null;

              // debug data
              console.log('cards in deck: '+$scope.cards.length);
              
          },
          // Function for error handling
          function(){
              // var ErrorMessage = 'Api Call not successful. Check your apiBaseUrl (www/api-client/services/card-api-service.js) or ensure your proxy is well configured';
              // console.error(ErrorMessage);
              LoaderService.errorLoading('Something went wrong. Please try again later');

              //Set Deck to empty to enable the user reload the cards
              $scope.deckIsEmpty = true;
          }
        )

  }

  $scope.exposeSwypedCard = function() {
    //since a card has been removed from deck, reduce counter by 1 
    //we're doing this to balance the 0-notation of arrays vs the array.lenght
    $scope.cardCounter -= 1;

    //if deck is empty set variable to true
    if ($scope.cardCounter === 0){
      $scope.deckIsEmpty = true;
      console.log('deck is empty!');
    }
    

    //we'll use the cardCounter as the index in our cloned array for that card's data
    $scope.swypedCard = $scope.cardDataArray[$scope.cardCounter];


    //output to console. use to your preference (return it or use the $scope.swypedCard variable itself)
    console.log($scope.swypedCard);
  }

  //Takes out the swiped card data from the original array $scope.cards
  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  };
  
  // On tapping the accept function - triggers the $scope.cardSwipedRight() function
  $scope.yesClick = function() {
    $scope.cardsControl.swipeRight();
  };
  
  // On tapping the reject function triggers the $scope.cardSwipedLeft () function
  $scope.noClick = function() {
    $scope.cardsControl.swipeLeft();
  };
  
  //Callback Function on swiping to the left
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.exposeSwypedCard();  
  };
  
  //Callback Function on swiping to the right
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.exposeSwypedCard();
  };
  
  $scope.reload()
})