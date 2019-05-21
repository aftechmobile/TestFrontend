const baseUrl = "https://open-ic.epic.com/FHIR/api/FHIR/DSTU2";

function get_request(url, callable) {
  var req = {
   headers: {
     'Accept': 'application/json'
   }
  }
  return callable.get(url, req);
}

export default class Client {
  static findPatientWithName(given, family, callable) {
    const query = `/Patient?given=${given}&family=${family}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getPatientWithId(id) {
    const query = `/Patient/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static findPatientWithQuery(query) {
    const params = Object.keys(query).map(x => x + "=" + query[x]).join('&')
    const url_query = `/Patient?${params}`;
    const url = baseUrl + url_query;
    return get_request(url, callable)
  }

  static getAllergyIntolerance(id, callable) {
    const query = `/AllergyIntolerance?patient=${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getAllergyIntoleranceById(id, callable) {
    const query = `/AllergyIntolerance/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static findPractitionerWithId(id) {
    const query = `/Practitioner/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getMedicationOrder(id, callable) {
    const query = `/MedicationOrder?patient=${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getMedicationOrderById(id, callable) {
    const query = `/MedicationOrder/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getMedicationStatement(id, callable) {
    const query = `/MedicationStatement?patient=${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getMedicationStatementById(id, callable) {
    const query = `/Medication/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getCondition(id, callable) {
    const query = `/Condition?patient=${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getConditionById(id, callable) {
    const query = `/Condition/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getObservation(id, callable) {
    const query = `/Observation?patient=${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getObservationById(id, callable) {
    const query = `/Observation/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getDiagnosticReport(id, callable) {
    const query = `/DiagnosticReport?patient=${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getDiagnosticReportById(id, callable) {
    const query = `/DiagnosticReport/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getImmunization(id, callable) {
    const query = `/Immunization?patient=${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getImmunizationById(id, callable) {
    const query = `/Immunization/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getProcedure(id, callable) {
    const query = `/Procedure?patient=${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getProcedureById(id, callable) {
    const query = `/Procedure/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getDevices(id, callable) {
    const query = `/Device?patient=${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getDeviceById(id, callable) {
    const query = `/Device/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getDocumentReference(id, callable) {
    const query = `/DocumentReference?patient=${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getDocumentReferenceById(id, callable) {
    const query = `/DocumentReference/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getDocumentReferenceBinary(id, callable) {
    const query = `/Binary/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getCarePlan(id, callable) {
    const query = `/CarePlan?patient=${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getCarePlanById(id, callable) {
    const query = `/CarePlan/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getGoal(id, callable) {
    const query = `/Goal?patient=${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }

  static getGoalById(id, callable) {
    const query = `/Goal/${id}`;
    const url = baseUrl + query;
    return get_request(url, callable)
  }
}
