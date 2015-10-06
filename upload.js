document.addEventListener('DOMContentLoaded', function(){
		initBrowserWarning();
		initDnD();
});
var imageCount = 0;
var imagesProcessed = 0;

	function initBrowserWarning() {
		var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
		var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

		if(!isChrome && !isFirefox)
			document.querySelector("#browser-warning").classList.add('show');
	}

	function initDnD() {
		// Add drag handling to target elements
		document.querySelector("body").addEventListener("dragenter", onDragEnter, false);
		document.getElementById("drop-box-overlay").addEventListener("dragleave", onDragLeave, false);
		document.getElementById("drop-box-overlay").addEventListener("dragover", noopHandler, false);

		// Add drop handling
		document.getElementById("drop-box-overlay").addEventListener("drop", onDrop, false);

	}

	function noopHandler(evt) {
		evt.stopPropagation();
		evt.preventDefault();
	}

	function onDragEnter(evt) {
		// console.debug("enter");
		document.querySelector("#drop-box-overlay").classList.add('show');
		// document.querySelector("#drop-box-prompt").classList.add('show');
	}

	function onDragLeave(evt) {
		/*
		 * We have to double-check the 'leave' event state because this event stupidly
		 * gets fired by JavaScript when you mouse over the child of a parent element;
		 * instead of firing a subsequent enter event for the child, JavaScript first
		 * fires a LEAVE event for the parent then an ENTER event for the child even
		 * though the mouse is still technically inside the parent bounds. If we trust
		 * the dragenter/dragleave events as-delivered, it leads to "flickering" when
		 * a child element (drop prompt) is hovered over as it becomes invisible,
		 * then visible then invisible again as that continually triggers the enter/leave
		 * events back to back. Instead, we use a 10px buffer around the window frame
		 * to capture the mouse leaving the window manually instead. (using 1px didn't
		 * work as the mouse can skip out of the window before hitting 1px with high
		 * enough acceleration).
		 */
		if(evt.pageX < 10 || evt.pageY < 10 || document.querySelector('body').offsetWidth - evt.pageX < 10  || document.querySelector('body').offsetHeight - evt.pageY < 10) {
			document.querySelector("#drop-box-overlay").classList.remove('show');
			// document.querySelector("#drop-box-prompt").classList.remove('show');
		}
	}

	function onDrop(evt) {
		// console.debug("drop");
		// Consume the event.
		noopHandler(evt);

		// Hide overlay
		// document.querySelector("#drop-box-overlay").classList.remove('show');
		progressShow();
		// document.querySelector("#drop-box-prompt").classList.remove('show');


		// Get the dropped files.
		var files = evt.dataTransfer.files;
        // console.log(files);

		// If anything is wrong with the dropped files, exit.
		if(typeof files == "undefined" || files.length == 0)
			return;

		// document.querySelector("#upload-thumbnail-list").classList.add('show');

		// Process each of the dropped files individually
		imageCount = 0;
		imagesProcessed = 0;
		document.querySelector(".totalToProcess").innerHTML = files.length;
		document.querySelector(".curProcessed").innerHTML = imageCount + 1;
		for(var i = 0, length = files.length; i < length; i++) {
            // console.log(files[i],files[i].type.match(/(image\/jpeg|image\/gif|image\/png)/));
            if(files[i].type.match(/(image\/jpeg|image\/gif|image\/png)/)){
    			uploadFile(files[i], length);
				imageCount++;
				
            } else {
                console.error("wrong filetype");
                alert(files[i].name+" is the wrong filetype. \nOnly .jpg, .gif and .png files are allowed.");
            }
		}
		// need to count how many files, and then hide stuff after the same number of files have been processed
		console.log("imageCount: "+imageCount);

	}
	function progressShow(){
		console.log("remove drop instructions");
		document.querySelector(".instructions").classList.add(classHide);
		console.log("show processing stuff");
		document.querySelector(".processing").classList.remove(classHide);
	}
	function progresHide(){
		console.log("hide overlay");
		document.querySelector("#drop-box-overlay").classList.remove('show');
		console.log("show instructions (for next time)");
		document.querySelector(".instructions").classList.remove(classHide);
		console.log("hide processing");
		document.querySelector(".processing").classList.add(classHide);
	}

	function uploadFile(file, totalFiles) {
		var reader = new FileReader();

		// Handle errors that might occur while reading the file (before upload).
		reader.onerror = function(evt) {
			var message;

			// REF: http://www.w3.org/TR/FileAPI/#ErrorDescriptions
			switch(evt.target.error.code) {
				case 1:
					message = file.name + " not found.";
					break;

				case 2:
					message = file.name + " has changed on disk, please re-try.";
					break;

				case 3:
					messsage = "Upload cancelled.";
					break;

				case 4:
					message = "Cannot read " + file.name + ".";
					break;

				case 5:
					message = "File too large for browser to upload.";
					break;
			}

			// document.querySelector("#upload-status-text").html(message);
            // document.querySelector("#upload-thumbnail-list").innerHTML = message;
		}

		// When the file is done loading, POST to the server.
		reader.onloadend = function(evt){
			// console.debug(evt);
			var data = evt.target.result;
			console.log("Processing:",file.name);
			window.requestAnimationFrame(function(){
				document.querySelector(".currentlyProcessing").setAttribute("src",data);
				document.querySelector(".curProcessed").innerHTML = imagesProcessed + 1;
			});
			// Make sure the data loaded is long enough to represent a real file.
            if(data.length > 140000999){
                // console.log("too big:",file.name);
                alert(file.name+" is too big (larger than 100kb). \nFile not saved or available for use in games.");
            } else
			if(data.length > 128){
				/*
				 * Per the Data URI spec, the only comma that appears is right after
				 * 'base64' and before the encoded content.
				 */
				var base64StartIndex = data.indexOf(',') + 1;

				/*
				 * Make sure the index we've computed is valid, otherwise something 
				 * is wrong and we need to forget this upload.
				 */
				if(base64StartIndex < data.length) {
					// console.debug(data);
                    // document.querySelector("#upload-thumbnail-list").insertAdjacentHTML("beforeend","<div class='upload'>Size: "+data.length+" Filename: "+file.name+"  Usable name: "+(file.name.split('.')[0])+" <br /><img src='"+data+"' /><br /><textarea>"+data+"</textarea></div>");
                    var maxLength = 1000;
                    var newData = data;
                    if(data.length > 100000){
                        for(x=0; x < 10; x++){
                            if(newData.length > 100000){
                                // console.log("Before:",data.length,data.length/1024);
                                // console.log("maxLength:",maxLength);
                                newData = thumbnail(data, maxLength, maxLength);
                                // console.log("After:",newData.length,newData.length/1024);
                                maxLength = maxLength - 50;
                            }
                        }
                    }
                    localStorage.setItem("data:"+file.name,newData);
                    document.querySelector("#itemEntry").value = document.querySelector("#itemEntry").value + "\ndata:"+file.name+","+(file.name.split('.')[0]);
                    loadItems();
                    listLocal();
				}
			}
			imagesProcessed++;
			
			if(imageCount === imagesProcessed){
				progresHide();
			}
		};

		// Start reading the image off disk into a Data URI format.
		reader.readAsDataURL(file);
	}
    
    // from stack overflow, an attempt at resizing images in the browser.  gives kind of noisy results that are big filesize even at small sizes.  A potential worst case fallback, but not a GOOD solution. On computer resize is MUCH better
    function thumbnail(base64, maxWidth, maxHeight) {

      // Max size for thumbnail
      if(typeof(maxWidth) === 'undefined') var maxWidth = 500;
      if(typeof(maxHeight) === 'undefined') var maxHeight = 500;

      // Create and initialize two canvas
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      var canvasCopy = document.createElement("canvas");
      var copyContext = canvasCopy.getContext("2d");

      // Create original image
      var img = new Image();
      img.src = base64;

      // Determine new ratio based on max size
      var ratio = 1;
      var ratioW = 1;
      var ratioH = 1;
      if(img.width > maxWidth)
        ratioW = maxWidth / img.width;
      if(img.height > maxHeight)
        ratioH = maxHeight / img.height;
        
      ratio = Math.min(ratioW, ratioH);
    //   console.log(ratioW,ratioH,ratio);

      // Draw original image in second canvas
      canvasCopy.width = img.width;
      canvasCopy.height = img.height;
      copyContext.drawImage(img, 0, 0);

      // Copy and resize second canvas to first canvas
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
    //   console.log(canvas.height,canvas.width);
      return canvas.toDataURL("image/jpeg", 0.9);

    }