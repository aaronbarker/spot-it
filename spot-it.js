var randomizeCards = true;
var randomizeItems = true;
var useTimer = true;
var wordCount;
var cardSet;
var urlLoaded = false;


var classHide = 'hide';
var classRight = 'right';
var classWrong = 'wrong';
var classShowLabels = 'showlabels';
var classUsed = 'used';

var output = document.querySelector('#output');
var itemEntry = document.querySelector("#itemEntry");
var body = document.querySelector('body');


function spotIt(words,cardSets){
    wordCount = words.length;
    document.querySelector('.wordsProvided').innerHTML = wordCount;
    var randomNums;
    var cards = [];
    // console.log("word count", wordCount);
    // based on the wordCount, use a different cardSet
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
        // show game trigger
        document.querySelector('.playgamewrapper').classList.remove(classHide);
        
        // show details about what we did with word list
        // document.querySelector('#details').classList.remove(classHide);
        // console.log('CardSet allows for '+cardSet.wordcount+' and you provided '+wordCount);
        if(wordCount > cardSet.wordcount){
            // console.log('Truncating the last ' + (wordCount - cardSet.wordcount));
            words = words.slice(0,cardSet.wordcount);
            wordCount = words.length;
            // console.log("new wordCount is:"+ wordCount);
        }
        document.querySelector('.wordsUsed').innerHTML = wordCount;
        document.querySelector('.numCards').innerHTML = cardSet.totalcards;

        // console.log("Have enought words");
        // console.log(cardSet);
        
        // optionally randomize the cards
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
        cards = createCards(words, wordCount, randomNums);
    } else {
        console.log("You need at least 3 words for this to work");
        document.querySelector('.playgamewrapper').classList.add(classHide);
        // document.querySelector('#details').classList.add(classHide);
        
    }
    // return cards;
    
    output.innerHTML = cards.join(' ');
}

function createCards(words, wordCount, randomNums){
    // console.debug("createCards");
    var cards = [];
    for(var y = 1; y < (wordCount+1); y++){
        var cardNum = typeof randomNums === "object"?randomNums[y-1]:y;
        var curCard = cardSet.cards["card"+cardNum];
        
        cards.push(createCard(cardNum, curCard, words));
    }
    return cards;
}
function createCard(cardNum, curCard, words){
    // console.debug("createCard",curCard);
    var cardCode = '<div class="card card'+ words.length +'" data-card="'+cardNum+'" title="Card '+cardNum+'">';
    // cardCode += '<span class="card__num">Card '+cardNum+'</span>';
    // console.log("Card "+y, curCard);
    
    // optionally randomize the items in the card
    if(randomizeItems){
        curCard = shuffle(curCard);
    }
    cardCode += createItems(curCard, words);
    // console.log("end card");
    cardCode += '</div>';
    
    return cardCode;
}

function createItems(curCard, words){
    // console.debug("createItems",curCard);
    var items = "";
    curCard.forEach(function(wordNum){
        items += createItem(words, wordNum);
    });
    return items;
}
function createItem(words, wordNum){
    var content = words[wordNum];
    var label, content2, image, imageSrc;
    // console.debug("createItem",content);
    if(content.indexOf(",") !== -1){
        content2 = content.split(",");
        // console.log(content2);
        content = content2[0];
        label = content2[1];
        // console.log("has a label", label, content);
    }
    // var regex = /\.(jpg|png|gif|svg)$/;
    if(content.indexOf('http') === 0 || content.indexOf('data') === 0){ // is a URL, so is an image
        // console.debug("image");
        // console.debug("wordNum",wordNum);
        if(content.indexOf('data') === 0){
            imageSrc = localStorage.getItem(content);
            var dataLocal = document.querySelector('li[data-local="'+content+'"]');
            if(dataLocal){
                dataLocal.classList.add(classUsed);
            }
        } else {
            imageSrc = content;
        }
        content = '<img src="'+imageSrc+'"/>';
        if(label) content += '<span class="card__item__label">'+label+'</span>';
    }
    return '<span class="card__item" data-item="'+wordNum+'" title="Item '+wordNum+'">'+content+'</span>';
}

// stolen from some random stack overflow article that I forgot to write down
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

// stuff for entering in the data to be used

// take the data in the entry field and use it to generate the cards and items
function loadItems(){
    var newItems = parseEnteredItems(itemEntry);
    if(newItems.length > 2){
        // console.log(newItems);
        makeShareLink(newItems);
        spotIt(newItems,cardSets);
        if(!urlLoaded){
            document.querySelector('#urlWarning').classList.add(classHide);
        }
        body.classList.add('have-items');
    } else {
        body.classList.remove('have-items');
    }
    findDataItemsUsed();
}

function makeShareLink(newItems){
    var queryString = findBaseString(newItems)+"&size="+(document.querySelector("a[data-size].active").getAttribute("data-size"))+"&rowcount="+(document.querySelector("a[data-rowcount].active").getAttribute("data-rowcount"))+"&showvalues="+(document.querySelector("#showvalues").checked);
    var bookmark = window.location.origin + window.location.pathname + queryString;
    document.querySelector('.sharelink').setAttribute('href',bookmark);
}

function parseEnteredItems(itemEntry){
    itemEntry.value = itemEntry.value.trim();
    var newWords = itemEntry.value;
    // console.log("newWords",newWords,newWords.split("\n"));
    return newWords.split("\n");
}

function setupDemoLinks(){
    [].forEach.call(document.querySelectorAll('[data-demo]'),function(elem){
        elem.addEventListener('click',function(event){
            event.preventDefault();
            itemEntry.value = window[elem.getAttribute('data-demo')].join('\n');
            loadItems();
        });
    });
}

function setupControls(){
    // when we leave the entry field, run loadItems
    itemEntry.addEventListener("blur",loadItems);
    
    // setup all the links that open sections
    var expanders = document.querySelectorAll(".expander");
    [].forEach.call(expanders,function(elem){
        elem.addEventListener('click',function(event){
            event.preventDefault();
            // get the target the expander is pointing at
            var target = elem.getAttribute('href');
            // remove the hiding class from the target
            document.querySelector(target).classList.remove(classHide);
            // remove the triggering link
            elem.parentNode.removeChild(elem);
        });
    });
    
    // setup the show labels checkbox
    var showlabels = document.querySelector("#showvalues");
    showlabels.addEventListener('change',function(){
        if(showlabels.checked){
            body.classList.add(classShowLabels);
        } else {
            body.classList.remove(classShowLabels);
        }
        makeStuffFit();
        loadItems();
    });
}


function init(){
    setupDemoLinks();
    setupControls();
    
    // if we have a printSize defined in the URL, apply it
    var size = getParameterByName('size');
    if(size){
        document.querySelector("a[data-size='"+size+"']").click();
    }
    
    // if we have a printSize defined in the URL, apply it
    var rowcount = getParameterByName('rowcount');
    if(rowcount){
        document.querySelector("a[data-rowcount='"+rowcount+"']").click();
    }
    
    // if we have a printSize defined in the URL, apply it
    var showvalues = getParameterByName('showvalues');
    if(showvalues){
        console.log(showvalues);
        document.querySelector("#showvalues").click();
    }
    
    // if we have a demo defined in the URL, load it up
    var loadDemo = getParameterByName('demo');
    if(loadDemo){
        // console.log("loadDemo",loadDemo);
        itemEntry.value = window[loadDemo].join('\n');
        loadItems();
    }
    
}

document.addEventListener('DOMContentLoaded', init);