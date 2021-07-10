var productData;
var cartData;
var item_count=0;


$(document).ready(function(){
    var locData = localStorage.getItem("cartData");
    if(locData !== null && locData.length > 0){
        var cart_data = JSON.parse(locData);
        for(var i=0; i<cart_data.length; i++){
            item_count += cart_data[i].count;
        }
        $('#cart_item_count').text(item_count);
    }


    function createProductPreview(){
        left_section = $('<div class="left_section"></div>').appendTo('#product_wrapper');
        $('<img id="product_img" src="'+productData.preview+'">').appendTo(left_section);
        right_section = $('<div class="right_section"></div>').appendTo('#product_wrapper');
        $('<div id="prod_detail" class="product_details"></div>').appendTo(right_section);
        $('<h1 id="name">'+productData.name+'</h1>').appendTo('#prod_detail');
        $('<h4 id="brand">'+productData.brand+'</h4>').appendTo('#prod_detail');
        $('<h3>Price: Rs <span id="price">'+productData.price+'</span></h3>').appendTo('#prod_detail');
        $('<div id="descript" class="description"><h3>Description</h3></div>').appendTo('#prod_detail');
        $('<p id="description">'+productData.description+'</p>').appendTo('#descript');
        $('<div id="prod_prev" class="product_preview"></div>').appendTo('#prod_detail')
        $('<h3>Product Preview</h3>').appendTo('#prod_prev');
        $('<div id="pre_img" class="previewImg"></div>').appendTo('#prod_prev');
        for(var i=0; i<productData.photos.length; i++){
            preview_image = $('<img id='+i+' src="'+productData.photos[i]+'" >').appendTo('#pre_img');
            $(preview_image).on('click', function(e){
                $('#product_img').attr('src', productData.photos[e.target.id]);
                for(var j = 0; j<productData.photos.length; j++){
                    if(j == e.target.id){
                        $('#'+j).attr('class', 'active');
                    }
                    else{
                        $('#'+j).attr('class', ' ');
                    }
                } 
                
            })
        }
        
        btnWrap = $('<div class="btn"></div>').appendTo(right_section);
        $('<button id="add_to_cart">Add to Cart</button>').appendTo(btnWrap);
        $(btnWrap).on('click', function() {
            var localData = localStorage.getItem("cartData");
            if(localData === null || localData === undefined || localData === " " || localData.length === 0){
                localData = [productData];
                localData[0].count = 1;
                localStorage.setItem("cartData", JSON.stringify(localData))
                item_count += 1;
                $('#cart_item_count').text(item_count);
            }
            else{
                var local_data = JSON.parse(localData);
                idx = productData.id;
                if(local_data.some(local_data => local_data.id === productData.id)){
                    var pos = local_data.map(function(x) {return x.id; }).indexOf(idx);
                    local_data[pos].count = local_data[pos].count+1;
                    local_data[pos].price = local_data[pos].price + local_data[pos].price;
                    localStorage.setItem("cartData", JSON.stringify(local_data));
                    item_count += 1;
                    $('#cart_item_count').text(item_count);
                }
                else{
                    productData.count = 1;
                    local_data.push(productData);
                    localStorage.setItem("cartData", JSON.stringify(local_data));
                    item_count += 1;
                    $('#cart_item_count').text(item_count);
                }
            }
        })
        $('#0').attr('class', 'active');
    }

    var productDetailsRequest = new XMLHttpRequest();
    productDetailsRequest.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/product/"+window.location.search.split("=")[1], true);
    productDetailsRequest.onreadystatechange = function() {
        if(this.readyState === 3){
            console.log("loading...")
        }
        if(this.readyState === 4){
            productData = JSON.parse(this.responseText);
            createProductPreview();
        }
    }
    productDetailsRequest.send();


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