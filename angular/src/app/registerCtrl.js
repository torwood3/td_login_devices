/**
 * Created by Tor on 03/08/2016.
 */

angular
    .module('app')
    .controller('RegisterController', RegisterController)
    .directive('pwCheck', PasswordCheckDirective);

RegisterController.$inject = ['$location', 'authService'];

function RegisterController($location, authService)
{
    var reg = this;
    reg.signup = function(user) {
        authService.signup(user)
            .then(function(data) {
                if( typeof data.message !== "undefined") {
                    authService.user.password = user.password;
                    authService.user.email = user.email;
                    $location.path('/');
                } else {
                    console.log(data.error)
                }
            });
        return false;
    };

    reg.reset = function() {
        reg.user = angular.copy({
            email: "", password: ""
        });
    };

    reg.reset();
}

function PasswordCheckDirective() {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elem.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    var v = elem.val()===$(firstPassword).val();
                    ctrl.$setValidity('pwmatch', v);
                });
            });
        }
    }
};