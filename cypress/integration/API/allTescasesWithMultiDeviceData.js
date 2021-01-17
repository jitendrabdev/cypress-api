/// <reference types="cypress" />
import {
  listDevices,
  disconnectDevice,
  connectDevice,
  deviceState,
  updateDeviceName,
  updateDeviceBrightness,
  devices,
  updateDeviceColor,
  baseURL,
  serverServiceStartStop,
} from "../../apiObjects/api-objects";

describe("Device test", function () {
  before(() => {
    serverServiceStartStop("start");
  });
  let deviceData1;
  const newName = "newDevice";
  const newbrightness = 4;
  const newColor = "#336699";
  beforeEach(function () {
    listDevices(function (data, error) {
      if (error) {
        console.log(error);
      } else {
        deviceData1 = JSON.parse(data.body);
      }
    });
  });

  it("Connect to a device with valid ip", function () {
    deviceData1.forEach(function (data) {
      console.log(data.name, data.ip);
      const ip = data.ip;
      console.log(ip);
      disconnectDevice();
      connectDevice(ip, true);
      disconnectDevice();
    });
  });

  it("Get the state of a device", function () {
    deviceData1.forEach(function (data) {
      console.log(data.name, data.ip);
      const ip = data.ip;
      disconnectDevice();
      connectDevice(ip, true);
      deviceState(ip, true);
      disconnectDevice();
    });
  });

  it("Update the name of a device when device is connected", function () {
    deviceData1.forEach(function (data) {
      console.log(data.name, data.ip);
      const ip = data.ip;
      disconnectDevice();
      connectDevice(ip, true);
      updateDeviceName(newName, true);
      deviceState(newName, true);
      disconnectDevice();
    });
  });

  it("Updated name should be persist after device disconnect and connect", function () {
    deviceData1.forEach(function (data) {
      console.log(data.name, data.ip);
      const ip = data.ip;
      disconnectDevice();
      connectDevice(ip, true);
      updateDeviceName(newName, true);
      deviceState(newName, true);
      disconnectDevice();
      connectDevice(ip, true);
      deviceState(newName, true);
      disconnectDevice();
    });
  });

  it("Update the brightness of device when device is connected", function () {
    deviceData1.forEach(function (data) {
      console.log(data.name, data.ip);
      const ip = data.ip;
      disconnectDevice();
      connectDevice(ip, true);
      updateDeviceBrightness(newbrightness, true);
      deviceState(newbrightness, true);
      disconnectDevice();
    });
  });

  it("Updated brightness should be persist after device disconnect and connect", function () {
    deviceData1.forEach(function (data) {
      console.log(data.name, data.ip);
      const ip = data.ip;
      disconnectDevice();
      connectDevice(ip, true);
      updateDeviceBrightness(newbrightness, true);
      deviceState(newbrightness, true);
      disconnectDevice();
      connectDevice(ip, true);
      deviceState(newbrightness, true);
      disconnectDevice();
    });
  });

  it("Update the color of device when device is connected", function () {
    deviceData1.forEach(function (data) {
      console.log(data.name, data.ip);
      const ip = data.ip;
      disconnectDevice();
      connectDevice(ip, true);
      updateDeviceColor(newColor, true);
      deviceState(newColor, true);
      disconnectDevice();
    });
  });

  it("Updated color should be persist after device disconnect and connect", function () {
    deviceData1.forEach(function (data) {
      console.log(data.name, data.ip);
      const ip = data.ip;
      disconnectDevice();
      connectDevice(ip, true);
      updateDeviceColor(newColor, true);
      deviceState(newColor, true);
      disconnectDevice();
      connectDevice(ip, true);
      deviceState(newColor, true);
      disconnectDevice();
    });
  });

  it("Connect device when one device is already connected", function () {
    deviceData1.forEach(function (data) {
      console.log(data.name, data.ip);
      const ip = data.ip;
      disconnectDevice();
      connectDevice(ip, true);
      connectDevice(ip, false);
      disconnectDevice();
    });
  });
  after(() => {
    serverServiceStartStop("stop");
  });
});
