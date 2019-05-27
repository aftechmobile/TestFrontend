app.controller('HeaderController', function($scope, $timeout, $rootScope, $http, Alert) {
  $rootScope.$watch('csv', function(newValue, oldValue, scope) {
    let type = $rootScope.uploadType;
    let data = newValue;

    if (!data) { return }

    $http.post('/upload', {
      type,
      data
    }).then(function(response) {
      const responseData = response.data
      console.log(responseData);
    })
  })

  $scope.chooseFile = function() {
    const patient = function(dialog) {
      Alert.hide();
      $rootScope.uploadType = "patients"
      document.getElementById('file-input').click();
    }

    const test = function(dialog) {
      Alert.hide();
      $rootScope.uploadType = "tests"
      document.getElementById('file-input').click();
    }

    Alert.show({
      title: 'Patients',
      body: "What kind of file do you wish to upload?",
      showing: true,
      hasActions: true,
      confirmation_title: 'Tests',
      cancel_title: 'Patients',
      onConfirm: test,
      onCancel: patient
    });
  }
});
