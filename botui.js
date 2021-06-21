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
        content:'<p>画像を送ってくれ</p><input id="cloth_image" type="file" name="example" accept="image/jpeg, image/png">'


    });
  })