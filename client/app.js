Template.body.onRendered(function(){
  $('#file').change(function(e) {
    var canvas = $("canvas#image");
    var ctx = canvas[0].getContext("2d");

    // 選択されたファイルを取得
    var file = this.files[0];
    //
    // 画像ファイル以外は処理中止
    if (!file.type.match(/^image\/(png|jpeg|gif)$/)) return;

    var image = new Image();
    var reader = new FileReader();

    // File APIを使用し、ローカルファイルを読み込む
    reader.onload = function(evt) {

      // 画像がloadされた後に、canvasに描画する
      image.onload = function() {
        // ctx.drawImage(image, 0, 0 ,500,500);

        $("canvas#image").css('width',String(image.width))
        $("canvas#image").css('height',String(image.height))
        setTimeout(function(){
          var canvas = $("canvas#image");
          console.log(canvas.css('height'))
          var ctx = canvas[0].getContext("2d");
          ctx.drawImage(image, 0, 0);
        },1000)

      }

      // 画像のURLをソースに設定
      image.src = evt.target.result;
    }

    // ファイルを読み込み、データをBase64でエンコードされたデータURLにして返す
    reader.readAsDataURL(file);
  });

  window.download = function(){
    c = document.querySelector('canvas#image')
    link = document.querySelector('a')
    link.setAttribute('download', 'MintyPaper.jpg');
    link.setAttribute('href', c.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream"));
    link.click();
  }

  $('button').click(function(){
    var text = $('#text').val()
    console.log(text)
    var canvas = $("canvas#line")[0]
    var ctx = canvas.getContext("2d");
    ctx.fillText(text, 10, 75);
    $("canvas").draggable({ containment: 'body'})

  })
})
