var fileInput = document.getElementById("image-file");
var imagePreview = document.getElementById("image-preview");
var toggleButton = document.getElementById("toggle-button");

var originalImageSrc = null;

fileInput.addEventListener("change", function() {
  var reader = new FileReader();
  reader.onload = function(e) {
    imagePreview.src = e.target.result;
    originalImageSrc = e.target.result;
  };
  reader.readAsDataURL(fileInput.files[0]);
});

toggleButton.addEventListener("click", function() {
  if (imagePreview.classList.contains("grayscale")) {
    // toggle back to original
    imagePreview.src = originalImageSrc;
    imagePreview.classList.remove("grayscale");
  } else {
    // toggle to grayscale
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = imagePreview.width;
    canvas.height = imagePreview.height;
    context.drawImage(imagePreview, 0, 0);
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
      var r = data[i];
      var g = data[i + 1];
      var b = data[i + 2];
      var grayscale = (r + g + b) / 3;
      data[i] = grayscale;
      data[i + 1] = grayscale;
      data[i + 2] = grayscale;
    }
    context.putImageData(imageData, 0, 0);
    imagePreview.src = canvas.toDataURL();
    imagePreview.classList.add("grayscale");
  }
});
