meals.controller('meal-form', function($scope, $http, $timeout) {
  $scope.selectedIngredients = [];
  $scope.mealTimes = [];
  $scope.sections = ["breakfast", "lunch", "noon", "dinner", "evening"];
  $scope.ingredients = {
    "breakfast": [],
    "lunch": [],
    "noon": [],
    "dinner": [],
    "evening": []
  }
  $scope.selectedSection = "";
  $scope.searchQuery = "";

  $scope.searchIngredients = function() {
    $http.get('https://stag.mobrise.us/ingredients/search?name=' + $scope.searchQuery).then(function({data}) {
      $scope.fetchedIngredients = data;
    });
  }

  $scope.ingredientsChanged = function() {
    
  }

  $('#ingredientModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var section = button.data('section');
    $timeout(function(){
      $scope.selectedSection = section;
    });
  })

  $scope.addIngredient = function(ingredient, section) {
    $timeout(function() {
      $scope.ingredients[section] = $scope.ingredients[section].concat(ingredient);
      $('#ingredientModal').modal('hide');
    })
  }

  $scope.createMeal = function() {
    $http.post('https://stag.mobrise.us/meals' + $scope.searchQuery, {
      "meals": $scope.sections.map(function(item) {
        return {
          "ingredients": $scope.ingredients[item].map(function(ing) {
            return {
              "amount": 1,
              "id": ing.id,
              "measurement": "cups"
            }
          }),
          "name": item.toUpperCase(),
          "recipe": null
        }
      }),
      "name": $scope.name,
      "range": {
        "lower": parseInt($scope.range),
        "upper": parseInt($scope.range)
      } ,
      "target": $scope.target
    }).then(function({data}) {
      $timeout(function() {
        $scope.ingredients = {
          "breakfast": [],
          "lunch": [],
          "noon": [],
          "dinner": [],
          "evening": []
        }
        $scope.selectedSection = "";
        $scope.searchQuery = "";
        $scope.name = "";
        $scope.target = "";
        $scope.range = "";
        $scope.status = {
          message: data.inserted > 0 ? 'Succesfully added new ingredient type.' + data.generated_keys.join(', ') : 'Failed to create ingredient type.',
          status: data.inserted > 0 ? 'alert-success' : 'alert-danger'
        }
      })
    });
  }

  $http.get('https://stag.mobrise.us/ingredients/search?name=' + $scope.searchQuery).then(function({data}) {
    $scope.fetchedIngredients = data;
  });
})