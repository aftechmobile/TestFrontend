const app = window.app;
import { MDCTabBar } from '@material/tab-bar';
import {MDCTextField} from '@material/textfield';
import Chartist from 'chartist';

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
      $http.get('/patients/' + newValue.id, {}).then(({data}) => {
        const patient = data.patient;
        delete patient.$$hashkey
        dates = data.tests.map(x=>x.date);
        tests = data.tests.map(x=>{
          delete x.date
          return x
        });
        $timeout(function() {
          $rootScope.loadingDialog = false;
          $rootScope.selectedPatient = patient;
          $scope.tempPatient = patient;
          keys = Object.keys(tests[0] || {});
          $rootScope.handleTabChange = handleTabChange;
          $rootScope.selectedPatientTestsKeys = keys.map(x=>x.split('_').join(' '));

          $timeout(function() {
            var selector = document.querySelector('.mdc-tab-bar');
            const tabBar = new MDCTabBar(selector);
            tabBar.activateTab(0);
            setupChart(tests.map(x=> {
              const value = x[keys[0]]
              return value
            }), dates);
          })
        })
      });
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
  chart = new Chartist.Line('#chart-data', data, options, responsiveOptions);
}
