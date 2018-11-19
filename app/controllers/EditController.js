(function() {
    'use strict';

    angular.module('app').controller('EditController', EditController);

    function EditController($scope, $state, $stateParams, UserService) {
        
        $scope.users = null;
        $scope.submitData = submitData;

        (function() {
            $scope.users = UserService.LoadUsers();
            $scope.user = $scope.users[$stateParams['id']];
        })();

        function submitData() {
            UserService.GetValueFromCF($scope.user).then(
                function(cfResult) {
                    $scope.user.result = cfResult;
                }, function() {

                }
            );
            $scope.users[$stateParams['id']] = $scope.user;
            UserService.SaveUsers($scope.users);
            $state.go('home');
        }
    }

    EditController['$inject'] = ['$scope', '$state', '$stateParams', 'UserService'];

})();