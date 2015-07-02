console.log($)
Template.body.onRendered(function(){
  $('input').change(function(e) {
    var canvas = $("canvas");
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
        ctx.drawImage(image, 0, 0);
      }

      // 画像のURLをソースに設定
      image.src = evt.target.result;
    }

    // ファイルを読み込み、データをBase64でエンコードされたデータURLにして返す
    reader.readAsDataURL(file);
  });

  window.download = function(){
    c = document.querySelector('canvas')
    link = document.querySelector('a')
    link.setAttribute('download', 'MintyPaper.jpg');
    link.setAttribute('href', c.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream"));
    link.click();
  }
})