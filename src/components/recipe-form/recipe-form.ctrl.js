meals.controller('meal-form', function($scope, $http, $timeout) {
  $scope.searchQuery = null;
  $scope.selectedIngredients = [];
  $scope.searchIngredients = function() {
    $http.get('https://stag.mobrise.us/ingredients/search?name=' + $scope.searchQuery).then(function({data}) {
      $scope.ingredients = $scope.selectedIngredients.concat(data);
    });
  }

  $scope.ingredientsChanged = function() {

  }
})