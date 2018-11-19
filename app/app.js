(function () {
    'use strict';

    angular.module('app', ['ngMaterial', 'ui.router', 'chart.js']);

    angular.module('app').config(function($stateProvider, $locationProvider) {
        
        $stateProvider.state('home', {
          url: '/',
          templateUrl: 'app/views/home.html',
          controller: 'UserController',
        });
        
        $stateProvider.state('create', {
            url: '/create',
            templateUrl: 'app/views/create.html',
            controller: 'CreateController',
          });
        
          $stateProvider.state('edit', {
            url: '/edit/:id',
            templateUrl: 'app/views/create.html',
            controller: 'EditController',
        });

        $locationProvider.html5Mode(true);
        }
    );
})();