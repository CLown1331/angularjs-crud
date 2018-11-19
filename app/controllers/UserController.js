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
        $scope.data = [];

        $scope.labels = [];

        $scope.datasetOverride = [
            {
                borderWidth: 1,
                type: 'line',
                lineTension: 0,
            },
        ];

        $scope.options = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    }
                ]
            }
          };

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
                UserService.GetRatingChangeFromCF(user).then(
                    function(result) {
                        user.ratingChanges = result;
                    }, function() {
                        user.ratingChanges = null;
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
            $scope.data = [];
            $scope.labels.length = user.ratingChanges.length;
            for (let value of user.ratingChanges) {
                $scope.data.push({
                    x: value.ratingUpdateTimeSeconds,
                    y: value.newRating,
                });
            }
        }

        function showSideNav() {
            $mdSidenav('left').toggle();
        }

    }

    UserController['$inject'] = ['$scope', '$mdSidenav', '$mdDialog', 'UserService'];

})();