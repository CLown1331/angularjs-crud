(function() {
    'use strict';

    angular.module('app').controller('CreateController', CreateController);

    function CreateController($scope, $state, UserService) {
        
        $scope.users = null;
        $scope.submitData = submitData;

        (function() {
            $scope.users = UserService.LoadUsers();
        })();

        function submitData() {
            UserService.GetValueFromCF($scope.user).then(
                function(cfResult) {
                    $scope.user.result = cfResult;
                }, function() {

                }
            );
            $scope.users.push($scope.user);
            UserService.SaveUsers($scope.users);
            $state.go('home');
        }
    }

    CreateController['$inject'] = ['$scope', '$state', 'UserService'];

})();