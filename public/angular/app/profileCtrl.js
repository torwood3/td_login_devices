/**
 * Created by Tor on 05/08/2016.
 */

angular
    .module('app')
    .controller('ProfileController', ProfileController);

ProfileController.$inject = ['$scope', '$rootScope', '$location', 'authService'];

function ProfileController($scope, $rootScope, $location, authService)
{
    if( !authService.isLogged ) $location.path('/');

    var vm = this;
    vm.user = authService.user;
    $rootScope.message = '';
}

