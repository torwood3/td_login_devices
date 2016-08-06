/**
 * Created by Tor on 05/08/2016.
 */

angular
    .module('app')
    .factory('authService', authService);

authService.$inject = ['$http'];

function authService($http) {
    var host = 'http://127.0.0.1:3010';
    var sessionID = '-1';
    var isLogged = false;
    var user = {};

    var service = {
        sessionID: sessionID,
        login: login,
        isLogged: isLogged,
        signup: signup,
        user: user
    };
    return service;

    ////////////

    function login(user) {
        return $http.post(host + '/users/login', user)
            .then(loginComplete)
            .catch(loginFailed);

        function loginComplete(response) {
            return response.data;
        }

        function loginFailed(error) {
            console.error('XHR Failed for login.' + error.data);
        }
    }

    function signup(user) {
        return $http.post(host + '/users/register', user)
            .then(loginComplete)
            .catch(loginFailed);

        function loginComplete(response) {
            return response.data;
        }

        function loginFailed(error) {
            console.error('XHR Failed for login.' + error.data);
        }
    }

    function loggedin(){
        return $http.get(host + '/users/loggedin/' + authService.sessionID)
    }
}