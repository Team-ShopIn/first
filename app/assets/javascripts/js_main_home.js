var state = 0; // 1 = main 2 = help

var pathname = window.location.pathname;

//추후 수정 필요 (routes에 :page_title은 아무거나 입력해도 404page 가 안뜸 specific 하게 지정해줘야함)
if(pathname == "/")
  state = 1;


$('.main.home').ready(function () {

  //화면이 작아졌을 때(모바일 등) 나오는 사이드메뉴 init 함수
  $('.button-collapse').sideNav({
      menuWidth: 300,
      edge: 'left',
      closeOnClick: false
  });

  // 메인화면 ( 샵인소개페이지 ) 일 때 실행하는 자바스크립트 코드
  if(state == 1){
    alert("Shopin State");
  }

});
