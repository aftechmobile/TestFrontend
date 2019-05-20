const app = window.app;

app.controller('PatientListController', function ($scope, $rootScope, $element, $attrs, $http, $timeout) {
  $http.get('/patients', {}).then(({ data }) => {
    $timeout(function() {
      $rootScope.loadingDialog = false;
      $scope.patients = data.patients;
    });
  })

  $scope.select = function(patient) {
    $timeout(function() {
      $rootScope.loadingDialog = true;
      $rootScope.selectedElement = patient;
    })
  }

  $rootScope.updateSidebar = function() {
    $http.get('/patients', {}).then(({ data }) => {
      $timeout(function() {
        $rootScope.loadingDialog = false;
        $scope.patients = data.patients;
      });
    })
  }
});
