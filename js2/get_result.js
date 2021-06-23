$(function () {
  $(document).on("click","#buttonAjax",function(){
  $.ajax({
  　type: 'GET',
  　url: '',
  　dataType: 'json',
  　success: function(data) {
  　　　$('#conteiner').html(data['message']);
  　}
  　}).done(function(data1) {

    // 3. キーを指定して値を表示 
    $("conteiner").text(data1["message"]);

    // 4. JavaScriptオブジェクトをJSONに変換
    var data2 = JSON.stringify(data1);
  });
});
})