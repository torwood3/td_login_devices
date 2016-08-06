angular
    .module('app')
    .controller('LoginController', LoginController);

LoginController.$inject = ['$location', '$rootScope', 'authService'];

function LoginController($location, $rootScope, authService)
{
    var lg = this;
    lg.login = function(user) {
        authService.login(user)
            .then(function(data) {
                if( typeof data !== "undefined" )
                    if( data.success) {
                        $rootScope.message = 'Authentication successful!';
                        $rootScope.displayMenu = true;
                        authService.isLogged = true;
                        authService.user = data.user;
                        authService.sessionID = data.sessionID;
                        console.log(data)
                        $location.path('/profile');
                    } else {
                        $rootScope.message = 'Authentication failed.';
                        console.log(data.error)
                    }
            });
        return false;
    };

    lg.reset = function() {
        lg.user = angular.copy({
            username: "", password: ""
        });
    };

    lg.reset();
}

