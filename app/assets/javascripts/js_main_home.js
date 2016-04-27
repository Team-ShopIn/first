var state = 0; // 1 = main 2 = signup

$('.main.home').ready(function () {

  setStateAuto();
  $(".done").hide();

  //화면이 작아졌을 때(모바일 등) 나오는 사이드메뉴 init 함수
  $('.button-collapse').sideNav({
      menuWidth: 300,
      edge: 'left',
      closeOnClick: false
  });

  // 메인화면 ( 샵인소개페이지 ) 일 때 실행하는 자바스크립트 코드
  if(state == 1){
    //alert("Shopin State");
  }

  else if(state == 2){
    //alert("SignUp State");
    signUpCheck();
    $('#signUp').click(function(){
      signUpQuery();
    });
  }

});

function setStateAuto(){
  var pathname = window.location.pathname;

  //추후 수정 필요 (routes에 :page_title은 아무거나 입력해도 404page 가 안뜸 specific 하게 지정해줘야함)
  if(pathname == "/"){
    state = 1;
  }
  else if(pathname == "/sign_up"){
    state = 2;
  }
}

function signUpCheck(){
  $('#user_id').focusout(function(){
    if(!$('#user_id').val()){
      $("#user_id_done").text("error_outline");
      $("#user_id_done").css('color', 'red');
      $("#user_id_done").show();
    }
    else{
      $("#user_id_done").text("done");
      $("#user_id_done").css('color', 'green');
      $("#user_id_done").show();
    }
  });

  $('#password').focusout(function(){
    if(!$('#password').val()){
      $("#password_done").text("error_outline");
      $("#password_done").css('color', 'red');
      $("#password_done").show();
    }
    else{
      $("#password_done").text("done");
      $("#password_done").css('color', 'green');
      $("#password_done").show();
    }
  });

  $('#name').focusout(function(){
    if(!$('#name').val()){
      $("#name_done").text("error_outline");
      $("#name_done").css('color', 'red');
      $("#name_done").show();
    }
    else{
      $("#name_done").text("done");
      $("#name_done").css('color', 'green');
      $("#name_done").show();
    }
  });

  $('#email').focusout(function() {
    if(!isEmail($('#email').val())){
      $("#email_done").text("error_outline");
      $("#email_done").css('color', 'red');
      $("#email_done").show();
    }
    else {
      $("#email_done").text("done");
      $("#email_done").css('color', 'green');
      $("#email_done").show();
    }
  });

  $('#nickname').focusout(function(){
    if(!$('#nickname').val()){
      $("#nickname_done").text("error_outline");
      $("#nickname_done").css('color', 'red');
      $("#nickname_done").show();
    }
    else{
      $("#nickname_done").text("done");
      $("#nickname_done").css('color', 'green');
      $("#nickname_done").show();
    }
  });
}

function signUpQuery(){
  var user_id = $('#user_id').val();
  var password = $('#password').val();
  var name = $('#name').val();
  var email = $('#email').val();
  var nickname = $('#nickname').val();

  $.ajax({
    url: '/signUp',
    data: {
      user_id:user_id,
      password:password,
      name:name,
      email:email,
      nickname:nickname
    },
    type: "POST",
    success: function(data) {
      alert("Successful");
      var url = "/";
      $(location).attr('href',url);
    },
    failure: function() {
      alert("Unsuccessful");
    }
  });
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
