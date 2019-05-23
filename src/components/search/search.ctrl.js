function searchPatient(searchable, Client, callable, cb) {
  const search = searchable;
  const given = search[0] || "";
  const family = search[1] || "";
  Client.findPatientWithName(given, family, callable).then(function(response) {
    cb(response)
  });
}

app.controller('SearchController', function($scope, $timeout, $rootScope, $http, Alert, Client, DataStore) {
  $scope.placeholder = "Search"
  $scope.searchChanged = function(event) {
    if (event.keyCode != 13) { return; }
    const search = $scope.search.split(' ');
    Alert.show({
      title: 'Loading',
      body: 'Please wait...',
      showing: true,
    }).then(function() {
      searchPatient(search, Client, $http, function(response) {
        const data = response.data;
        if (data.total > 0) {
          $timeout(function() {
            DataStore.patients = response.data.entry;
            DataStore.notify();
            Alert.hide();
          });
        } else {
          Alert.show({
            title: 'Patients',
            body: `No data available for search (${search}).`,
            showing: true,
            hasActions: true,
            confirmation_title: 'Continue',
            onConfirm: function() {

            }
          });
        }
      });
    });
  };

  const selector = document.querySelector('.mdc-text-field');
  this.searchField = new mdc.textField.MDCTextField(selector);
});
