$('.main.home').ready(function () {
  // Submit 버튼 클릭했을 경우
  $("#url_Submit").click(function(){
    parsing_url();
    $("#url_Input").val('');
  });

  // 'Enter' 키 눌렀을 경우
  $("#url_Input").keydown(function(e){
    if(e.keyCode == 13){
      parsing_url();
      $("#url_Input").val('');
    }
    else{}
  });
});


// 입력한 URL이 유효한지 테스트
function parsing_url(){
  var url = $("#url_Input").val();
  var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  var urltest = urlRegex.test(url);

  // URL이 유효할 경우
  if(urltest){
    Pace.restart();
    analyze(url);
    //submit_url(url);
  }

  //URL이 유효하지 않을 경우
  else{
    alert("유효하지 않은 URL 주소입니다. 다시 입력해주세요");
  }
}

function analyze(url){
  $.ajax({
    type: 'POST',
    crossDomain: true,
    dataType: 'json',
    url: '/findParsing?url=' + encodeURIComponent(url),
    success: function(data,status,xhr){
      if(data.message == "success"){
        submit_success(data.title,data.img,data.price,data.url);
      }
      else{
        submit_fail(url);
      }
    }
  });
}

function submit_success(title, image, price, url){
  $.ajax({
    url:"/cart",
    type:'POST',
    data:{'url' : url, 'title' : title, 'image' : image, 'price' : price},
    success:function(v){
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

function submit_fail(url){
  $.ajax({
    url:"/cart",
    type:'POST',
    data:{'url' : url},
    success:function(v){
      swal({
        title: "상품을 분석중입니다.",
        text: "금방 분석해드리겠습니다",
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "기다리기",
      })
    }
  });
}


// 로그인 상태인지 확인
function logged_in() {
  var log = 0;  // 0 = no_login , 1 = login
  // 현재 사용자의 ID값을 받아옴
  $.ajax({
    url:"/getCurrentUserId",
    type:'POST',
    datatype: 'json',
    success:function(currentId){
      return currentId;
    }
  });
}
