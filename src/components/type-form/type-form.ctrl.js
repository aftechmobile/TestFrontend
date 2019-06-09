meals.controller('type-form', function($scope, $http, $timeout) {
  $timeout(function() {
    $http.get('http://192.168.1.3:3001/ingredients/types/conversion').then(function({data}) {
      $scope.conversionTypes = data
      $scope.selectedType = data[0];
    });
  })

  $scope.create = function() {
    $scope.selectedType = $scope.conversionTypes[document.getElementById('typeSelect').selectedIndex];
    $http.post('http://192.168.1.3:3001/ingredients/types', {
      name: $scope.name,
      carb_conversion_id: $scope.selectedType.id
    }).then(function({data}) {
      $timeout(function() {
        $scope.name = '';
        $scope.selectedType = null;
        $scope.status = {
          message: data.inserted > 0 ? 'Succesfully added new ingredient type.' + data.generated_keys.join(', ') : 'Failed to create ingredient type.',
          status: data.inserted > 0 ? 'alert-success' : 'alert-danger'
        }
      });
    })
  }
})