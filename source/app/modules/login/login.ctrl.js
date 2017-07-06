'use strict';

(function() {

  var LoginCtrl = function($scope, $log) {

    this.login = function() {
      $log.log(this.email);
      $log.log(this.password);
    };

  };

  LoginCtrl.$inject = ['$scope', '$log'];

  angular
    .module('scaffold-angularjs.login')
    .controller('LoginCtrl', LoginCtrl);
})();
