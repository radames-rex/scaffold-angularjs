(function() {
  'use strict';

  angular
    .module('scaffold-angularjs')
    .run(mainRunBlock);

  /** @ngInject */
  function mainRunBlock($state, $rootScope, $cookies, UserService) {

    /*
     * Função armazenar o nome da rota.
     */
    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        $rootScope.state = toState.name;
      });

    /*
     * Função para controlar o token de acesso em rotas privadas.
     */
    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        if (toState.permission === 'private') {
          var userFromCookie = $cookies.getObject('user');

          if (userFromCookie) {
            UserService.getUser(userFromCookie.Id)
              .success(function(data) {
                $rootScope.user = data;
              })
              .error(function(error, code) {
                $state.go('login');
              });
          } else {
            $state.go('login');
          }
        }
      });

    /*
     * Função para evitar chamar jQuery em Controllers.
     */
    $rootScope.getElement = function(identifier) {
      return $(identifier);
    };

    /*
     * Função para evitar chamar state.go em Controllers.
     */
    $rootScope.goTo = function(route) {
      $state.go(route);
    };

    /*
     * Função para deslogar usuário, limpar seus dados armazenados e redirecioná-lo para a tela de login.
     */
    $rootScope.logout = function() {
      $cookies.remove('user');
      $rootScope.user = null;

      $state.go('login');
    }
  }

})();
