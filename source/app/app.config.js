(function() {
  'use strict';

  angular
    .module('scaffold-angularjs')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $locationProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 5000;
    toastrConfig.positionClass = 'toast-top-center';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    $locationProvider.hashPrefix('');
  }

})();
