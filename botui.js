var botui = new BotUI('cloth-check');

botui.message.add({
  content: 'わしを呼んだのは君かね？'
}).then(function () {
    return botui.action.button({
      action: [
        {
          text: 'はい',
          value: 'yes'
        },
        {
          text: 'いいえ',
          value: 'no'
        }
      ]
    });
  }).then(function (res) {
    var message;
  
    if (res.value === "yes") {
      message = 'そうか、では着る服に困っているのだな。見てやろう';
    }
    else if (res.value === "no") {
      message = 'では帰りたまえ';
    }
  
    return botui.message.add({
      type: 'html',
      delay: 1000,
      loading: true,
      content: message
    });
  }).then(function (index) {
    return botui.action.button({
      action: [
        {
          text: 'Cool!',
          value: 'cool'
        }
      ]
    });
  }).then(function (index) {
    return botui.message.add({
        type: 'html',
        content:'<input id="cloth_image" type="file" name="example" accept="image/jpeg, image/png">'
    });
  }).then(function () { // wait till its shown
    botui.message.add({ // show next message
      content: 'How are you?',
      delay: 1000,
    });
  }).then(function () { // wait till its shown
    botui.action.button({ // show next message
      action: [
        { // show only one button
          text: 'One',
          value: 'one'
        }
      ]/* ,
      cssClass: 'buttonAjax',
      value="S3へアップロード(Ajax通信)"
   */
    
    });
  }).then(function () { const file = $("#upload-file").prop("files")[0];
  if (
    !/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/.test(file.name) ||
    !/(jpg|jpeg|png|gif)$/.test(file.type)
  ) {
    let errorMsg = $("<div class='alert alert-danger'>");
    errorMsg.append(file.name + "：JPG、GIF、PNG形式の画像ファイルを指定してください");
    $("#msgs").append(errorMsg);
    return;
  }
  const timestamp = new Date().getTime();
  const filename = timestamp + file.name;

  // ボタンを無効にする
  $("#buttonAjax").prop("disabled", true).text("通信中…");

  $.ajax({
    contentType: false,
    type: "PUT",
    url:
      /* "apiゲートウェイのエンドポイントを入れる */",
    cache: false,
    // タイムアウト(ms)時間を設定しないと通信不良時などフリーズする
    timeout: 10000,
    processData: false,
    dataType: "json",
    data: file,
  })
    .done(function (data, textStatus, jqXHR) {
      const duration = 500;
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        duration
      );
      // $("#msgs").empty();
      let cartMsg = $(
        "<div class='alert alert-warning alert-dismissible fade show' role='alert'>"
      );
      cartMsg.append("アップロードしました。");
      let cartCloseButton = $(
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"
      );
      cartCloseButton.append("<span aria-hidden='true'>&times;</span>");
      cartMsg.append(cartCloseButton);
      $("#msgs").append(cartMsg);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      // $("#msgs").empty();
      let errorMsg = $("<div class='alert alert-danger'>");
      errorMsg.append("エラーが発生しました : ");
      errorMsg.append(jqXHR.status);
      errorMsg.append(" ステータス : ");
      errorMsg.append(textStatus);
      errorMsg.append(" 原因 : ");
      errorMsg.append(errorThrown);
      $("#msgs").append(errorMsg);
    })
    .always(function (jqXHR, textStatus) {
      // ボタンを有効にする
      $("#buttonAjax")
        .prop("disabled", false)
        .text("S3へアップロード(Ajax通信)");
    }); // wait till its shown


 
  })