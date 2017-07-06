'use strict';

(function() {

  var CheckinCtrl = function($scope, $log) {

    this.login = function() {
      $log.log(this.email);
      $log.log(this.password);
    };

  };

  CheckinCtrl.$inject = ['$scope', '$log'];

  angular
    .module('scaffold-angularjs.checkin')
    .controller('CheckinCtrl', CheckinCtrl);
})();
