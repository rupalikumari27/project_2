var item_count=0;

$(document).ready(function(){
  var locData = localStorage.getItem("cartData");
  if(locData !== null && locData.length > 0){
      var cart_data = JSON.parse(locData);
      console.log("jkjk",cart_data)
      for(var i=0; i<cart_data.length; i++){
          item_count += cart_data[i].count;
      }
      $('#cart_item_count').text(item_count);
  }

  $('#menu_dropdown').on('mouseover', function(){
    $('#dropdown_list').css('display', 'block');
  })

  $('#menu_dropdown').on('mouseout', function(){
    $('#dropdown_list').css('display', 'none');
  })

  $('#hamburger_icon').on('click', function(){
    $('#dropdown_list').css('display', 'block');
  })

  $('#dropdown_close_icon').on('click', function(){
    $('#dropdown_list').css('display', 'none');
  })

  $('#clothing_redirection').on('click', function(){
    $('#dropdown_list').css('display', 'none');
  })

  $('#accessory_redirection').on('click', function(){
    $('#dropdown_list').css('display', 'none');
  })

  $('#cart_redirection').on('click', function(){
      $('#dropdown_list').css('display', 'none');
  })
})