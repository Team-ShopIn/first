
$('.main.home').ready(function () {
  //Submit 버튼 클릭시
  $("#url_Submit").click(function(){
    document.getElementById("url_Submit").disabled = true;
    parsing_url();
    $("#url_Input").val('');
  });

  //URL 엔터키 먹였을때.
  $("#url_Submit").keydown(function(e){
    if(e.keyCode == 13){
      document.getElementById("url_Submit").disabled = true;
      parsing_url();
      $("#url_Input").val('');
    }
    else{}
  });
});

//URL 을 파싱한 뒤
function parsing_url(){
  var url = $("#url_Input").val();
  var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  var urltest = urlRegex.test(url);

  if(urltest){
    //제출이 끝난 후
    //URL 을 축소시킨다.
    submit_url(url);
  }
  else{
    alert("유효하지 않은 URL 주소입니다. 다시 입력해주세요");
  }
}

function submit_url(url){
  $.ajax({
    url:"/",
    type:'POST',
    data:{'url':url},
    success:function(v){
      document.getElementById("url_Submit").disabled = false;
      sweetAlert ({
        title: "상품이 등록되었습니다.",
        text: "해당 상품으로 이동하시겠습니까?",
        type: "success",
        showCancelButton: true,
        cancelButtonText: "다음에 확인",
        confirmButtonColor: "#cd2026",
        confirmButtonText: "바로 확인"
      })
    }
  });
}
