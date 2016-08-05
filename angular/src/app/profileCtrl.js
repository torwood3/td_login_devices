/**
 * Created by Tor on 05/08/2016.
 */

angular
    .module('app')
    .controller('ProfileController', ProfileController);

ProfileController.$inject = ['$scope', '$location', 'authService'];

function ProfileController($scope, $location, authService)
{
    if( !authService.isLogged ) $location.path('/');

    var vm = this;
    vm.user = authService.user;
}

