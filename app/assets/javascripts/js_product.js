$('.product.cart').ready(function () {
  // '등록순' 정렬 버튼 클릭 시
  $('#cart_products_sorting_time').click(function(){
    sort_time("ok");
  });

  // '높은 가격순' 정렬 버튼 클릭 시
  $('#cart_products_sorting_price_expensive').click(function(){
    sort_price("high");
  });

  // '낮은 가격순' 정렬 버튼 클릭 시
  $('#cart_products_sorting_price_cheap').click(function(){
    sort_price("low");
  });
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

// 상품 정렬 (등록순)
function sort_time(time) {
  $.ajax({
    url:"/cart",
    type:'GET',
    data: { clicked: time },
    datatype: 'json',
    success:function(product){
      $('#cart_products_info').empty();

      for(var i=0; i<product.length; i++){
        var $item = $('<div id="cart_product">');
        $('#cart_products_info').append($item);
        if(product[i].img != null)
          $item.append('<div id="cart_products_info_img"> <img src="' + product[i].img + '"> </div>');
          $item.append('<div id="cart_products_info_name">' + product[i].name + '</div>');
          $item.append('<div id="cart_products_info_price">' + product[i].price + '</div>');
          $item.append('<div id="cart_products_info_time">' + product[i].created_at + '</div>');
          $('#cart_products_info').append('</div>');
      }
    }
  });
}

// 상품 정렬 (가격순)
function sort_price(high_low) {
  $.ajax({
    url:"/sort",
    type:'GET',
    data: { howmuch: high_low },
    datatype: 'json',
    success:function(product){
      $('#cart_products_info').empty();

      for(var i=0; i<product.length; i++){
        var $item = $('<div id="cart_product">');
        $('#cart_products_info').append($item);
        if(product[i].img != null)
          $item.append('<div id="cart_products_info_img"> <img src="' + product[i].img + '"> </div>');
          $item.append('<div id="cart_products_info_name">' + product[i].name + '</div>');
          $item.append('<div id="cart_products_info_price">' + product[i].price + '</div>');
          $item.append('<div id="cart_products_info_time">' + product[i].created_at + '</div>');
          $('#cart_products_info').append('</div>');
      }
    }
  });
}
