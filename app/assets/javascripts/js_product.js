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

  // 카테고리 삭제 버튼 클릭했을 경우
  $('.delete_Specified_Category').click(function(){
    var id = [];
    id = $(this).attr('class').split(" ");
    var a = id[1];

    delete_category(a);
  });

  // '카테고리에 담기' 버튼 클릭했을 경우
  $('.cart_products_category').click(function(){
    var product_id = [];
    product_id = $(this).attr('class').split(" ");
    var p_id = product_id[1];
    $('#select_category_Modal').openModal();

    // 상품을 담을 카테고리 선택 후
    $('.select_Category').click(function(){
      var category_id = [];
      category_id = $(this).attr('class').split(" ");
      var c_id = category_id[1];

      cart_in_category(p_id, c_id);
    });
  });

  // 상품 수정 버튼 클릭했을 경우
  $('.cart_products_edit').click(function(){
    var product_id = [];
    product_id = $(this).attr('class').split(" ");
    var p_id = product_id[1];

    $(".cart_products_info_name" + p_id).hide();
    $(".div_products_input_edit_name" + p_id).show();
  });

  // 상품 삭제 버튼 클릭했을 경우
  $('.cart_products_delete').click(function(){
    var product_id = [];
    product_id = $(this).attr('class').split(" ");
    var p_id = product_id[1];

    delete_product(p_id);
  });
});

function delete_product(id) {
  var product_id = id;

  sweetAlert ({
      title: "정말 삭제하시겠습니까?",
      type: "warning",
      customClass: a,
      confirmButtonColor: "#cd2026",
      confirmButtonText: "예, 삭제하겠습니다",
      showCancelButton: true,
      cancelButtonText: "아니오, 삭제하지 않습니다",
      closeOnConfirm: false,
      closeOnCancel: false
  },

  function(isConfirm) {
      if(isConfirm) {
        $(".cart_product" + product_id).remove();
          sweetAlert({
              title: "삭제되었습니다.",
              type: "success",
              timer: 1200,
              showConfirmButton: false
          });

          $.ajax({
              url:"/cart/" + product_id,
              type:"DELETE",
              success:function(v) {
              }
          });
      }
      else {
          sweetAlert({
              title: "삭제되지 않았습니다.",
              type: "error",
              timer: 1200,
              showConfirmButton: false
          });
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
          $item.append('<div id="cart_products_category" class="cart_products_category ' + product[i].id + '"> <button> 카테고리에 담기 </button> </div>');
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
          $item.append('<div id="cart_products_category" class="cart_products_category ' + product[i].id + '"> <button> 카테고리에 담기 </button> </div>');
          $item.append('<div id="cart_products_info_name">' + product[i].name + '</div>');
          $item.append('<div id="cart_products_info_price">' + product[i].price + '</div>');
          $item.append('<div id="cart_products_info_time">' + product[i].created_at + '</div>');
          $('#cart_products_info').append('</div>');
      }
    }
  });
}

// 선택한 카테고리에 해당 상품 담기
function cart_in_category(p_id, c_id) {
  $.ajax({
    url:"/sortInCategory",
    data: {
      p_Id: p_id,
      c_Id: c_id
    },
    type:"POST",
    success:function(data) {
      $('#select_category_Modal').closeModal();
    }
  });
}

// 카테고리 삭제
function delete_category(a){
  sweetAlert ({
    title: "정말 삭제하시겠습니까?",
    type: "warning",
    customClass: a,
    confirmButtonColor: "#cd2026",
    confirmButtonText: "예, 삭제하겠습니다",
    showCancelButton: true,
    cancelButtonText: "아니오, 삭제하지 않습니다",
    closeOnConfirm: false,
    closeOnCancel: false
  },

  function(isConfirm) {
    if(isConfirm) {
      var id = $("#category_List").find('.go_Specified_Category' + a);
      $("#category_List").find('.go_Specified_Category' + a).remove();

      sweetAlert({
        title: "삭제되었습니다.",
        type: "success",
        timer: 1200,
        showConfirmButton: false
      });

      $.ajax({
        url:"/category/" + a,
        data: { id: a },
        type:"DELETE",
        success:function(data) {
          window.location = "/cart";
        }
      });
    }
    else {
      sweetAlert({
        title: "삭제되지 않았습니다.",
        type: "error",
        timer: 1200,
        showConfirmButton: false
      });
    }
  });
}

// 상품 정보 수정
function edit_product_info(product_id) {
  var edited_name = $(".div_products_input_edit_name" + product_id).children().val();

  $(".cart_products_info_name" + product_id).html(edited_name);
  $(".cart_products_info_name" + product_id).show();
  $(".div_products_input_edit_name" + product_id).hide();

  $.ajax({
      url:"/cart/" + product_id,
      data: {
              'id': product_id,
              'name': edited_name
            },
      type:"PUT",
      success:function(data) {
      }
  });
}
