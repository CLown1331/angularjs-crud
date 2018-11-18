(function() {
    'use strict';

    angular.module('app').controller('UserController', UserController);

    function UserController($mdSidenav, $mdDialog, UserService) {
        let vm = this;
        
        vm.selected = null;
        vm.selectedIndex = null;
        vm.users = [];
        vm.selectUser = selectUser;
        vm.addUser = addUser;
        vm.showSideNav = showSideNav;
        vm.editUser = editUser;
        vm.deleteUser = deleteUser;

        (function() {
            vm.users = UserService.LoadUsers();
            for (let user of vm.users) {
               UserService.GetValueFromCF(user).then(
                    function(result) {
                        user.result = result;
                    }, function() {
                        user.result = null;
                    }
               );
            }
        })();

        function editUser() {
            $mdDialog.show({
                controller: DialogController,
                controllerAs: 'dialog',
                templateUrl: "app/views/addUserDialog.html",
                parent: angular.element(document.body),
                clickOutsideToClose: true
            }).then(function(result) {
                UserService.GetValueFromCF(result).then(
                    function(cfResult) {
                        result.result = cfResult;
                    }, function() {

                    }
                );
                vm.users[vm.selectedIndex] = result;
                UserService.SaveUsers(vm.users);
            }, function() {

            });
        }

        function deleteUser() {
            let confirm = $mdDialog.confirm()
            .title('Would you like to delete this user?')
            .textContent('')
            .ariaLabel('Lucky day')
            .ok('Nope!!')
            .cancel('Please do it!');

            $mdDialog.show(confirm).then(function() {
            }, function() {
                vm.users.splice(vm.selectedIndex, 1);
                UserService.SaveUsers(vm.users);
            });
        }

        function selectUser(user, index) {
            vm.selected = user;
            vm.selectedIndex = index;
        }

        function addUser() {
            $mdDialog.show({
                controller: DialogController,
                controllerAs: 'dialog',
                templateUrl: "app/views/addUserDialog.html",
                parent: angular.element(document.body),
                clickOutsideToClose: true
            }).then(function(result) {
                UserService.GetValueFromCF(result).then(
                    function(cfResult) {
                        result.result = cfResult;
                    }, function() {

                    }
                );
                vm.users.push(result);
                UserService.SaveUsers(vm.users);
            }, function() {

            });
        }

        function DialogController($mdDialog) {
            this.submit = function() {
                $mdDialog.hide(this.user);
            };
            this.closeDialog = function() {
                $mdDialog.cancel();
            };
        }

        DialogController['$inject'] = ['$mdDialog'];

        function showSideNav() {
            $mdSidenav('left').toggle();
        }

    }

    UserController['$inject'] = ['$mdSidenav', '$mdDialog', 'UserService'];

})();