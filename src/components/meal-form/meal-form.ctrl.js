meals.controller('meal-form', function($scope, $http, $timeout) {
  $scope.selectedIngredients = [];
  $scope.mealTimes = [];

  $scope.searchIngredients = function() {
    alert('lkjsdf');
    $http.get('https://stag.mobrise.us/ingredients/search?name=' + $scope.searchQuery).then(function({data}) {
      $scope.ingredients = $scope.selectedIngredients.concat(data);
    });
  }

  $scope.ingredientsChanged = function() {

  }
})