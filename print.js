var printSizes = document.querySelectorAll('[data-size]');
[].forEach.call(printSizes,function(elem){
    elem.addEventListener('click',function(event){
        event.preventDefault();
        setPrintSize(elem.getAttribute('data-size'));
        if(document.querySelector('[data-size].active')){
            document.querySelector('[data-size].active').classList.remove('active');
        }
        elem.classList.add('active');
        loadItems();
    });
});
function setPrintSize(size){
    [].forEach.call(printSizes,function(elem){
        document.querySelector('body').classList.remove(elem.getAttribute('data-size'));
    });
    document.querySelector('body').classList.add(size);
    makeStuffFit();
    loadItems();
}

var rowCounts = document.querySelectorAll('[data-rowcount]');
[].forEach.call(rowCounts,function(elem){
    elem.addEventListener('click',function(event){
        event.preventDefault();
        setRowCount(elem.getAttribute('data-rowcount'));
        if(document.querySelector('[data-rowcount].active')){
            document.querySelector('[data-rowcount].active').classList.remove('active');
        }
        elem.classList.add('active');
        loadItems();
    });
});

function setRowCount(count){
    [].forEach.call(rowCounts,function(elem){
        document.querySelector('body').classList.remove('per-row-'+elem.getAttribute('data-rowcount'));
    });
    document.querySelector('body').classList.add('per-row-'+count);
    makeStuffFit();
    loadItems();
}


// make the images fit
document.querySelector('body').insertAdjacentHTML("beforeend", '<style id="sizeCards"></style>');
var sizeCards = document.querySelector('#sizeCards');
function makeStuffFit(){
    var cards = document.querySelectorAll('.card');
    var breakout = false;
    for(var x = 10; x < 100; x++){
        sizeCards.innerHTML = '.card__item img { width:'+x+'%; }';
        [].forEach.call(cards,function(card){
            // console.debug(card);
            var items = card.querySelectorAll('.card__item');
            var cardBottomX = card.offsetTop + card.offsetHeight;
            // console.log('cardBottomX',cardBottomX);
            [].forEach.call(items,function(item){
                // console.log(item);
                var itemBottomX = item.offsetTop + item.offsetHeight;
                // console.log('itemBottomX',itemBottomX);
                if(itemBottomX > cardBottomX && !breakout){
                    // console.log("breakout!",item, x);
                    breakout = x-1; // go back one since that was the last to fit
                }
            });
        });
        if(breakout) {
            sizeCards.innerHTML = '.card__item img { width:'+breakout+'%; }';
        }
    }
}