// Define a new module. We declare a dependency on the ngResource module, so we can work with the Instagram API
var app = angular.module('switchableGrid', ['ngResource']);

// Create and register the new "instagram" service
app.factory('instagram',['$resource', function($resource){

  return {
    fetchPopular: function(callback){

      // The ngResource module gives us the $resource service
      var api = $resource('https://api.instagram.com/v1/media/popular?client_id=:client_id&callback=JSON_CALLBACK',{
        client_id: '5c0b9265da4f4f76a7098c1b9ba90ad4'
      },{
        // This creates an action which we've chosen to name "fetch". It issues
        // an JSONP request to the URL of the resource. JSONP requires that the
        // callback=JSON_CALLBACK part is added to the URL.
        fetch:{method:'JSONP'}
      });

      api.fetch(function(response){

        // Call the supplied callback function
        callback(response.data);

      });
    }
  }

}]);

app.controller("SwitchableGridController",["$scope","instagram",function($scope,instagram){
  $scope.pics = [];

  // Use the instagram service and fetch a list of the popular pics
  instagram.fetchPopular(function(data){

    // Assigning the pics array will cause the view to be automatically redrawn by Angular.
    $scope.pics = data;
  });
}]);