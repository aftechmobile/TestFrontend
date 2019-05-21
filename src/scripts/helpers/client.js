const baseUrl = "https://open-ic.epic.com/FHIR/api/FHIR/DSTU2";

export default class Client {
  static findPatientWithName(given, family, callable) {
    const query = `/Patient?given=${given}&family=${family}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getPatientWithId(id) {
    const query = `/Patient/${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static findPatientWithQuery(query) {
    const params = Object.keys(query).map(x => x + "=" + query[x]).join('&')
    const url_query = `/Patient?${params}`;
    const url = baseUrl + url_query;
    return callable.get(url, {})
  }

  static getAllergyIntolerance(id, callable) {
    const query = `/AllergyIntolerance?patient=${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getAllergyIntoleranceById(id, callable) {
    const query = `/AllergyIntolerance/${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static findPractitionerWithId(id) {
    const query = `/Practitioner/${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getMedicationOrder(id, callable) {
    const query = `/MedicationOrder?patient=${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getMedicationOrderById(id, callable) {
    const query = `/MedicationOrder/${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getMedicationStatement(id, callable) {
    const query = `/MedicationStatement?patient=${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getMedicationStatementById(id, callable) {
    const query = `/Medication/${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getCondition(id, callable) {
    const query = `/Condition?patient=${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getConditionById(id, callable) {
    const query = `/Condition/${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getObservation(id, callable) {
    const query = `/Observation?patient=${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getObservationById(id, callable) {
    const query = `/Observation/${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getDiagnosticReport(id, callable) {
    const query = `/DiagnosticReport?patient=${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getDiagnosticReportById(id, callable) {
    const query = `/DiagnosticReport/${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getImmunization(id, callable) {
    const query = `/Immunization?patient=${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getImmunizationById(id, callable) {
    const query = `/Immunization/${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getProcedure(id, callable) {
    const query = `/Procedure?patient=${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getProcedureById(id, callable) {
    const query = `/Procedure/${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getDevices(id, callable) {
    const query = `/Device?patient=${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getDeviceById(id, callable) {
    const query = `/Device/${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getDocumentReference(id, callable) {
    const query = `/DocumentReference?patient=${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getDocumentReferenceById(id, callable) {
    const query = `/DocumentReference/${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getDocumentReferenceBinary(id, callable) {
    const query = `/Binary/${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getCarePlan(id, callable) {
    const query = `/CarePlan?patient=${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getCarePlanById(id, callable) {
    const query = `/CarePlan/${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getGoal(id, callable) {
    const query = `/Goal?patient=${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }

  static getGoalById(id, callable) {
    const query = `/Goal/${id}`;
    const url = baseUrl + query;
    return callable.get(url, {})
  }
}
