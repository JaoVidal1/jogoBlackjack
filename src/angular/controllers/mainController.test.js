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
      
      describe('Controller', function (){    
        it('Valores iniciais', function (){
            const test = newControllerInstance('mainController')
            
            expect(test.cartas).toEqual([])
            expect(test.points).toEqual(0)
            expect(test.Dcartas).toEqual([])
            expect(test.DPoints).toEqual(0)
})
      it('Parar', function (){
       const test = newControllerInstance('mainController')
       test.parar();
       expect(test.vencedor).toEqual('Vitória')

      });
      });
      
      
      it('Valor das Cartas', function () {
        const receive = newControllerInstance('jogoBlackjack');
        receive.points = 0;
        receive.cards = [];
    
        expect(receive.points).toEqual(0);
        expect(receive.cards).toEqual([]);
      });
    
      it('Função Parar', function () {
        const fparar = newControllerInstance();
        fparar.Vcarta = 13;
        fparar.parar();
        expect(fparar.getResultMessage).toEqual('Vitória');
      });


















});