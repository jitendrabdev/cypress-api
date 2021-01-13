/// <reference types="cypress" />
import {
  listDevices,
  disconnectDevice,
  connectDevice,
  deviceState,
  updateDeviceName,
  updateDeviceBrightness,
  updateDeviceColor,
} from "../../apiObjects/api-objects";
const ip = "192.168.100.11";
const ip2 = "192.168.100.10";
const newName = "newDevice";
const newbrightness = 4;
const newColor = "#336699";
describe("Device test", function () {
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
    deviceState(ip);
  });

  it("Get the state of a device if device is not connected", function () {
    disconnectDevice();
    deviceState("false");
  });

  it("Update the name of a device when device is connected", function () {
    disconnectDevice();
    connectDevice(ip, true);
    updateDeviceName(newName, true);
    deviceState(newName);
  });

  it("Updated name should be persist after device disconnect and connect", function () {
    disconnectDevice();
    connectDevice(ip, true);
    updateDeviceName(newName, true);
    deviceState(newName);
    disconnectDevice();
    connectDevice(ip, true);
    deviceState(newName);
  });

  it("Update the name of a device when device is not connected", function () {
    disconnectDevice();
    updateDeviceName(newName, false);
  });

  it("Update the brightness of device when device is connected", function () {
    disconnectDevice();
    connectDevice(ip, true);
    updateDeviceBrightness(newbrightness, true);
    deviceState(newbrightness);
  });

  it("Update the brightness of device when device is not connected", function () {
    disconnectDevice();
    updateDeviceBrightness(newbrightness, false);
  });

  it("Updated brightness should be persist after device disconnect and connect", function () {
    disconnectDevice();
    connectDevice(ip, true);
    updateDeviceBrightness(newbrightness, true);
    deviceState(newbrightness);
    disconnectDevice();
    connectDevice(ip, true);
    deviceState(newbrightness);
  });

  it("Update the color of device when device is connected", function () {
    disconnectDevice();
    connectDevice(ip, true);
    updateDeviceColor(newColor, true);
    deviceState(newColor);
  });

  it("Update the color of device when device is not connected", function () {
    disconnectDevice();
    updateDeviceColor(newColor, false);
  });

  it("Updated color should be persist after device disconnect and connect", function () {
    disconnectDevice();
    connectDevice(ip, true);
    updateDeviceColor(newColor, true);
    deviceState(newColor);
    disconnectDevice();
    connectDevice(ip, true);
    deviceState(newColor);
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
});
