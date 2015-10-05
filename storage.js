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
        saves.innerHTML += '<li><a href="#d" data-saved="'+key+'" data-data="'+storage[key].join("^")+'">'+key+'</a> <a href="#d" class="save-remove" data-key="'+key+'">(delete)</a></li>';
    }
    
    [].forEach.call(document.querySelectorAll('[data-saved]'),function(elem){
        // console.log(elem);
        elem.addEventListener('click',function(event){
            event.preventDefault();
            var data = elem.getAttribute('data-data');
            console.log("data",data);
            itemEntry.value = data.replace(/\^/g,'\n');
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

// stuff for accessing data from the URL

// to save on the URL size, lets see if there is a base portion of the strings, usually for images
function findBaseString(newWords){
    function sharedStart(array){ // http://stackoverflow.com/questions/1916218/find-the-longest-common-starting-substring-in-a-set-of-strings/1917041#1917041
        var A= array.concat().sort(), 
        a1= A[0], a2= A[A.length-1], L= a1.length, i= 0;
        while(i<L && a1.charAt(i)=== a2.charAt(i)) i++;
        return a1.substring(0, i);
    }
    var prefix = sharedStart(newWords);
    var croppedWords = [];
    newWords.forEach(function(word){
        croppedWords.push(word.replace(prefix,''));
    });
    
    return '?prefix='+prefix+'&value='+croppedWords.join('|');
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

if(getParameterByName('value')){
    var itemList = getParameterByName('value').split('|');
    var prefix = getParameterByName('prefix');
    itemList = itemList.map(function(item){
        return prefix + item;
    });
    itemEntry.value = itemList.join("\n");
    urlLoaded = true;
    loadItems();
    urlLoaded = false;
    document.querySelector('#urlWarning').classList.remove(classHide);
    
}

// list any locally stored images
function listLocal(){
    var theList = "";
    document.querySelector('.local_show').innerHTML = "";
    for(var key in localStorage) {
        // console.debug(key,localStorage[key]);
        // saves.innerHTML += '<li><a href="#d" data-saved="'+key+'" data-data="'+storage[key]+'">'+key+'</a> <a href="#d" class="save-remove" data-key="'+key+'">(delete)</a></li>';
        if(key.indexOf('data') === 0){
            theList += '<li data-local="'+key+'" title="Remove this image">'+(key.replace("data:",""))+'<br /><img src="'+localStorage[key]+'" width="50" /></li>';
        }
    }
    if(theList.length){
        document.querySelector('.local_show').innerHTML = theList;
        document.querySelector('#local').classList.remove(classHide);
    }
}
listLocal();

function removeLocal(key){
    localStorage.removeItem(key);
    var theItem = document.querySelector('[data-local="'+key+'"]');
    if(theItem && theItem.parentNode){
        theItem.parentNode.removeChild(theItem);
    }
}
document.querySelector('.remove-local-all').addEventListener('click',function(event){
    event.preventDefault();
    for(var key in localStorage) {
        // console.debug(key,localStorage[key]);
        if(key.indexOf('data') === 0){
            removeLocal(key);
        }
    }
});
document.querySelector('.local_show').addEventListener('click',function(event){
    var target = event.target;
    while(target.nodeName !== "HTML"){
        if(target.nodeName === "LI"){ // found the closest LI
            break;
        }
        target = target.parentNode;
        // console.debug("next parent",target);
    };
    removeLocal(target.getAttribute('data-local'));
});