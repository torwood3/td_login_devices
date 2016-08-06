/**
 * Created by Tor on 03/08/2016.
 */


angular
    .module('app')
    .controller('DevicesController', DevicesController);

DevicesController.$inject = ['$location', 'deviceService', 'authService'];

function DevicesController($location, deviceService, authService)
{

    if( !authService.isLogged ) $location.path('/');

    var deviceView = this;
    deviceView.devices = [];

    function activate() {
        return getDevices().then(function() {
            console.info('Activated devices View');
        });
    }

    function getDevices() {
        return deviceService.getDevices()
            .then(function(data) {
                deviceView.devices = data;
                return deviceView.devices;
            });
    }

    deviceView.add = function(device){
        deviceService.addDevice(device).then(function (data) {
            deviceView.devices.push(device);
        });
        return false;
    }

    activate();

}
