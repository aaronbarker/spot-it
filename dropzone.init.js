
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