function game(){
    var card1, card2;
    // show only two cards
    
    // show two random cards
    var cardNums = showTwo();
    var numCorrect = 0;
    var maxCorrect = 10;
    var correctElem = document.querySelector('.num-correct');
    correctElem.innerHTML = numCorrect;
    
    document.querySelector('.cards').classList.add('game')

    
    // add onlcick to items
    var body = document.querySelector("body");
    body.addEventListener("click",function(event){
        var curElem = event.target;
        // figure out which item was clicked, may need to go up the chain
        var theCard = closestWithClass(curElem,"card");
        var theCardItem = closestWithClass(curElem,"card__item");
        if(theCardItem){
            // console.log("The card",theCard);
            // console.log("The card item",theCardItem);
            var itemNum = theCardItem.getAttribute("data-item");
            // console.log("The itemNum",itemNum);
            var cardNum = theCard.getAttribute("data-card");
            var otherCard = document.querySelector('.card:not(.hide):not([data-card="'+cardNum+'"])');
            // console.log("The otherCard",otherCard);
            
            // does the otherCard have the itemNum in it?
            var matchingItem = otherCard.querySelector('[data-item="'+itemNum+'"]');
            // console.debug("matchingItem",matchingItem);
            if(matchingItem) {
                theCardItem.classList.add(classRight);
                matchingItem.classList.add(classRight);
                
                numCorrect++;
                correctElem.innerHTML = numCorrect;
                if(numCorrect === maxCorrect){
                    done();
                } else {
                    // clear out the right/wrong and show a new card, after X time
                    setTimeout(function(){
                        nextRound(otherCard);
                    },500);
                }
            } else {
                theCardItem.classList.add(classWrong);
            }
        }
    });
    if(useTimer){
        timer();
    }
}
function showTwo(){
    // hiden em all first
    var cards = document.querySelectorAll(".card");
    [].forEach.call(cards,function(card){
        // console.log(card);
        card.classList.add(classHide);
    });
    card1 = Math.floor(Math.random() * wordCount)+1;
    card2 = Math.floor(Math.random() * wordCount)+1;
    // make sure they aren't the same number
    while(card1 === card2){
        card2 = Math.floor(Math.random() * wordCount)+1;
    }
    // console.debug(card1,card2);
    document.querySelector('[data-card="'+card1+'"]').classList.remove(classHide);
    document.querySelector('[data-card="'+card2+'"]').classList.remove(classHide);
    
    return [card1,card2];
}
function showOne(){
    // keep the passed one on, hide the other one, and show one new one.
    var cardLeft = document.querySelector('.card:not(.hide)');
    card1 = parseInt(cardLeft.getAttribute('data-card'),10);
    card2 = Math.floor(Math.random() * wordCount)+1;
    while(card1 === card2){
        card2 = Math.floor(Math.random() * wordCount)+1;
    }
    // console.debug("Keeping ",card1,"Adding ",card2, typeof card1, typeof card2);
    document.querySelector('[data-card="'+card2+'"]').classList.remove(classHide);
}
function nextRound(cardToRemove){
    console.debug("Next round...");
    // clear out right and wrong classes
    [].forEach.call(document.querySelectorAll('.'+classRight),function(elem){
        elem.classList.remove(classRight);
    });
    if(document.querySelectorAll('.'+classWrong).length){
        [].forEach.call(document.querySelectorAll('.'+classWrong),function(elem){
            elem.classList.remove(classWrong);
        });
    }
    // console.log("Removing",cardToRemove);
    cardToRemove.classList.add(classHide);
    showOne();
    
}
function closestWithClass(elem,theClass){
	//console.debug("ClosestClass: checking",elem, "for:"+theClass);
	while(elem.nodeName !== "HTML"){
		// console.debug(target,target[0]);
		if(elem.classList.contains(theClass)){ 
			// console.debug("in pf-search");
			return elem;
		}
		elem = elem.parentNode;
		// console.debug("next parent",elem);
	}
}
function done(){
    stop();
    document.querySelector("body").removeEventListener("click");
}

function timer(){
    show();
    reset();
    start();
}
document.querySelector("#playgame").addEventListener("click",function(event){
    event.preventDefault();
    game();
    document.querySelector("#gamestuff").classList.remove(classHide);
});