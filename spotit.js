var randomizeCards = true;
var randomizeItems = true;
var runGame = true;
var useTimer = false;


var wordCount = words.length;
function spotIt(words,cardSets){
    var randomNums;
    var cards = [];
    console.log("word count", wordCount);
    var cardSet = cardSets["words"+wordCount];
    // cardSet.cards = shuffle(cardSet.cards);
    // TODO: if we have more than a given cardSet numbre, truencate down to that number and notifiy. Or if we are doing onpage entry, have a selector that then shows the correct number of fields. or do we do a textarea with return as a delimiter
    if(cardSet){
        console.log("Have a matching count");
        console.log(cardSet);
        if(randomizeCards){
            // because cards are an object and not an array, we can't really randomize it.  But we can make a new array with the right number of numbers and then randomize that.
            randomNums = [];
            for(var x = 1; x < (wordCount+1); x++){
                randomNums.push(x);
            }
            // console.log("Randomnums before randomization", randomNums);
            randomNums = shuffle(randomNums);
            // console.log("Randomnums before randomization", randomNums);
        }
        for(var y = 1; y < (wordCount+1); y++){
            var cardNum = typeof randomNums === "object"?randomNums[y-1]:y;
            var cardCode = '<div class="card" data-card="'+cardNum+'" title="Card '+cardNum+'">';
            // cardCode += '<span class="card__num">Card '+cardNum+'</span>';
            var curCard = cardSet.cards["card"+cardNum];
            // console.log("Card "+y, curCard);
            // randomize the items in the card, could make optional
            
            if(randomizeItems){
                curCard = shuffle(curCard);
            }
            curCard.forEach(function(wordNum){
                // console.log(wordNum,words[wordNum]);
                var content = words[wordNum];
                // console.log(content.indexOf('http'));
                if(content.indexOf('http') === 0){// is a URL, so is an image
                    // console.debug("image");
                    // console.debug("wordNum",wordNum);
                    content = '<img src="'+words[wordNum]+'"/>';
                }
                cardCode += '<span class="card__item" data-item="'+wordNum+'" title="Item '+wordNum+'">'+content+'</span>';
            });
            // console.log("end card");
            cardCode += '</div>';
            cards.push(cardCode);
        }
    } else {
        console.log("no matching count, try again");
    }
    return cards;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var result = spotIt(words,cardSets);
var output = document.querySelector('#output');
output.innerHTML = result.join(' ');


if (runGame){
    game();
}