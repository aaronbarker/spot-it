document.addEventListener('DOMContentLoaded', function(){
		initBrowserWarning();
		initDnD();
});

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
		document.querySelector("#drop-box-overlay").classList.remove('show');
		// document.querySelector("#drop-box-prompt").classList.remove('show');


		// Get the dropped files.
		var files = evt.dataTransfer.files;
        // console.log(files);

		// If anything is wrong with the dropped files, exit.
		if(typeof files == "undefined" || files.length == 0)
			return;

		// document.querySelector("#upload-thumbnail-list").classList.add('show');

		// Process each of the dropped files individually
		for(var i = 0, length = files.length; i < length; i++) {
            // console.log(files[i],files[i].type.match(/(image\/jpeg|image\/gif|image\/png)/));
            if(files[i].type.match(/(image\/jpeg|image\/gif|image\/png)/)){
    			uploadFile(files[i], length);
            } else {
                console.error("wrong filetype");
                alert(files[i].name+" is the wrong filetype. \nOnly .jpg, .gif and .png files are allowed.");
            }
		}
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

			// Make sure the data loaded is long enough to represent a real file.
            if(data.length > 140000){
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
                    localStorage.setItem("data:"+file.name,data);
                    document.querySelector("#itemEntry").value = document.querySelector("#itemEntry").value + "\ndata:"+file.name+","+(file.name.split('.')[0]);
                    loadItems();
                    listLocal();
				}
			}
		};

		// Start reading the image off disk into a Data URI format.
		reader.readAsDataURL(file);
	}