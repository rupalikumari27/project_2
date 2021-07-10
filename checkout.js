var item_count=0;


$(document).ready(function(){
    $('<h1 class="section_title">Checkout</h1>').appendTo('#checkout_section');
    $('<div id="checkout_cont_wrap" class="checout_countent_wrapper"></div>').appendTo('#checkout_section');
    $('<div id="card_lists" class="card_list"></div>').appendTo('#checkout_cont_wrap');
    $('<h3 id="total_items">Total Items: <span>0</span</h3>').appendTo('#card_lists');
    $('<div id="right_sect" class="right_section"></div>').appendTo('#checkout_cont_wrap');
    $('<h3>Total Amount</h3>').appendTo('#right_sect');
    $('<p id="tot_amt">Amount: Rs<span id="total_amount">0</span></p>').appendTo('#right_sect');
    $('<button id="place_order_button">Place Order</button>').appendTo('#right_sect');



    function itemCardCreator(data) {
        cardWrap = $('<div class="checkout_item_card"></div>').appendTo('#card_lists');
        imgWrap = $('<div class="checkout_card_img"></div>').appendTo(cardWrap);
        $('<img src="'+data.preview+'">').appendTo(imgWrap);
        card_detail = $('<div class="checkout_card_details"></div>').appendTo(cardWrap);
        $('<h4>'+data.name+'</h4>').appendTo(card_detail);
        $('<p>X'+data.count+'</p>').appendTo(card_detail);
        $('<p><span>Amount: Rs </span><span>'+data.price+'</span></p>').appendTo(card_detail);
    }


    var locData = localStorage.getItem("cartData");
    if(locData !== null && locData.length > 0){
        var cart_data = JSON.parse(locData);
        var sumAmt = 0;
        for(var i=0; i<cart_data.length; i++){
            item_count += cart_data[i].count;
            sumAmt += cart_data[i].price;
        }
        $('#cart_item_count').text(item_count);
        $('#total_items').html("Total Items: <span>"+cart_data.length+"</span");
        $('#tot_amt').html("Amount: Rs<span id='total_amount'>"+sumAmt+"</span>");

        for(var j=0; j<cart_data.length; j++){
            itemCardCreator(cart_data[j]);
        }
    }

    $('#place_order_button').on('click', function(){
        var locData = localStorage.getItem("cartData");
        if(locData !== null && locData.length > 0){
            var orderSuccess = new XMLHttpRequest();
            orderSuccess.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/order", true);
            orderSuccess.onreadystatechange = function(){
                if(this.readyState === 4){
                    localStorage.clear();
                    window.location.replace("./orderConfirmation.html");
                }
            }
            orderSuccess.send();
        }
        else{
            alert("No items in your cart. Please add ateast one item to place the order");
        }
    })

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