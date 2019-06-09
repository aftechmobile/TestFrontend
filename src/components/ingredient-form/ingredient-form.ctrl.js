meals.controller('ingredient-form', function($scope, $http, $timeout) {
  $scope.ingredientTypes = [];
  $scope.selectedType = null;
  $http.get('https://stag.mobrise.us/ingredients/types/').then(function({data}) {
    $timeout(function() {
      $scope.ingredientTypes = data
      $scope.selectedType = data[0];
    })
  })

  $scope.setType = function(type) {
    $timeout(function() {
      $scope.selectedType = type;
    })
  }

  $scope.create = function() {
    $scope.selectedType = $scope.ingredientTypes[document.getElementById('typeSelect').selectedIndex];
    var carbs = parseInt($scope.carbs);
    if (isNaN(carbs)) {
      carbs = 0
    }

    const requestData = {
      carbs,
      cups: 1,
      oz: 8,
      tbsp: 16,
      isWhole: $scope.isWhole,
      name: $scope.name,
      type_id: $scope.selectedType.id
    }

    if (
      !carbs ||
      !cups ||
      !oz ||
      !tbsp ||
      !isWhole ||
      !name ||
      !type_id
    ) {
      $timeout(function() {
        $scope.status = {
          message: 'Please check the information provided and try again.',
          status: 'alert-danger'
        }
      });
      return;
    }

    $http.post('https://stag.mobrise.us/ingredients/', requestData).then(function({data}) {
      $timeout(function() {
        $scope.isWhole = false;
        $scope.name = '';
        $scope.selectedType = null;
        $scope.carbs = 0;
        $scope.searchQuery = '';
        $scope.types = [];
        $scope.status = {
          message: data.inserted > 0 ? 'Succesfully added new ingredient. ' + data.generated_keys.join(', ') : 'Failed to create ingredient.',
          status: data.inserted > 0 ? 'alert-success' : 'alert-danger'
        }
      })
    })
  }
})