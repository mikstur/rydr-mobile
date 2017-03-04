angular.module('starter.controllers')

.factory('ApiClient', ['$resource',
	function($resource){
		// Set the URL of the site that will serve our API.
		// ---------------------------------------------------------------------------
		// We're using a local proxy to circumvent the CORS problem: 
		// Read at http://blog.ionic.io/handling-cors-issues-in-ionic/
		// As for the proxy, refer to the ionic.project included in the zip root
		// ---------------------------------------------------------------------------
		// var apiBaseUrl = 'http://audacitus.com/tinderonic-json/';	//Demo Api JSON URL
		var apiBaseUrl = 'http://localhost:8100/api/';	//Needs a trailing slash
		// ---------------------------------------------------------------------------

		// Resource-to-endpoints. Change this to your preferrence. Refer to www/json for the expected structure
		return {
			CardStack: $resource(apiBaseUrl+'cardlist.php'),
			ProfileDetails: $resource(apiBaseUrl+'profile.php?profileID=:profileID', {profileID: '@profileID'}),
			LocalJSONCards: $resource('json/carsStack.json'),
		};
	}]);