$('.side-nav.fixed').ready(function () {

  // 로그인 / 로그아웃
  $('#nav_info_login_button').click(function(){
    if($('#nav_info_login_button').text() == "로그인")
      logInQuery();
    else{
      logOutQuery();
    }
  });

  // 로그인 시 'Enter' 키 눌렀을 경우
  $('#nav_info_pw').keydown(function(e){
    if(e.keyCode == 13){
      if($('#nav_info_login_button').text() == "로그인") {
        logInQuery();
      }
    }
    else{}
  });

  // url 등록 시 Submit 버튼 클릭했을 경우
  $("#url_Submit").click(function(){
    parsing_url();
    $("#url_Input").val('');
  });

  // url 등록 시 'Enter' 키 눌렀을 경우
  $("#url_Input").keydown(function(e){
    if(e.keyCode == 13){
      parsing_url();
      $("#url_Input").val('');
    }
    else{}
  });

  // 'Add Category' 버튼 클릭했을 경우 모달창 띄움
  $("#add_Category").click(function(){
    $('#category_Modal').openModal();
  });

  // 카테고리 이름 입력 후 Submit 버튼 클릭했을 경우
  $("#category_Submit").click(function(){
    add_category();
    $('#category_Modal').closeModal();
    $("#category_Name_Input").val('');
  });
});

// 로그인
function logInQuery(){
  var user_id = $('#nav_info_id').val();
  var password = $('#nav_info_pw').val();

  $.ajax({
    url: '/login',
    data: {
      user_id:user_id,
      password:password,
    },
    dataType : 'json',
    type: "POST",
    success: function(data) {
      if(data.login == true){
        //$('#nav_info').html("<p style='margin:0px;'>"+data.nickname+"님 즐거운 쇼핑되세요<p>")
        location.reload();
      }
      else{
      }
    },
    failure: function() {
      alert("Unsuccessful");
    }
  });
}

// 로그아웃
function logOutQuery(){
  $.ajax({
    url: '/logout',
    data: {
    },
    type: "POST",
    success: function(data) {
      location.reload();
    },
    failure: function() {
      alert("Unsuccessful");
    }
  });
}

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

// url 분석 후 상품 정보 저장 (상품 이름, 이미지, 가격, 판매 사이트 url)
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

// 파싱된 쇼핑몰 등록했을 경우
function submit_success(title, image, price, url){
  $.ajax({
    url:"/productQuery",
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

// 파싱되지 않은 쇼핑몰 등록했을 경우
function submit_fail(url){
  $.ajax({
    url:"/productQuery",
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

// 카테고리 추가
function add_category(){
  var category_name = $('#category_Name_Input').val();

  $.ajax({
    url: '/addCategory',
    data: { name: category_name },
    type: "POST",
    success: function(data) {
      $('#category_List').append('<li><a href="/category/' + data.id + '" class="go_Specified_Category' + data.id + '" id="go_Specified_Category">' + data.name + '</a></li>');
    }
  });
}
