$('.main.home').ready(function () {

});

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
