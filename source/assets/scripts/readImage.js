var base64 = function(input) {
  File.prototype.convertToBase64 = function(callback) {
    var reader = new FileReader();
    reader.onloadend = function(e) {
      callback(e.target.result, e.target.error);
    };
    reader.readAsDataURL(this);
  };

  var selectedFile = input.files[0];
  selectedFile.convertToBase64(function(base64) {
    $('#file').val(base64);
  })
};
