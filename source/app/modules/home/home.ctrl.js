'use strict';

(function() {

  var HomeCtrl = function($scope) {
    console.log("Plus Ultra!");
  };

  HomeCtrl.$inject = ['$scope'];

  angular
    .module('scaffold-angularjs.home')
    .controller('HomeCtrl', HomeCtrl);
})();
