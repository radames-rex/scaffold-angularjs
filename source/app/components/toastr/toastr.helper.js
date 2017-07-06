(function() {
  'use strict';

  angular
    .module('scaffold-angularjs.components')
    .factory('Toastr', Toastr);

  /** @ngInject */
  function Toastr(toastr) {
    var factory = {
      success: success,
      info: info,
      warning: warning,
      error: error,
      close: close
    };
    return factory;

    function success(title, message, obj) {
      toastr.success(message, title, options(obj))
    }

    function info(title, message, obj) {
      toastr.info(message, title, options(obj))
    }

    function warning(title, message, obj) {
      toastr.warning(message, title, options(obj))
    }

    function error(title, message, obj) {
      toastr.error(message, title, options(obj))
    }

    function close() {
      toastr.clear();
    }

    function options(obj) {
      var options = {
        closeButton: true
      };

      if (obj) {
        if (obj.timeOut)
          options['timeOut'] = obj.timeOut;

        if (obj.progressBar)
          options['progressBar'] = obj.progressBar;
      }

      return options;
    }
  }
})();
