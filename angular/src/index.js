angular
    .module('app', ['ngRoute'])
    .config([
        '$locationProvider',
        '$routeProvider',
        function($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');
            // routes
            $routeProvider
                .when("/", { //a faire en live coding
                    templateUrl: "./app/login.html",
                    controller: "LoginController",
                    controllerAs: "vm"
                })
                .when("/profile", { //a faire en live coding
                    templateUrl: "./app/profile.html",
                    controller: "ProfileController",
                    controllerAs: "vm"
                })
                .when("/register",{
                    templateUrl: './app/register.html',
                    controller: 'RegisterController',
                    controllerAs: "reg"
                })
                .when("/devices", {
                    templateUrl: './app/devices.html',
                    controller: 'DevicesController',
                    controllerAs: "deviceView"
                })
                .otherwise({
                    redirectTo: '/login'
                });
        }
    ]);

//https://github.com/Anomen/AuthenticationAngularJS/