meals.controller('meal-form', function($scope, $http, $timeout) {
  $scope.selectedIngredients = [];
  $scope.mealTimes = [];

  $scope.searchIngredients = function() {
    alert('lkjsdf');
    $http.get('http://192.168.1.3:3001/ingredients/search?name=' + $scope.searchQuery).then(function({data}) {
      $scope.ingredients = $scope.selectedIngredients.concat(data);
    });
  }

  $scope.ingredientsChanged = function() {

  }
})