app.controller('HeaderController', function($scope, $timeout, $rootScope, $http, Alert, Client) {
  $rootScope.$watch('csv', function(newValue, oldValue, scope) {
    let type = $rootScope.uploadType;
    let data = newValue;

    if (!data) { return }
    
    Client.upload({
      data, type
    }, $http).then(function(response) {
      const responseData = response.data
      console.log(responseData);
      
      Alert.show({
        title: 'Patients',
        body: 'Data upload successful',
        showing: true,
        hasActions: true,
        confirmation_title: 'OK',
        onConfirm: function() {
          location.reload();
        }
      });
    });
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
