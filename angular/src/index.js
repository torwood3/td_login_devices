angular
    .module('app', ['ngRoute'])
    .config([
        '$locationProvider',
        '$routeProvider',
        '$httpProvider',
        function($locationProvider, $routeProvider, $httpProvider) {
            //================================================
            // Check if the user is connected
            //================================================
            var checkLoggedin = function($q, $timeout, $http, $location, $rootScope, authService){
                // Initialize a new promise
                var deferred = $q.defer();

                // Make an AJAX call to check if the user is logged in
                $http.get('http://127.0.0.1:3010/users/loggedin/' + authService.sessionID).success(function(user){
                    // Authenticated
                    if (user !== '0')
                    /*$timeout(deferred.resolve, 0);*/
                        deferred.resolve();

                    // Not Authenticated
                    else {
                        $rootScope.message = 'You need to log in.';
                        //$timeout(function(){deferred.reject();}, 0);
                        deferred.reject();
                        $location.url('/');
                    }
                });

                return deferred.promise;
            };
            //================================================

            //================================================
            // Add an interceptor for AJAX errors
            //================================================
            $httpProvider.interceptors.push(function($q, $location) {
                return {
                    response: function(response) {
                        // do something on success
                        return response;
                    },
                    responseError: function(response) {
                        if (response.status === 401)
                            $location.url('/login');
                        return $q.reject(response);
                    }
                };
            });
            //================================================

            $locationProvider.hashPrefix('!');

            //================================================

            //================================================
            // Define all the routes
            //================================================
            $routeProvider
                .when("/login", { //a faire en live coding
                    templateUrl: "./app/login.html",
                    controller: "LoginController",
                    controllerAs: "lg"
                })
                .when("/profile", { //a faire en live coding
                    templateUrl: "./app/profile.html",
                    controller: "ProfileController",
                    controllerAs: "vm",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/register",{
                    templateUrl: './app/register.html',
                    controller: 'RegisterController',
                    controllerAs: "reg"
                })
                .when("/devices", {
                    templateUrl: './app/devices.html',
                    controller: 'DevicesController',
                    controllerAs: "deviceView",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .otherwise({
                    redirectTo: '/login'
                });
        }
    ]) // end of config()
    .run(function($rootScope, authService){
        $rootScope.message = '';

        // Logout function is available in any pages
        $rootScope.logout = function(){
            $rootScope.message = 'Logged out.';
            $rootScope.displayMenu = false;
            authService.sessionID = "";

        };
    });
