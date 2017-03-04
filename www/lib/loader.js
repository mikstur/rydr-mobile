angular.module('starter.loaders', [])
.factory('LoaderService', function($ionicLoading){
  return {
    show: function(){
    console.log('Loader Activated (www/api-shared/loader.js)');
      $ionicLoading.show({
        template: 'Loading...'
      });
    },
    showFromTemplateUrl: function(templateUrl){
      if(templateUrl == null)
      {
        templateUrl = "api-client-wordpress/templates/loading-with-spinner.html";
      }
      $ionicLoading.show({
        templateUrl: templateUrl
      });
    },
    hide: function(){
      $ionicLoading.hide();
      console.log('Loader Deactivated');
    },
    errorLoading : function(CustomMsg) {
       if(CustomMsg == '')
       {
         $ionicLoading.show({
            template: 'Error Loading. Please try again'
          });
       }
       else
       {
          $ionicLoading.show({
            template: CustomMsg
          });
       }

      setTimeout(function(){
        $ionicLoading.hide();
      }, 2500);
    }
  }
})