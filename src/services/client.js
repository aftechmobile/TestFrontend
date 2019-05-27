const baseUrl = "https://api.mobrise.us";

function get_request(url, callable, data) {
  if (data) {
    var req = data
    return callable.post(url, req);
  } else {
    var req = {
      json: true,
      headers: {
        'Accept': 'application/json'
      }
    }
    return callable.get(url, req);
  }
}

app.service('Client', function() {

  const scope = {};

  scope.findPatientWithQuery = function(query, callable) {
    const params = Object.keys(query).map(x => x + "=" + query[x]).join('&')
    const url_query = `/patients?${params}`;
    const url = baseUrl + url_query;
    return get_request(url, callable)
  }

  scope.getPatientDetail = function(id, callable) {
    const url_query = '/patients/' + id;
    const url = baseUrl + url_query;
    return get_request(url, callable)
  }

  scope.upload = function(data, callable) {
    const url_query = '/upload';
    const url = baseUrl + url_query;
    return get_request(url, callable, data)
  }

  scope.findPatientWithName = function(given, family, callable) {
    const query = `/Patient?given=${given}&family=${family}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getPatientWithId = function(id) {
    const query = `/Patient/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getAllergyIntolerance = function(id, callable) {
    const query = `/AllergyIntolerance?patient=${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getAllergyIntoleranceById = function(id, callable) {
    const query = `/AllergyIntolerance/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.findPractitionerWithId = function(id) {
    const query = `/Practitioner/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getMedicationOrder = function(id, callable) {
    const query = `/MedicationOrder?patient=${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getMedicationOrderById = function(id, callable) {
    const query = `/MedicationOrder/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getMedicationStatement = function(id, callable) {
    const query = `/MedicationStatement?patient=${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getMedicationStatementById = function(id, callable) {
    const query = `/Medication/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getCondition = function(id, callable) {
    const query = `/Condition?patient=${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getConditionById = function(id, callable) {
    const query = `/Condition/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getObservation = function(id, callable) {
    const query = `/Observation?patient=${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getObservationById = function(id, callable) {
    const query = `/Observation/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getDiagnosticReport = function(id, callable) {
    const query = `/DiagnosticReport?patient=${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getDiagnosticReportById = function(id, callable) {
    const query = `/DiagnosticReport/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getImmunization = function(id, callable) {
    const query = `/Immunization?patient=${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getImmunizationById = function(id, callable) {
    const query = `/Immunization/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getProcedure = function(id, callable) {
    const query = `/Procedure?patient=${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getProcedureById = function(id, callable) {
    const query = `/Procedure/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getDevices = function(id, callable) {
    const query = `/Device?patient=${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getDeviceById = function(id, callable) {
    const query = `/Device/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getDocumentReference = function(id, callable) {
    const query = `/DocumentReference?patient=${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getDocumentReferenceById = function(id, callable) {
    const query = `/DocumentReference/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getDocumentReferenceBinary = function(id, callable) {
    const query = `/Binary/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getCarePlan = function(id, callable) {
    const query = `/CarePlan?patient=${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getCarePlanById = function(id, callable) {
    const query = `/CarePlan/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getGoal = function(id, callable) {
    const query = `/Goal?patient=${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  scope.getGoalById = function(id, callable) {
    const query = `/Goal/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  return scope;

})
