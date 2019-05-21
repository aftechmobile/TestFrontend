import angular from 'angular';
const app = window.app;

app.controller('DialogController', function($scope, $timeout, $rootScope, $http) {
  const onCancelRoot = function() {
    $rootScope.dialog.onCancel();
    $rootScope.dialog.showing = false;
  }
  const onConfirmRoot = function() {
    $rootScope.dialog.onConfirm();
    $rootScope.dialog.showing = false;
  }
  $rootScope.dialog = {
    title: 'Patients',
    body: '',
    showing: false,
    onCancelRoot,
    onConfirmRoot,
    onCancel: function() {},
    onConfirm: function() {},
  }

  const onCancelUploadRoot = function() {
    $rootScope.uploadDialog.onCancel();
    $rootScope.uploadDialog.showing = false;
  }
  const onConfirmUploadRoot = function(data, type) {
    $rootScope.uploadDialog.onConfirm();
    $http.post('/upload', {
      data,
      type
    }, {}).then((data) => {
      $timeout(function() {
        $rootScope.uploadDialog.showing = false;
        $scope.testUpload = undefined;
        $scope.patientUpload = undefined;
        if (data.data.success) {
          location.reload();
        }
      })
    })
  }
  $rootScope.uploadDialog = {
    title: 'Patients',
    body: 'Please select the files you wish to upload.',
    showing: false,
    onCancelRoot: onCancelUploadRoot,
    onConfirmRoot: onConfirmUploadRoot,
    onCancel: function() {},
    onConfirm: function() {},
  }

  $rootScope.loadingDialog = {
    showing: false
  }
});
