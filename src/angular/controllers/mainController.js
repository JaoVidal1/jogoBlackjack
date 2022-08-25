angular.module('jogoBlackjack').controller('mainController', function($scope, $http){
    
        
        var DCartasValor = []
        var Vcartas = []
        var  DealerCInicial, idDeck, DealerVInicial

        $scope.points = 0
        $scope.DPoints = 0
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
                Vcartas.push(CalculaValor(res.data.cards[0].value))
    
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
            DCartasValor.push(DealerVInicial)
    
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
                novaCartaD()
            } 
            else{
                checkScore()
            }
        } 
        function primeiraMao(){
            $http({
                url: 'https://deckofcardsapi.com/api/deck/'+idDeck+'/draw/?count=4',
                method: 'GET'
            })
            .then((res) => {
                //Jogador
            let p1 = valueCalculator(res.data.cards[0].value)
                let p2 = valueCalculator(res.data.cards[1].value)
    
                let ACE
                if(p1 == 1 || p2 == 1){
                    ACE = true;
                }
    
                Vcartas.push(p1)
                Vcartas.push(p2)
    
                $scope.points += (p1 + p2)
                if(ACE && $scope.points == 11){
                    $scope.points = 21  
                 
                //Dealer
              
                let v1 = valueCalculator(res.data.cartas[2].value)
                let v2 = valueCalculator(res.data.cartas[3].value)
    
                DCartasValor.push(v1)
                DealerVInicial = v2
    
                $scope.botPoints = v1
            }
            })
        }
        
        function novaCartaD(){
            $http({
                url: 'https://deckofcardsapi.com/api/deck/'+idDeck+'/draw/?count=1',
                method: 'GET'
            })
            .then((res) => {
                $scope.DCartas.push(res.data.cards[0].images.png)
    
                DCartasValor.push(CalculaValor(res.data.cards[0].value))
                DCartas++;
                
                let DealerACE
                let count = 0;
                DCartasValor.forEach(carta => {
                    count += carta
    
                    if(carta == 1){
                        DealerACE = true
                    }
                });
    
                if(DealerACE && count <= 11){
                    count += 10
                }
    
                $scope.DPoints = count    
                if($scope.DPoints > $scope.points && $scope.DPoints <= 21){
                    pontos()
                }        
                else if((($scope.DPoints - (DCartas * 2)) <= 11) && DCartas < 6 && $scope.DPoints < 21 && $scope.DPoints < $scope.points && $scope.points <= 21){
                    novaCartaD()
                }else{
                    pontos()
                }
            })
        }
           function pontos() {
            if(($scope.DPoints > 21 && $scope.points > 21) || ($scope.DPoints == $scope.points)){
           }
        
        
        
        
        
        }
 

   
    })


