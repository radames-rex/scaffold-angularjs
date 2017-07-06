(function() {
  'use strict';

  angular
    .module('scaffold-angularjs')
    .constant('ENV', {
      api: {
        url: 'https://example.herokuapp.com'
      },
      paths: {
        login: '/login',
        checkin: '/checkin',
        dashboard: '/dashboard',
        spotlights: '/spotlights'
      }
    })
    .constant('PATH', {
      login: '/login',
      checkin: '/checkin',
      dashboard: '/dashboard',
      home: '/home'
    });
})();
