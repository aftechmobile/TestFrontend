app.service('Alert', function() {

  var dialog = {
    title: 'Patients',
    body: '',
    showing: false,
    confirmation_title: '',
    cancel_title: '',
    onCancel: function(dialog) {},
    onConfirm: function(dialog) {},
    hasActions: false
  }

  var observerCallbacks = [];
  const registerObserver = function(callback){
    observerCallbacks.push(callback);
  };

  var notify = function(value){
    angular.forEach(observerCallbacks, function(callback){
      callback(value);
    });
  };

  var show = function(options) {
    return new Promise(function (resolve, reject) {
      this.dialog = Object.assign({}, dialog, options);
      notify(this);
      resolve();
    });
  }

  var hide = function() {
    this.dialog = {
      title: 'Patients',
      body: '',
      showing: false,
      confirmation_title: '',
      cancel_title: '',
      onCancel: function() {},
      onConfirm: function() {},
      hasActions: false
    };
    notify(this);
  }

  return {
    hide,
    show,
    dialog,
    registerObserver,
    notify
  };

})
