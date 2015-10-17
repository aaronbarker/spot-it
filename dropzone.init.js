
  // Dropzone


  var dropzone = new Dropzone('body', {
    // previewTemplate: document.querySelector('#preview-template').innerHTML,
    parallelUploads: 2,
    thumbnailHeight: 500,
    thumbnailWidth: null,
    maxFilesize: 3,
    clickable: false,
    url: '/upload',
    filesizeBase: 1000,
    dragenter: function(){
        // console.log("dragenter");
        document.querySelector('#drop-box-overlay').classList.add('show');
    },
    dragover: function(evt){
        // console.log("dragover");
        evt.stopPropagation();
        evt.preventDefault();
    },
    drop: function(){
        // console.log("drop");
        // document.querySelector("#drop-box-overlay").classList.remove('show');
        document.querySelector(".message .instructions").classList.add('hide');
        document.querySelector(".message .processing").classList.remove('hide');
    },
    dragleave: function(evt){
        // console.log("dragleave");
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
    },
    // processing: function(file){
    //     console.log(file);
    //     // document.querySelector('.currentlyProcessing').setAttribute('src',file);
    // },
    queuecomplete:function(){
        // console.log("queuecomplete");
        document.querySelector('#drop-box-overlay').classList.remove('show');
        document.querySelector(".message .instructions").classList.remove('hide');
        document.querySelector(".message .processing").classList.add('hide');
    },
    previewsContainer: '.dropzone-previews',
    thumbnail: function(file, dataUrl) {
      if (file.previewElement) {
        file.previewElement.classList.remove("dz-file-preview");
        var images = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
        for (var i = 0; i < images.length; i++) {
          var thumbnailElement = images[i];
          thumbnailElement.alt = file.name;
          thumbnailElement.src = dataUrl;
          
          // make sure it isn't already in the system
          if(!localStorage.getItem("data:"+file.name)){
              document.querySelector("#itemEntry").value = document.querySelector("#itemEntry").value + "\ndata:"+file.name+","+(file.name.split('.')[0]);
              console.log("file.name",dataUrl.length);
              localStorage.setItem("data:"+file.name,dataUrl);
              document.querySelector('.currentlyProcessing').setAttribute('src',dataUrl);
          } else {
              console.log('already have '+file.name);
          }
        }
        setTimeout(function() { file.previewElement.classList.add("dz-image-preview"); }, 1);
        loadItems();
        listLocal();
        findDataItemsUsed();
      }
    }

  });
  var minSteps = 6,
      maxSteps = 60,
      timeBetweenSteps = 100,
      bytesPerStep = 100000;

  dropzone.uploadFiles = function(files) {
    var self = this;

    for (var i = 0; i < files.length; i++) {

      var file = files[i];
          totalSteps = Math.round(Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep)));

      for (var step = 0; step < totalSteps; step++) {
        var duration = timeBetweenSteps * (step + 1);
        setTimeout(function(file, totalSteps, step) {
          return function() {
            file.upload = {
              progress: 100 * (step + 1) / totalSteps,
              total: file.size,
              bytesSent: (step + 1) * file.size / totalSteps
            };

            self.emit('uploadprogress', file, file.upload.progress, file.upload.bytesSent);
            if (file.upload.progress == 100) {
              file.status = Dropzone.SUCCESS;
              self.emit("success", file, 'success', null);
              self.emit("complete", file);
              self.processQueue();
            }
          };
        }(file, totalSteps, step), duration);
      }
    }
  }


  Dropzone.prototype.filesize = function(size) {
    var units = [ 'TB', 'GB', 'MB', 'KB', 'b' ],
        selectedSize, selectedUnit;

    for (var i = 0; i < units.length; i++) {
      var unit = units[i],
          cutoff = Math.pow(this.options.filesizeBase, 4 - i) / 10;

      if (size >= cutoff) {
        selectedSize = size / Math.pow(this.options.filesizeBase, 4 - i);
        selectedUnit = unit;
        break;
      }
    }

    selectedSize = Math.round(10 * selectedSize) / 10;

    return '<strong>' + selectedSize + '</strong> ' + selectedUnit;

  }
  // filesize: (size) ->
  //   if      size >= 1024 * 1024 * 1024 * 1024 / 10
  //     size = size / (1024 * 1024 * 1024 * 1024 / 10)
  //     string = "TiB"
  //   else if size >= 1024 * 1024 * 1024 / 10
  //     size = size / (1024 * 1024 * 1024 / 10)
  //     string = "GiB"
  //   else if size >= 1024 * 1024 / 10
  //     size = size / (1024 * 1024 / 10)
  //     string = "MiB"
  //   else if size >= 1024 / 10
  //     size = size / (1024 / 10)
  //     string = "KiB"
  //   else
  //     size = size * 10
  //     string = "b"
  //   "<strong>#{Math.round(size)/10}</strong> #{string}"

  dropzone.on('complete', function(file) {
    file.previewElement.classList.add('dz-complete');
  });