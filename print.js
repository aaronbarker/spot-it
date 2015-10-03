var printSizes = document.querySelectorAll('[data-size]');
[].forEach.call(printSizes,function(elem){
    elem.addEventListener('click',function(event){
        event.preventDefault();
        setPrintSize(elem.getAttribute('data-size'));
    });
});
function setPrintSize(size){
    [].forEach.call(printSizes,function(elem){
        document.querySelector('body').classList.remove(elem.getAttribute('data-size'));
    });
    document.querySelector('body').classList.add(size);
    makeStuffFit();
}


// make the images fit
document.querySelector('body').insertAdjacentHTML("beforeend", '<style id="sizeCards"></style>');
var sizeCards = document.querySelector('#sizeCards');
function makeStuffFit(){
    var cards = document.querySelectorAll('.card');
    var breakout = false;
    for(var x = 50; x < 100; x++){
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
                    console.log("breakout!",item, x);
                    breakout = x-1; // go back one since that was the last to fit
                }
            });
        });
        if(breakout) {
            sizeCards.innerHTML = '.card__item img { width:'+breakout+'%; }';
        }
    }
}