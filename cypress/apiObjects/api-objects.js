/// <reference types="cypress" />
const baseURL = "http://localhost:8080";
const devices = "devices";
const disconnect = "disconnect";
const connect = "connect";
const brightness = "brightness";
const state = "state";
const color = "color";
const name = "name";

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

export function deviceState(deviceip) {
  cy.request({
    method: "GET",
    url: `${baseURL}/${state}`,
  }).then(function (response) {
    expect(response.status).to.equal(200);
    expect(response.body).to.have.string(deviceip);
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
