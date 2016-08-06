/**
 * Created by Tor on 05/08/2016.
 */

angular
    .module('app')
    .factory('deviceService', deviceService);

deviceService.$inject = ['$http', 'authService'];

function deviceService($http, authService) {
    var host = 'http://127.0.0.1:3010';

    var service = {
        getDevices: getDevices,
        addDevice: addDevice
    };
    return service;

    ////////////

    function getDevices() {
        return $http.get(host + '/api/devices?sessionID=' + authService.sessionID)
            .then(getDevicesComplete)
            .catch(getDevicesFailed);

        function getDevicesComplete(response) {
            return response.data;
        }

        function getDevicesFailed(error) {
            console.error('XHR Failed for getDevices.' + error.data);
        }
    }

    function addDevice(device) {
        device.sessionID = authService.sessionID;
        return $http.post(host + '/api/devices', device)
            .then(getDevicesComplete)
            .catch(getDevicesFailed);

        function getDevicesComplete(response) {
            return response.data;
        }

        function getDevicesFailed(error) {
            console.error('XHR Failed for getDevices.' + error.data);
        }
    }

}