(function() {
    'use strict';

    angular.module('app').controller('CreateController', CreateController);

    function CreateController($scope, $state, UserService, $timeout, $q, $log) {
        
        $scope.users                = null;
        $scope.submitData           = submitData;
        $scope.states               = loadAll();
        $scope.querySearch          = querySearch;
        $scope.selectedItemChange   = selectedItemChange;
        $scope.searchTextChange     = searchTextChange;


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

        function querySearch (query) {
            let results = query ? $scope.states.filter( createFilterFor(query) ) : $scope.states;
            let deferred = $q.defer();
            $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
            return deferred.promise;
        }

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }
      
        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
        }

        function loadAll() {
            let allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
                Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
                Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
                Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
                North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
                South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
                Wisconsin, Wyoming';
    
            return allStates.split(/, +/g).map( function (state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        }

        function createFilterFor(query) {
            let lowercaseQuery = query.toLowerCase();
            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };      
        }
    }

    CreateController['$inject'] = ['$scope', '$state', 'UserService', '$timeout', '$q', '$log'];

})();