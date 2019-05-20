import angular from 'angular';
import mdc from 'material-components-web';

const app = angular.module('app', []);
window.app = app;

app.directive("fileread", [function () {
  return {
      scope: {
          fileread: "="
      },
      link: function (scope, element, attributes) {
          element.bind("change", function (changeEvent) {
              var reader = new FileReader();
              reader.onload = function (loadEvent) {
                  scope.$apply(function () {
                      scope.fileread = loadEvent.target.result;
                  });
              }
              reader.readAsDataURL(changeEvent.target.files[0]);
          });
      }
  }
}]);

app.controller('MainController', function($scope, $rootScope) {
  $scope.selectedElement = {}
  $scope.showUploadModal = function showUploadModal() {
      $rootScope.uploadDialog.showing = true;
      $rootScope.$apply();
  };
});
