(function() {
  'use strict';

  angular
    .module('scaffold-angularjs', [
      'ngCookies',
      'ngAria',
      'ngTable',
      'ui.router',
      'pascalprecht.translate'
      'toastr',

      'scaffold-angularjs.components',
      'scaffold-angularjs.filters',
      'scaffold-angularjs.helpers',
      'scaffold-angularjs.utils',

      'scaffold-angularjs.login',
      'scaffold-angularjs.checkin',
      'scaffold-angularjs.dashboard',
      'scaffold-angularjs.home'
    ]);
})();
