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
        obj.GetColor = function(point) {
            if (point >= 2600) return '#f33';
            if (point >= 2400 && point < 2600) return '#f77';
            if (point >= 2300 && point < 2400) return '#fb5';
            if (point >= 2100 && point < 2300) return '#fc8';
            if (point >= 1900 && point < 2100) return '#f8f';
            if (point >= 1600 && point < 1900) return '#aaf';
            if (point >= 1400 && point < 1600) return '#7db';
            if (point >= 1200 && point < 1400) return '#7f7';
            return '#ccc';
        }
        return obj;
    }]);

})();