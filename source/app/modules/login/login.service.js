'use strict';

(function() {

  var LoginService = function($log) {

  };

  LoginService.$inject = ['$log'];

  angular
    .module('scaffold-angularjs.login')
    .service('LoginService', LoginService);
})();
