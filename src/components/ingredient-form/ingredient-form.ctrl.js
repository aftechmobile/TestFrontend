meals.controller('ingredient-form', function($scope, $http, $timeout) {
  $scope.types = [];
  $scope.selectedType = null;
  $scope.search = function() {
    $http.get('http://192.168.1.3:3001/ingredients/types/search/' + $scope.searchQuery).then(function({data}) {
      $timeout(function() {
        $scope.types = data
      })
    })
  }

  $scope.setType = function(type) {
    $timeout(function() {
      $scope.selectedType = type;
    })
  }

  $scope.create = function() {
    var carbs = parseInt($scope.carbs);
    if (isNaN(carbs)) {
      carbs = 0
    }
    $http.post('http://192.168.1.3:3001/ingredients/', {
      carbs,
      cups: 1,
      oz: 8,
      tbsp: 16,
      isWhole: $scope.isWhole,
      name: $scope.name,
      type_id: $scope.selectedType.id
    }).then(function({data}) {
      $timeout(function() {
        $scope.isWhole = false;
        $scope.name = '';
        $scope.selectedType = null;
        $scope.carbs = 0;
        $scope.searchQuery = '';
        $scope.types = [];
        $scope.status = {
          message: data.inserted > 0 ? 'Succesfully added new ingredient.' : 'Failed to create ingredient.',
          status: data.inserted > 0 ? 'alert-success' : 'alert-danger'
        }
      })
    })
  }
})