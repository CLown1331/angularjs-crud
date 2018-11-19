(function() {
    'use strict';

    angular.module('app').controller('UserController', UserController);

    function UserController($scope, $mdSidenav, $mdDialog, UserService) {
        
        $scope.selected = null;
        $scope.selectedIndex = null;
        $scope.users = [];
        $scope.selectUser = selectUser;
        $scope.showSideNav = showSideNav;
        $scope.deleteUser = deleteUser;

        (function() {
            $scope.users = UserService.LoadUsers();
            for (let user of $scope.users) {
               UserService.GetValueFromCF(user).then(
                    function(result) {
                        user.result = result;
                    }, function() {
                        user.result = null;
                    }
               );
            }
        })();

        function deleteUser() {
            let confirm = $mdDialog.confirm()
            .title('Would you like to delete this user?')
            .textContent('')
            .ariaLabel('Lucky day')
            .ok('Nope!!')
            .cancel('Please do it!');

            $mdDialog.show(confirm).then(function() {
            }, function() {
                $scope.users.splice($scope.selectedIndex, 1);
                UserService.SaveUsers($scope.users);
            });
        }

        function selectUser(user, index) {
            $scope.selected = user;
            $scope.selectedIndex = index;
        }

        function showSideNav() {
            $mdSidenav('left').toggle();
        }

    }

    UserController['$inject'] = ['$scope', '$mdSidenav', '$mdDialog', 'UserService'];

})();