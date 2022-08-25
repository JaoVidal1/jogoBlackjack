require('angular');
require('angular-mocks');
require('angular-route')
require('src\app.js');
require('src\angular\controllers\mainController.js');

describe('Controllers', function () {
    beforeEach(function () {
        angular.mock.module('jogoBlackjack');
      });
      let controller;
      let rootScope;
      beforeEach(inject(($controller, $rootScope) => {
        rootScope = $rootScope;
        controller = $controller;
      }));
      























});