angular.module('jogoBlackjack').controller('mainController', function ($scope, $http) {

    $scope.vencedor = 0
    var DCartasValor = []
    var Vcartas = []
    var DealerCInicial, idDeck, DealerVInicial

    $scope.points = 0
    $scope.DPoints = 0
    $scope.novoDeck = () => {
        $http({
            url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
            method: 'GET'
        })
            .then((res) => {
                idDeck = res.data.deck_id
                $scope.points = 0
                $scope.DPoints = 0
                Vcartas = []

                primeiraMao()
            })
    }
    function CalculaValor(value) {
        if (value === 'KING' || value === 'JACK' || value === 'QUEEN') {
            return Number(10)
        }
        else if (value === 'ACE') {
            return Number(1)
        }
        else {
            return Number(value)
        }
    }

    $scope.novaCarta = () => {
        $http({
            url: 'https://deckofcardsapi.com/api/deck/' + idDeck + '/draw/?count=1',
            method: 'GET'
        })
            .then((res) => {
                Vcartas.push(CalculaValor(res.data.cards[0].value))

                let ACE
                let count = 0;
                Vcartas.forEach(carta => {
                    count += carta

                    if (carta == 1) {
                        ACE = true
                    }
                });

                if (ACE && count <= 11) {
                    count += 10
                }
                $scope.points = count
                if ($scope.points > 21) {
                    $scope.parar()
                }
            })
    }
    $scope.parar = () => {


        let DealerACE = false
        if (DealerVInicial == 1 || DCartasValor[0] == 1) {
            DealerACE = true
        }

        $scope.DPoints += DealerVInicial
        if (DealerACE && $scope.DPoints == 11) {
            $scope.DPoints += 10

            pontos()
        }
        else if ($scope.DPoints < 16 && $scope.DPoints < $scope.points) {
            novaCartaD()
        }
        else {
            pontos()
        }
    }
    function primeiraMao() {
        $http({
            url: 'https://deckofcardsapi.com/api/deck/' + idDeck + '/draw/?count=4',
            method: 'GET'
        })
            .then((res) => {
                //Jogador
                let p1 = CalculaValor(res.data.cards[0].value)
                let p2 = CalculaValor(res.data.cards[1].value)

                let ACE
                if (p1 == 1 || p2 == 1) {
                    ACE = true;
                }

                Vcartas.push(p1)
                Vcartas.push(p2)

                $scope.points += (p1 + p2)
                if (ACE && $scope.points == 11) {
                    $scope.points = 21
                }
                //Dealer

                let v1 = CalculaValor(res.data.cards[2].value)
                let v2 = CalculaValor(res.data.cards[3].value)

                DCartasValor.push(v1)

                DCartasValor.push(v2)
                $scope.DPoints = v1 + v2

            })
    }

    function novaCartaD() {
        $http({
            url: 'https://deckofcardsapi.com/api/deck/' + idDeck + '/draw/?count=1',
            method: 'GET'
        })
            .then((res) => {
                

                DCartasValor.push(CalculaValor(res.data.cards[0].value))
                DCartasValor++;

                let DealerACE
                let count = 0;
                DCartasValor.forEach(carta => {
                    count += carta

                    if (carta == 1) {
                        DealerACE = true
                    }
                });

                if (DealerACE && count <= 11) {
                    count += 10
                }

                $scope.DPoints = count
                if ($scope.DPoints > $scope.points && $scope.DPoints <= 21) {
                    pontos()
                }
                else if ((($scope.DPoints - (DCartasValor * 2)) <= 11) && DCartasValor < 6 && $scope.DPoints < 21 && $scope.DPoints < $scope.points && $scope.points <= 21) {
                    novaCartaD()
                } else {
                    pontos()
                }
            })
    }
    function pontos() {
        if ($scope.vencedor == 0) {
            if (($scope.DPoints > 21 && $scope.points > 21) || ($scope.DPoints == $scope.points)) {

                $scope.vencedor = "Empate"
            }
            else {
                if ($scope.points > $scope.DPoints) {
                    if ($scope.points > 21) {
                        $scope.vencedor = "Derrota"
                    }
                    else {
                        $scope.vencedor = "Vitória"
                    }
                }
                else {
                    if ($scope.DPoints > 21) {
                        $scope.vencedor = "Vitória"

                    }
                    else {
                        $scope.vencedor = "Derrota"
                    }
                }

            }
        }

    }

})


