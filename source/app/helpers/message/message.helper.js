(function() {
  'use strict';

  angular
    .module('scaffold-angularjs.helpers')
    .factory('Message', Message);

  function Message() {
    var factory = {
      get: get
    };
    return factory;

    function get(key) {
      switch (key) {
        case 'server_error':
          return 'Ocorreu um erro no servidor.';
          break;

        case 'cant_resend_activation_email':
          return 'Não foi possível re-enviar o email de ativação.';
          break;

        case 'cant_complete_register':
          return 'Não foi possível completar o seu registro.';
          break;
      }
    }
  }
})();
