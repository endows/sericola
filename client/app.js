Template.body.onRendered(function() {
  $('input').change(function() {

    var preview = document.querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
      preview.src = reader.result;
      createCanvas(reader.result,preview.width,preview.height)
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }

  })
})

function createCanvas(image,width,height){
  canvas = document.createElement('canvas')

  RETIO = 500 / width
  HEIGHT = height * RETIO
  WIDTH = 500

  canvas.height = HEIGHT
  canvas.width = WIDTH

  var img = new Image();
  img.src = image
  var ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0 ,WIDTH,HEIGHT);
  console.log(WIDTH,HEIGHT)
  document.body.appendChild(canvas)
}
