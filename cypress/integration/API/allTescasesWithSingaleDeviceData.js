/// <reference types="cypress" />
import {
  listDevices,
  disconnectDevice,
  connectDevice,
  deviceState,
  updateDeviceName,
  updateDeviceBrightness,
  updateDeviceColor,
  serverServiceStartStop,
} from "../../apiObjects/api-objects";
const ip = "192.168.100.11";
const ip2 = "192.168.100.10";
const newName = "newDevice";
const newbrightness = 4;
const newColor = "#336699";
describe("Device test", function () {
  before(() => {
    serverServiceStartStop("start");
  });
  it("List devices", function () {
    listDevices(function (data, error) {
      if (error) {
        console.log(error);
      } else {
        expect(data.status).to.equal(200);
        expect(data.body).to.have.string(ip);
        expect(data.body).to.have.string(ip2);
      }
    });
  });

  it("Connect to a device with valid ip", function () {
    disconnectDevice();
    connectDevice(ip, true);
  });

  it("Connect to a device with invalid ip", function () {
    disconnectDevice();
    connectDevice("192.199.111.11", false);
  });

  it("Get the state of a device", function () {
    disconnectDevice();
    connectDevice(ip, true);
    deviceState(ip, true);
  });

  it("Get the state of a device if device is not connected", function () {
    disconnectDevice();
    deviceState("false", true);
  });

  it("Update the name of a device when device is connected", function () {
    disconnectDevice();
    connectDevice(ip, true);
    updateDeviceName(newName, true);
    deviceState(newName, true);
  });

  it("Updated name should be persist after device disconnect and connect", function () {
    disconnectDevice();
    connectDevice(ip, true);
    updateDeviceName(newName, true);
    deviceState(newName, true);
    disconnectDevice();
    connectDevice(ip, true);
    deviceState(newName, true);
  });

  it("Update the name of a device when device is not connected", function () {
    disconnectDevice();
    updateDeviceName(newName, false);
  });

  it("Update the brightness of device when device is connected", function () {
    disconnectDevice();
    connectDevice(ip, true);
    updateDeviceBrightness(newbrightness, true);
    deviceState(newbrightness, true);
  });

  it("Update the brightness of device when device is not connected", function () {
    disconnectDevice();
    updateDeviceBrightness(newbrightness, false);
  });

  it("Updated brightness should be persist after device disconnect and connect", function () {
    disconnectDevice();
    connectDevice(ip, true);
    updateDeviceBrightness(newbrightness, true);
    deviceState(newbrightness, true);
    disconnectDevice();
    connectDevice(ip, true);
    deviceState(newbrightness, true);
  });

  it("Update the color of device when device is connected", function () {
    disconnectDevice();
    connectDevice(ip, true);
    updateDeviceColor(newColor, true);
    deviceState(newColor, true);
  });

  it("Update the color of device when device is not connected", function () {
    disconnectDevice();
    updateDeviceColor(newColor, false);
  });

  it("Updated color should be persist after device disconnect and connect", function () {
    disconnectDevice();
    connectDevice(ip, true);
    updateDeviceColor(newColor, true);
    deviceState(newColor, true);
    disconnectDevice();
    connectDevice(ip, true);
    deviceState(newColor, true);
  });

  it("Connect device when one device is already connected", function () {
    disconnectDevice();
    connectDevice(ip, true);
    connectDevice("192.168.100.10", false);
  });

  it("API behaviour when provided request input value as string for /brightness", function () {
    disconnectDevice();
    connectDevice(ip, true);
    updateDeviceBrightness(newName, false);
  });

  it("API behaviour when provided request input value as integer for /color", function () {
    disconnectDevice();
    connectDevice(ip, true);
    updateDeviceColor(newbrightness, false);
  });

  it("Device all parameters like name, brightness and color should be reset after server restart", function () {
    disconnectDevice();
    connectDevice(ip, true);
    updateDeviceColor(newColor, true);
    updateDeviceBrightness(newbrightness, true);
    updateDeviceName(newName, true);
    deviceState(newColor, true);
    deviceState(newbrightness, true);
    deviceState(newName, true);
    serverServiceStartStop("stop");
    cy.wait(2000);
    serverServiceStartStop("start");
    connectDevice(ip, true);
    deviceState(newColor, false);
    deviceState(newbrightness, false);
    deviceState(newName, false);
  });

  after(() => {
    serverServiceStartStop("stop");
  });
});
