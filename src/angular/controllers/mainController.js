angular.module('jogoblackjack').controller('mainController', function($scope, $http){
    
        var DCartas = 2
        var DCartasValor = []
        var cartas = []
        var  DealerCInicial, idDeck, DealerVInicial

        $scope.novoDeck = () => {
            $http({
                url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
                method: 'GET'
            })
            .then((res) => {
                idDeck = res.data.deck_id
                $scope.reset()
                
                primeiraMao()
            })
        } 
        function CalculaValor(value){
            if(value === 'KING' || value === 'JACK' || value === 'QUEEN'){
                return Number(10)
            }
            else if(value === 'ACE'){
                return Number(1)
            }
            else{
                return Number(value)
            }     
        }

        $scope.novaCarta = () => {
            $http({
                url: 'https://deckofcardsapi.com/api/deck/'+idDeck+'/draw/?count=1',
                method: 'GET'
            })
            .then((res) => {
                cardsValue.push(CalculaValor(res.data.cards[0].value))
    
                let ACE
                let count = 0;
                cartas.forEach(carta => {
                    count += carta
    
                    if(card == 1){
                      ACE = true
                    }
                });
    
                if(ACE && count <= 11){
                    count += 10
                }
                $scope.points = count
                if($scope.points > 21){
                    $scope.stop()
                }
            })
        }
        $scope.parar = () => {
            $scope.DCartas[1] = DealerCInicial
            DCartasValor.push(DealerVIniciaL)
    
            let DealerACE = false
            if(DealerVInicial == 1 || DCartasValor[0] == 1){
                DealerACE = true
            }
    
            $scope.DPoints += DealerVInicial
            if(DealerACE && $scope.DPoints == 11){
                $scope.DPoints += 10
    
                checkScore()
            }
            else if($scope.DPoints < 16 && $scope.DPoints < $scope.points){
                newCardBot()
            } 
            else{
                checkScore()
            }
        } 
    }
