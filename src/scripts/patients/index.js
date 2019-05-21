import Helpers from '../helpers/index.js';
import { MDCTextField } from '@material/textfield';
const app = window.app;

function searchPatient(searchable, callable, cb) {
  const search = searchable;
  const given = search[0] || "";
  const family = search[1] || "";
  Helpers.Client.findPatientWithName(given, family, callable).then(function(response) {
    cb(response)
  });
}

app.controller('PatientListController', function ($scope, $rootScope, $element, $attrs, $http, $timeout) {
  $scope.searchChanged = function() {
    const search = $scope.search.split(' ');
    searchPatient(search, $http, function(response) {
      const data = response.data;
      if (data.total > 0) {
        $timeout(function() {
          $rootScope.loadingDialog = false;
          $scope.patients = response.data.entry;
        });
      }
    })
  }

  $scope.patientFilter = function(patient) {
    return patient.resource.careProvider && true
  }

  $scope.select = function(patient) {
    $timeout(function() {
      $rootScope.loadingDialog = true;
      $rootScope.selectedElement = patient;
    })
  }

  $rootScope.updateSidebar = function() {
    const search = $scope.search.split(' ');
    searchPatient(search, $http, function(response) {
      const data = response.data;
      if (data.total > 0) {
        $timeout(function() {
          $rootScope.loadingDialog = false;
          $scope.patients = data.patients;
        });
      }
    })
  }

  const selector = document.querySelector('.mdc-text-field');
  const searchField = new MDCTextField(selector);
});
