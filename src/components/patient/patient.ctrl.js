// import { MDCTabBar } from '@material/tab-bar';
// import {MDCTextField} from '@material/textfield';

var tests = [];
var keys = [];
var dates = [];
var chart = {};

app.controller('PatientDetailController', function ($scope, $rootScope, $timeout, $element, $attrs, $http) {
  $scope.editingModal = {
    showing: false,
    body: 'Edit your desired fields and hit save.',
    onConfirm: () => {
      $http.put('/patients/' + $scope.patient.id, $scope.patient).then(function(res) {
        $timeout(function() {
          $scope.editingModal.showing = false
          $rootScope.updateSidebar();
        });
      });
    },
    onCancel: () => {
      $timeout(function() {
        $scope.editingModal.showing = false
      })
    }
  }

  $scope.patientKeys = [];

  $rootScope.$watch('selectedElement', function(newValue, oldValue) {
    $rootScope.selectedElement = undefined;
    if (newValue != undefined) {
      $rootScope.loadingDialog = false;
      $rootScope.selectedPatient = newValue;
    }
  });

  $scope.edit = function(patient) {
    $timeout(function() {
      $scope.patientKeys = Object.keys(patient || {});
      $scope.editingModal.showing = true
      $scope.editingModal.title = `${$scope.selectedPatient.first_name} ${$scope.selectedPatient.last_name}`
      $timeout(function() {
        const arr = Array.from(document.querySelectorAll('.mdc-text-field'));
        arr.forEach(el => {
          const textField = new MDCTextField(el);
        });
      });
    })
  }

  $scope.delete = function(patient) {
    $rootScope.dialog.showing = true;
    $rootScope.dialog.body = 'Are you sure you want to delete this patient?';
    $rootScope.dialog.onConfirm = function() {
      $http.delete('/patients/' + $scope.patient.id, {}).then(function(result) {
        $timeout(function() {
          location.reload();
        });
      });
    }
  }

  $scope.valueFor = function(key) {
    return $scope.patient[key];
  }

  $scope.onValueChanged = function(key) {
    $scope.tempPatient[key] = $scope._key;
    console.log($scope.tempPatient);
  }
});

function handleTabChange(name_var) {
  const name = name_var.split(' ').join('_')
  const index = keys.indexOf(name);
  if (index < 0) {
    return
  }

  const values = tests.map(x=> {
    const value = x[keys[index]]
    return value
  })

  var data = {
    labels: dates,
    series: [
      {
        data: values
      }
    ]
  };

  chart.update(data)
}

function setupChart(data, dates) {
  console.log(dates);
  /* Add a basic data series with six labels and values */
  var data = {
    labels: dates,
    series: [
      {
        data: data
      }
    ]
  };

  /* Set some base options (settings will override the default settings in Chartist.js *see default settings*). We are adding a basic label interpolation function for the xAxis labels. */
  var options = {
    axisX: {
      labelInterpolationFnc: function(value) {
        return value;
      }
    }
  };

  /* Now we can specify multiple responsive settings that will override the base settings based on order and if the media queries match. In this example we are changing the visibility of dots and lines as well as use different label interpolations for space reasons. */
  var responsiveOptions = [
    ['screen and (min-width: 641px) and (max-width: 1024px)', {
      showPoint: false,
      axisX: {
        labelInterpolationFnc: function(value) {
          return 'Week ' + value;
        }
      }
    }],
    ['screen and (max-width: 640px)', {
      showLine: false,
      axisX: {
        labelInterpolationFnc: function(value) {
          return 'W' + value;
        }
      }
    }]
  ];

  /* Initialize the chart with the above settings */
  chart = new Chartist.Bar('#chart-data', data, options, responsiveOptions);
}
