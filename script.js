$(document).ready(function() {

//what does this do?
    var convert_value_to_string = function(value) {
        if (value > 10 || value == 1) {
            switch (value) {
                case 1:
                    return 'Ace';
                case 11:
                    return 'Jack';
                    break;
                case 12:
                    return 'Queen';
                    break;
                case 13:
                    return 'King';
                    break;
            }
        }
        return value.toString();
    };

//what does this do?
    var deck = [];
    var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
    for (var i = 0; i<suits.length; i++) {
        var suit = suits[i];
        for (var j = 0; j<13; j++) {
            deck.push({number: j+1, suit: suit});
        }
    }
//console.log(deck);

//what does this do?
    var shuffle = function(array) {
        var copy = [];
        var n = array.length;
        var i;
        while (n) { i = Math.floor(Math.random() * array.length);
            if (i in array) {
                copy.push(array[i]);
                delete array[i];
                n--;
            }
        }
        return copy;
    };

//Now call the shuffle function and save the result of what shuffle returns into your deck variable
    var shuffledDeck = shuffle(deck);
    var cards_player_1 = [];
    var cards_player_2 = [];
// write a function called deal that will evenly divide the deck up between the two players
    var deal = function(deck){
        var playerDealtTo = 1;
        for (var index = 0; index<deck.length; index++){
            if(playerDealtTo == 1){
                cards_player_1.push(deck[index]);
                playerDealtTo++;
            }
            else{
                cards_player_2.push(deck[index]);
                playerDealtTo--;
            }
        }
    };
    deal(shuffledDeck);
    /*    console.log("----------------------");
     console.log(cards_player_1);
     console.log(cards_player_1.length);
     console.log("----------------------");
     console.log(cards_player_2);
     console.log(cards_player_2.length);*/
//create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.

    /*Global variable that holds current winner*/
    var currentWinner;



    var war = function(card1, card2){
        if(card1['number'] > card2['number']){
            currentWinner = 1;
            return card1;
        }
        else if (card1['number'] < card2['number']){
            currentWinner = 2;
            return card2;
        }
        else{
            return false;
        }
    };

    /* console.log(war(cards_player_1[0], cards_player_2[0]));*/

    var advance = function(){
        //take the top two cards and display them
        if (cards_player_1.length) {
            var card_1 = cards_player_1[0];
            var card_2 = cards_player_2[0];
            $("#opp-card").html(convert_value_to_string(card_1.number)+" "+card_1.suit);
            $("#opp-card-count").html(cards_player_1.length);
            $("#my-card").html(convert_value_to_string(card_2.number)+" "+card_2.suit);
            $("#my-card-count").html(cards_player_2.length);
        }
    };


//create a play function
//	compare the cards
//	give the winner both cards (at end of deck)
    var play = function(){
        war(cards_player_1[0], cards_player_2[0]);
        if(currentWinner == 1){
            cards_player_1.push(cards_player_1[0], cards_player_2[0]);
            cards_player_1.splice(0, 1);
            cards_player_2.splice(0, 1);
        }
        else if(currentWinner == 2){
            cards_player_2.push(cards_player_2[0], cards_player_1[0]);
            cards_player_1.splice(0, 1);
            cards_player_2.splice(0, 1);
        }
        else {
            cards_player_1.push(cards_player_1[0]);
            cards_player_2.push(cards_player_2[0]);
            cards_player_1.splice(0, 1);
            cards_player_2.splice(0, 1);
        }
        //this function (defined below) will continue to the next turn
        advance();
    };


    advance();

    $(".btn").click(function() {
        play();
    });
});
