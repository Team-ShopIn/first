var state = 0; // 1 = main 2 = signup
var a = 0; // 1 = '홈으로 가기' 2 = '이용 방법'

$('.main.home').ready(function () {

  is_clicked();

  //화면이 작아졌을 때(모바일 등) 나오는 사이드메뉴 init 함수
  $('.button-collapse').sideNav({
      menuWidth: 300,
      edge: 'left',
      closeOnClick: false
  });

  // '홈으로 가기' 를 클릭했을 때 실행하는 자바스크립트 코드
  if(a == 1){
    //$("#go_ShopIn").css("background-color", "red");
    //$("#go_HowtoUse").css("background-color", "transparent");
  }

  // '이용 방법' 을 클릭했을 때 실행하는 자바스크립트 코드
  else if(a == 2){
    //$("#go_ShopIn").css("background-color", "transparent");
    //$("#go_HowtoUse").css("background-color", "red");
  }

});

// 사이드 바 중 어떤 목록을 클릭했는지 확인
function is_clicked(){
  // '홈으로 가기'
  $("#go_ShopIn").click(function(){
    a = 1;
  });

  // '이용방법'
  $("#go_How").click(function(){
    a = 2;
  });
}
