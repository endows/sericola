Template.body.onRendered(function() {
  $('input[type=file]').change(function() {

    var preview = new Image();
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
      preview.src = reader.result;
      createImageCanvas(reader.result,preview.width,preview.height)
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }

  })

  $('button').click(function(){
    var text = $('input[type=text]').val()
    createTextCanvas(text)
  })
})

function createImageCanvas(image,width,height){
  canvas = document.createElement('canvas')
  canvas.id = 'image'

  RETIO = 500 / width
  HEIGHT = height * RETIO
  WIDTH = 500

  canvas.height = HEIGHT
  canvas.width = WIDTH

  var img = new Image();
  img.src = image
  var ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0 ,WIDTH,HEIGHT);
  document.body.appendChild(canvas)
}

window.createTextCanvas = function(text){
  var canvas = document.createElement('canvas')
  canvas.id = 'text'

  var ctx = canvas.getContext('2d')
  canvas.height = 200
  canvas.width = 200
  ctx.strokeText(text, 10, 25)

  document.body.appendChild(canvas)
}

window.merge = function(){
  var base = document.querySelector('canvas#image')
  var layer = document.querySelector('canvas#text')
  var ctx = base.getContext('2d')
  ctx.drawImage(layer,0,0)
}

window.download = function(){
  var canvas = document.querySelector('canvas#image')
  var data_url = canvas.toDataURL("image/png");
  data_url = data_url.replace("image/png", "image/octet-stream");
  window.open(data_url, "save");
}
