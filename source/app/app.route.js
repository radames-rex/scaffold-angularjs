(function() {
  'use strict';

  angular
    .module('scaffold-angularjs')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $translateProvider, PATH) {

    // Configuração do provider de universalização e da linguagem padrão.
    $translateProvider.useStaticFilesLoader({
      prefix: 'app/translate/messages-',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('pt-BR');
    $translateProvider.preferredLanguage(navigator.language);

    // Configuração dos estados e rotas da aplicação
    $stateProvider
      .state('login', {
        url: PATH.login,
        templateUrl: 'app/modules/login/index.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        permission: 'public'
      })
      .state('checkin', {
        url: PATH.checkin,
        templateUrl: 'app/modules/checkin/index.html',
        controller: 'CheckInController',
        controllerAs: 'vm',
        permission: 'private'
      })
      .state('dashboard', {
        url: PATH.dashboard,
        templateUrl: 'app/modules/dashboard/index.html',
        controller: 'DashboardController',
        controllerAs: 'vm',
        permission: 'private'
      })
      .state('home', {
        url: PATH.home,
        templateUrl: 'app/modules/home/index.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        permission: 'public'
      });

    $urlRouterProvider.otherwise('/login');
  }

})();
