/// <reference types="cypress" />
const baseURL = "http://localhost:8080";
const devices = "devices";
const disconnect = "disconnect";
const connect = "connect";
const brightness = "brightness";
const state = "state";
const color = "color";
const name = "name";
const serverServiceName = "Smarthomeservice";

/*
 * Start and Stop Server
 *  @param {string} To stop server service parameter should be "stop" and to start server service it should be "start"
 */
export function serverServiceStartStop(serviceParam) {
  cy.exec(`sc ${serviceParam} ${serverServiceName}`);
}

export function listDevices(callback) {
  let devices1;
  cy.request({
    method: "GET",
    url: `${baseURL}/${devices}`,
    failOnStatusCode: false,
  }).then(function (response) {
    if (typeof callback === "function") {
      if (response.status === 200) {
        callback(response);
      } else {
        let err = new Error(
          "Got error from devices with status code " + response.status
        );
        callback(null, err);
      }
    }
  });
}

export function disconnectDevice() {
  cy.request({
    method: "POST",
    url: `${baseURL}/${disconnect}`,
    body: {},
    headers: {
      "Content-type": "application/json",
    },
  }).then(function (response) {
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      success: true,
    });
  });
}

export function connectDevice(deviceIP, status) {
  cy.request({
    method: "POST",
    url: `${baseURL}/${connect}`,
    body: {
      ip: deviceIP,
    },
    headers: {
      "Content-type": "application/json",
    },
  }).then(function (response) {
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      success: status,
    });
  });
}

export function deviceState(deviceip, statetruefalse) {
  cy.request({
    method: "GET",
    url: `${baseURL}/${state}`,
  }).then(function (response) {
    expect(response.status).to.equal(200);
    if (statetruefalse) {
      expect(response.body).to.have.string(deviceip);
    } else {
      expect(response.body).to.not.have.string(deviceip);
    }
  });
}

export function updateDeviceName(newName, status) {
  cy.request({
    method: "POST",
    url: `${baseURL}/${name}`,
    body: {
      name: newName,
    },
    headers: {
      "Content-type": "application/json",
    },
  }).then(function (response) {
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      success: status,
    });
  });
}

export function updateDeviceBrightness(newbrightness, status) {
  cy.request({
    method: "POST",
    url: `${baseURL}/${brightness}`,
    body: {
      brightness: newbrightness,
    },
    headers: {
      "Content-type": "application/json",
    },
  }).then(function (response) {
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      success: status,
    });
  });
}

export function updateDeviceColor(newColor, status) {
  cy.request({
    method: "POST",
    url: `${baseURL}/${color}`,
    body: {
      color: newColor,
    },
    headers: {
      "Content-type": "application/json",
    },
  }).then(function (response) {
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      success: status,
    });
  });
}
