var state = 0; // 1 = main 2 = signup

$('.main.home').ready(function () {

  SetStateAuto();

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

    $('#user_id').focusout(function(){
      if(!$('#user_id').val())
        $('.done').attr("visibility", "visible");
    });

    $('#email').focusout(function() {
      if(!isEmail($('#email').val())){
        var a;
      }
      else {
        alert("here");
        $('.done').attr("visibility", "visible");
        $('#donedone').attr("visibility", "visible");
      }
    });
  }

});

function SetStateAuto(){
  var pathname = window.location.pathname;

  //추후 수정 필요 (routes에 :page_title은 아무거나 입력해도 404page 가 안뜸 specific 하게 지정해줘야함)
  if(pathname == "/"){
    state = 1;
  }
  else if(pathname == "/sign_up"){
    state = 2;
  }
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
