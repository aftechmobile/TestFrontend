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

  // $scope.create = function() {
  //   $http.post('http://192.168.1.3:3001/ingredients/types/' + $scope.searchQuery).then(function({data}) {
  //     $timeout(function() {
  //       $scope.types = data
  //     })
  //   })
  // }
})