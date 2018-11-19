(function() {
    'use strict';

    angular.module('app').factory('UserService', ['$http', '$q', function($http, $q) {
        let obj = {};
        obj.LoadUsers = function() {
            let ret = window.localStorage.getItem('users');
            if (!ret) {
                ret = [];
            } else {
                ret = JSON.parse(ret);
            }
            return ret;
        };
        obj.SaveUsers = function(users) {
            window.localStorage.setItem('users', JSON.stringify(users));
        };
        obj.GetValueFromCF = function(user) {
            return $q(function(resolve, reject) {
                $http.get("https://codeforces.com/api/user.info?handles="+user.userName).then(
                    function(response) {
                        resolve(response.data.result[0]);
                    }, function() {
                        reject();
                    }
                );
              });
        };
        obj.GetRatingChangeFromCF = function(user) {
            return $q(function(resolve, reject) {
                $http.get("https://codeforces.com/api/user.rating?handle="+user.userName).then(
                    function(response) {
                        resolve(response.data.result);
                    }, function() {
                        reject();
                    }
                );
              });
        };
        return obj;
    }]);

})();