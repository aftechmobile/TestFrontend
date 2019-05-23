app.service('DataStore', function() {

  var observerCallbacks = [];
  const registerObserver = function(callback){
    observerCallbacks.push(callback);
  };

  var notify = function(){
    angular.forEach(observerCallbacks, function(callback){
      callback();
    });
  };

  return {
    registerObserver,
    notify
  };

})
