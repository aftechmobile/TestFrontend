function first(object, key, elseValue) {
  const value = object[key] && object[key][0] ? object[key][0] : elseValue;
  return value
}

app.controller('ListController', function($scope, $timeout, $rootScope, $http, Alert, DataStore) {
  DataStore.registerObserver(function() {
    const items = DataStore.patients || [];
    const data = items.map(function(item) {
      return {
        title: item.first_name + " " + item.last_name,
        subtitle: item.pcp,
        associatedObject: item
      }
    }).filter(function(item) {
      return item.title && item.subtitle
    });
    $scope.data = data;
    $scope.$apply();
  });

  $scope.itemFilter = function(item) {
    return true;
  }

  $scope.select = function(element) {
    $timeout(function() {
      Alert.showing = true;
      $rootScope.selectedElement = element;
    })
  }
});
