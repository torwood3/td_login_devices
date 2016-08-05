angular
    .module('app')
    .controller('LoginController', LoginController);

LoginController.$inject = ['$location', 'authService'];

function LoginController($location, authService)
{
    var vm = this;
    vm.login = function(user) {
        authService.login(user)
            .then(function(data) {
                if( typeof data !== "undefined" )
                    if( typeof data.message !== "undefined") {
                        authService.isLogged = true;
                        authService.user = data.user;
                        $location.path('/profile');
                    } else {
                        console.log(data.error)
                    }
            });
        return false;
    };

    vm.reset = function() {
        vm.user = angular.copy({
            email: "", password: ""
        });
    };

    vm.reset();
}

