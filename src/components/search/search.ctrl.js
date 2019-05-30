function searchPatient(searchable, Client, callable, cb) {
  const search = searchable;
  const given = search[0] || "";
  const family = search[1] || "";
  Client.findPatientWithQuery({ given, family }, callable).then(function(response) {
    cb(response)
  }).catch(function(error) {
    cb(null, error);
  });
}

app.controller('SearchController', function($scope, $timeout, $rootScope, $http, Alert, Client, DataStore) {
  function handlePatientsResponse(response, error, initial) {
    const search = "";
    try {
      search = $scope.search.split(' ');
    } catch(error) {
      
    }

    if (error) {
      Alert.show({
        title: 'Patients',
        body: `No data available for search (${search}).`,
        showing: true,
        hasActions: true,
        confirmation_title: 'Continue',
        onConfirm: function() {
          Alert.hide();
        }
      });
    } else {
      const data = response.data;
      if (data.patients.length > 0) {
        $timeout(function() {
          DataStore.patients = data.patients;
          DataStore.searching = initial && true;
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
            Alert.hide();
          }
        });
      }
    }
  }


  $scope.placeholder = "Search"
  $scope.searchChanged = function(event) {
    if (!$scope.search || $scope.search == '') {
      Client.findPatientWithQuery({ }, $http).then(function(response) {
        handlePatientsResponse(response);
      }).catch(function(error) {
        handlePatientsResponse(null, error);
      });
      return;
    }
    
    if (event.keyCode != 13) { return; }
    const search = $scope.search.split(' ');

    if (search.length < 2) {
      Alert.show({
        title: 'Patients',
        body: 'Please use first name and last name for your search',
        showing: true,
        hasActions: true,
        confirmation_title: 'OK',
        onConfirm: function() {
          Alert.hide();
        }
      })
      return;
    }

    Alert.show({
      title: 'Loading',
      body: 'Please wait...',
      showing: true,
    }).then(function() {
      searchPatient(search, Client, $http, function(response, error) {
        handlePatientsResponse(response, error);
      });
    });
  };

  Client.findPatientWithQuery({ }, $http).then(function(response) {
    handlePatientsResponse(response, null, true);
  }).catch(function(error) {
    handlePatientsResponse(null, error, true);
  });

  const selector = document.querySelector('.mdc-text-field');
  this.searchField = new mdc.textField.MDCTextField(selector);
});
