meals.controller('type-form', function() {
  $scope.create = function() {
    $selectedType = null;
    $http.post('http://192.168.1.3:3001/ingredients/types', {
      name: $scope.name,
      carb_conversion_id: $scope.selectedType.id
    }).then(function({data}) {
      $timeout(function() {
        $scope.name = '';
        $scope.selectedType = null;
        $scope.status = {
          message: data.inserted > 0 ? 'Succesfully added new ingredient.' : 'Failed to create ingredient.',
          status: data.inserted > 0 ? 'alert-success' : 'alert-danger'
        }
      })
    })
  }
})