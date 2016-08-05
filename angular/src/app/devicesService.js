/**
 * Created by Tor on 05/08/2016.
 */

angular
    .module('app')
    .factory('deviceService', deviceService);

deviceService.$inject = ['$http'];

function deviceService($http) {
    var host = 'http://127.0.0.1:3010';

    var service = {
        getDevices: getDevices,
        addDevice: addDevice
    };
    return service;

    ////////////

    function getDevices() {
        return $http.get(host + '/api/devices')
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