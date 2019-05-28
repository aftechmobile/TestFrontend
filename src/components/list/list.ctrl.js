function first(object, key, elseValue) {
  const value = object[key] && object[key][0] ? object[key][0] : elseValue;
  return value
}

app.controller('ListController', function($scope, $timeout, $rootScope, $http, Alert, DataStore, Client) {
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
      if (DataStore.searching) {
        Alert.show({
          title: 'Patients',
          body: `Import successful.`,
          showing: true,
          hasActions: true,
          confirmation_title: 'Continue',
          onConfirm: function() {
            $timeout(function() {
              Client.findPatientWithQuery({ }, $http).then(function(response) {
                const data = response.data;
                if (data.patients.length > 0) {
                  $timeout(function() {
                    DataStore.patients = data.patients;
                    DataStore.searching = false;
                    DataStore.notify();
                    Alert.hide();
                  });
                } else {
                  Alert.show({
                    title: 'Patients',
                    body: `No data available for this search.`,
                    showing: true,
                    hasActions: true,
                    confirmation_title: 'Continue',
                    onConfirm: function() {
                      Alert.hide();
                    }
                  });
                }
              }).catch(function(error) {
    
              });
            });
          }
        });
      }
    })
  }
});
