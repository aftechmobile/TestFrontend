app.controller('AlertController', function($scope, $timeout, $rootScope, $http, Alert) {
  Alert.registerObserver(function(value) {
    $timeout(function() {
      $scope.dialog = value.dialog;
    });
  });
});
