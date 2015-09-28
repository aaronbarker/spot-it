var randomizeCards = true;
var randomizeItems = true;
var useTimer = true;
var wordCount;

var classHide = 'hide';
var classRight = 'right';
var classWrong = 'wrong';

var output = document.querySelector('#output');


function spotIt(words,cardSets){
    wordCount = words.length;
    document.querySelector('.wordsProvided').innerHTML = wordCount;
    var randomNums, cardSet;
    var cards = [];
    console.log("word count", wordCount);
    if(wordCount >= 57) {
        cardSet = cardSets.words57;
    } else if (wordCount >= 31){
        cardSet = cardSets.words31;
    } else if (wordCount >= 13){
        cardSet = cardSets.words13;
    } else if (wordCount >= 7){
        cardSet = cardSets.words7;
    } else if (wordCount >= 3){
        cardSet = cardSets.words3;
    }
    if(cardSet){
        document.querySelector('.playgamewrapper').classList.remove(classHide);
        document.querySelector('#details').classList.remove(classHide);
        console.log('CardSet allows for '+cardSet.wordcount+' and you provided '+wordCount);
        if(wordCount > cardSet.wordcount){
            console.log('Truncating the last ' + (wordCount - cardSet.wordcount));
            words = words.slice(0,cardSet.wordcount);
            wordCount = words.length;
            console.log("new wordCount is:"+ wordCount);
        }
        document.querySelector('.wordsUsed').innerHTML = wordCount;
        document.querySelector('.numCards').innerHTML = cardSet.totalcards;

        // console.log("Have enought words");
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
                var regex = /\.(jpg|png|gif)$/;
                if(content.indexOf('http') === 0 && regex.test(content)){// is a URL, so is an image
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
        console.log("You need at least 3 words for this to work");
        document.querySelector('.playgamewrapper').classList.add(classHide);
        document.querySelector('#details').classList.add(classHide);
        
    }
    // return cards;
    
    output.innerHTML = cards.join(' ');
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
function parseImages(){
    // parse through the images and determine if portrait, landscape or square. find the max width, make that the max-height for portraits to try to have some uniformity
    var images = document.querySelectorAll(".cards img");
    var maxWidth = 0;
    var maxHeight = 0;
    console.log(images);
    [].forEach.call(images,function(image){
        image.addEventListener("load",function(){
            if(image.offsetWidth > maxWidth){
                maxWidth = image.offsetWidth;
            }
            // clear out any existing sizing
            image.classList.remove('landscape');
            image.classList.remove('portrait');
            if(image.offsetWidth > image.offsetHeight){
                image.classList.add('landscape');
            } else {
                image.classList.add('portrait');
            }
            image.classList.add('loaded');
            if(document.querySelectorAll(".cards img:not(.loaded)").length === 0){
                console.log("All appear to be loaded");
                console.log("maxWidth:",maxWidth);
                imageAfterLoad(maxWidth,maxHeight);
            }
        });
    });
}

function imageAfterLoad(maxWidth,maxHeight){
    var portraits = document.querySelectorAll("img.portrait");
    var landscapes = document.querySelectorAll("img.landscape");
    var maxHeight = 0;
    [].forEach.call(portraits,function(image){
        // image.style.height = maxWidth+'px';
        if(image.parentNode.offsetHeight > maxHeight){
            maxHeight = image.parentNode.offsetHeight;
        }
    });
    console.log("maxHeight:",maxHeight);
    
    [].forEach.call(landscapes,function(image){
        image.parentNode.style.height = maxHeight+'px';
    });
}

// var result = spotIt(words,cardSets);
// var output = document.querySelector('#output');
// output.innerHTML = result.join(' ');


var itemEntry = document.querySelector("#itemEntry");
function loadItems(){
    var newWords = itemEntry.value;
    console.log("newWords",newWords,newWords.split("\n"));
    spotIt(newWords.split("\n"),cardSets);
    // parseImages();
};
itemEntry.addEventListener("blur",loadItems);
function demoData(){
    [].forEach.call(document.querySelectorAll('[data-demo]'),function(elem){
        console.log(elem);
        elem.addEventListener('click',function(event){
            console.log(1);
            event.preventDefault();
            var demo = elem.getAttribute('data-demo');
            itemEntry.value = window[demo].join('\n');
            loadItems();
        });
    });
}
demoData();