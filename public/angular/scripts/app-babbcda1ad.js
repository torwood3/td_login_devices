"use strict";function RegisterController(e,r){var n=this;n.signup=function(n){return r.signup(n).then(function(o){"undefined"!=typeof o.message?(r.user.password=n.password,r.user.username=n.username,e.path("/")):console.log(o.error)}),!1},n.reset=function(){n.user=angular.copy({username:"",password:""})},n.reset()}function PasswordCheckDirective(){return{require:"ngModel",link:function(e,r,n,o){var t="#"+n.pwCheck;r.add(t).on("keyup",function(){e.$apply(function(){var e=r.val()===$(t).val();o.$setValidity("pwmatch",e)})})}}}function ProfileController(e,r,n){n.isLogged||r.path("/");var o=this;o.user=n.user}function MenuCtrl(e){e.displayMenu=!1}function LoginController(e,r,n){var o=this;o.login=function(o){return n.login(o).then(function(o){"undefined"!=typeof o&&(o.success?(r.message="Authentication successful!",r.displayMenu=!0,n.isLogged=!0,n.user=o.user,n.sessionID=o.sessionID,console.log(o),e.path("/profile")):(r.message="Authentication failed.",console.log(o.error)))}),!1},o.reset=function(){o.user=angular.copy({username:"",password:""})},o.reset()}function deviceService(e,r){function n(){function n(e){return e.data}function o(e){console.error("XHR Failed for getDevices."+e.data)}return e.get(t+"/api/devices?sessionID="+r.sessionID).then(n)["catch"](o)}function o(n){function o(e){return e.data}function i(e){console.error("XHR Failed for getDevices."+e.data)}return n.sessionID=r.sessionID,e.post(t+"/api/devices",n).then(o)["catch"](i)}var t="http://127.0.0.1:3010",i={getDevices:n,addDevice:o};return i}function DevicesController(e,r,n){function o(){return t().then(function(){console.info("Activated devices View")})}function t(){return r.getDevices().then(function(e){return i.devices=e,i.devices})}n.isLogged||e.path("/");var i=this;i.devices=[],i.add=function(e){return r.addDevice(e).then(function(r){i.devices.push(e)}),!1},o()}function authService(e){function r(r){function n(e){return e.data}function t(e){console.error("XHR Failed for login."+e.data)}return e.post(o+"/users/login",r).then(n)["catch"](t)}function n(r){function n(e){return e.data}function t(e){console.error("XHR Failed for login."+e.data)}return e.post(o+"/users/register",r).then(n)["catch"](t)}var o="http://127.0.0.1:3010",t="-1",i=!1,l={},s={sessionID:t,login:r,isLogged:i,signup:n,user:l};return s}angular.module("app",["ngRoute"]).config(["$locationProvider","$routeProvider","$httpProvider",function(e,r,n){var o=function(e,r,n,o,t,i){var l=e.defer();return n.get("http://127.0.0.1:3010/users/loggedin/"+i.sessionID).success(function(e){"0"!==e?l.resolve():(t.message="You need to log in.",l.reject(),o.url("/"))}),l.promise};o.$inject=["$q","$timeout","$http","$location","$rootScope","authService"],n.interceptors.push(["$q","$location",function(e,r){return{response:function(e){return e},responseError:function(n){return 401===n.status&&r.url("/login"),e.reject(n)}}}]),e.hashPrefix("!"),r.when("/login",{templateUrl:"./app/login.html",controller:"LoginController",controllerAs:"lg"}).when("/profile",{templateUrl:"./app/profile.html",controller:"ProfileController",controllerAs:"vm",resolve:{loggedin:o}}).when("/register",{templateUrl:"./app/register.html",controller:"RegisterController",controllerAs:"reg"}).when("/devices",{templateUrl:"./app/devices.html",controller:"DevicesController",controllerAs:"deviceView",resolve:{loggedin:o}}).otherwise({redirectTo:"/login"})}]).run(["$rootScope","authService",function(e,r){e.message="",e.logout=function(){e.message="Logged out.",e.displayMenu=!1,r.sessionID=""}}]),angular.module("app").controller("RegisterController",RegisterController).directive("pwCheck",PasswordCheckDirective),RegisterController.$inject=["$location","authService"],angular.module("app").controller("ProfileController",ProfileController),ProfileController.$inject=["$scope","$location","authService"],angular.module("app").controller("MenuCtrl",MenuCtrl),MenuCtrl.$inject=["$scope"],angular.module("app").controller("LoginController",LoginController),LoginController.$inject=["$location","$rootScope","authService"],angular.module("app").factory("deviceService",deviceService),deviceService.$inject=["$http","authService"],angular.module("app").controller("DevicesController",DevicesController),DevicesController.$inject=["$location","deviceService","authService"],angular.module("app").factory("authService",authService),authService.$inject=["$http"],angular.module("app").run(["$templateCache",function(e){e.put("app/src/app/devices.html",'<div>\r\n    <div class="row">\r\n        <div class="col-md-offset-1 col-md-2">\r\n            Nombre de devices: {{deviceView.devices.length}}\r\n            <input type="search" class="form-control" ng-model="q" placeholder="filter devices..." aria-label="filter devices">\r\n            <br>\r\n            <form role="form">\r\n                <label for="name" class="sr-only">Name</label>\r\n                <input type="text" class="form-control" id="name" ng-model="device.name" placeholder="Name">\r\n                <label for="type" class="sr-only">Type</label>\r\n                <input type="text" id="type" class="form-control" ng-model="device.type" placeholder="Type">\r\n                <label for="ip" class="sr-only">IP</label>\r\n                <input type="text" id="ip" class="form-control" ng-model="device.ip" placeholder="IP">\r\n                <input type="button" class="btn" ng-click="deviceView.add(device)" value="Ajouter">\r\n            </form>\r\n        </div>\r\n        <div class="col-md-4">\r\n            <ul>\r\n                <li ng-repeat="device in deviceView.devices | filter:q as results">\r\n                    [{{$index + 1}}] {{device.name}} - {{device.type}} - {{device.ip}}\r\n                </li>\r\n                <li class="animate-repeat" ng-if="results.length === 0">\r\n                    <strong>No results found...</strong>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n\r\n</div>\r\n'),e.put("app/src/app/login.html",'\r\n<div id="loginPage">\r\n    <form novalidate id="loginForm" role="form" class="form-signin">\r\n        <h2 class="form-signin-heading">Please sign in</h2>\r\n        <label for="username" class="sr-only">Username</label>\r\n        <input type="text" id="username" class="form-control" ng-model="lg.user.username" placeholder="Username" ng-required autofocus>\r\n        <label for="password" class="sr-only">Password</label>\r\n        <input type="password" id="password" class="form-control" ng-model="lg.user.password" placeholder="Password" ng-required>\r\n\r\n        <input type="button" class="btn btn-danger btn-block" ng-click="lg.reset()" value="Reset">\r\n        <input type="button" class="btn btn-primary btn-block" ng-click="lg.login(lg.user)" value="Login">\r\n    </form>\r\n</div>\r\n'),e.put("app/src/app/profile.html","<div>\r\n    Username : {{vm.user.username}}\r\n</div>"),e.put("app/src/app/register.html",'<div id="regPage">\r\n    <form novalidate id="regForm" role="form">\r\n        <input type="text" ng-model="user.email" placeholder="Username" ng-required>\r\n        <input type="password" ng-model="user.password" placeholder="Password" ng-required>\r\n        <input type="password" ng-model="user.password2" pw-check="user.password" placeholder="Password" ng-required>\r\n        <input type="button" ng-click="reg.reset()" value="Reset">\r\n        <input type="button" ng-click="reg.signup(user)" value="Register">\r\n        <div class="msg-block" ng-show="myForm.$error">\r\n          <span class="msg-error" ng-show="myForm.pw2.$error.pwmatch">\r\n            Passwords don\'t match.\r\n          </span>\r\n        </div>\r\n    </form>\r\n    {{user.password}}\r\n</div>\r\n\r\n\r\n')}]);
//# sourceMappingURL=../maps/scripts/app-babbcda1ad.js.map
