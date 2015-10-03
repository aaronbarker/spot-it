// stuff for saving data to localstorage
function saveData(){
    var name = window.prompt("What should we name this set of data?");
    // var name = "test";
    var curData = {};
    curData[name] = parseEntry();
    console.debug(curData);
    var storage = localStorage.getItem("spot-it");
    storage = JSON.parse(storage);
    console.log("storage",storage);
    var result={};
    for(var key in storage) result[key]=storage[key];
    for(var key in curData) result[key]=curData[key];
    console.log("result",result);
    localStorage.setItem("spot-it",JSON.stringify(result));
    readStorage();
}

function readStorage(){
    var storage = localStorage.getItem("spot-it");
    // console.debug(storage);
    storage = JSON.parse(storage);
    // console.debug(storage,storage.length);
    var saves = document.querySelector(".saves");
    saves.innerHTML = "";
    for(var key in storage) {
        // console.debug(key,storage[key]);
        saves.innerHTML += '<li><a href="#d" data-saved="'+key+'" data-data="'+storage[key]+'">'+key+'</a> <a href="#d" class="save-remove" data-key="'+key+'">(delete)</a></li>';
    }
    
    [].forEach.call(document.querySelectorAll('[data-saved]'),function(elem){
        // console.log(elem);
        elem.addEventListener('click',function(event){
            event.preventDefault();
            var data = elem.getAttribute('data-data');
            itemEntry.value = data.replace(/,/g,'\n');
            loadItems();
        });
    });
    [].forEach.call(document.querySelectorAll('.save-remove'),function(elem){
        // console.log(elem);
        elem.addEventListener('click',function(event){
            event.preventDefault();
            var keyToKill = elem.getAttribute('data-key');
            
            var storage = localStorage.getItem("spot-it");
            // console.debug(storage);
            storage = JSON.parse(storage);
            var result={};
            for(var key in storage) {
                if(key !== keyToKill){
                    result[key]=storage[key];
                }
            }
            localStorage.setItem("spot-it",JSON.stringify(result));
            readStorage();
        });
    });
}
readStorage();

document.querySelector('.save-it').addEventListener('click',function(event){
    event.preventDefault();
    saveData();
});
document.querySelector('#saves').classList.remove(classHide)