/**
 * Created by Tor on 06/08/2016.
 */

angular
    .module('app')
    .controller('MenuCtrl', MenuCtrl);

MenuCtrl.$inject = [ '$scope'];

function MenuCtrl( $scope)
{
    var menu = this;
    $scope.displayMenu = false;
}
