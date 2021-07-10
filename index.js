var carouselData = [
    {
      id: 1,
      url: "./assets/Carousel1.png",
    },
    {
      id: 2,
      url: "./assets/Carousel2.png",
    },
    {
      id: 3,
      url: "./assets/Carousel3.png",
    },
    {
      id: 4,
      url: "./assets/Carousel4.png",
    }
  ]
  
  var itemsData = [];
  var item_count=0;
  
  
  $(document).ready(function(){
    $('<section id="carousel_section"></section>').appendTo('#main');
    $('<div id="carousel_wrapper" class="carousel"></div>').appendTo("#carousel_section")
    $('<section id="clothing_section" class="product_Section"></section>').appendTo("#main");
    $('<h3 class="section_title">Clothing for Men and Women</h3>').appendTo('#clothing_section');
    $('<div id="clothing_wrapper" class="products_wrapper"></div>').appendTo('#clothing_section');
    $('<section id="accessory_section" class="product_Section"></section>').appendTo('#main');
    $('<h3 class="section_title">Accessories for Men and Women</h3>').appendTo('#accessory_section');
    $('<div id="accessories_wrapper" class="products_wrapper"></div>').appendTo('#accessory_section');
  
  
    var locData = localStorage.getItem("cartData");
    if(locData !== null && locData.length > 0){
        var cart_data = JSON.parse(locData);
        for(var i=0; i<cart_data.length; i++){
            item_count += cart_data[i].count;
        }
        $('#cart_item_count').text(item_count);
    }
  
  
    function createCarousel(data) {
      $('<img src='+data.url+' >').appendTo('#carousel_wrapper');
    }
  
  
    function createItemCards(data){
      cardWrapper = $('<a class="each_product_wrapper" href="./productDetails.html?idx='+data.id+'" ></a>');
      $('<img src="'+data.preview+'"></img>').appendTo(cardWrapper)
      cardDetail = $('<div class="product_data_wrapper"></div>').appendTo(cardWrapper);
      $('<h4>'+data.name+'</h4>').appendTo(cardDetail);
      $('<h5>'+data.brand+'</h5>').appendTo(cardDetail);
      $('<p>RS '+data.price+'</p>').appendTo(cardDetail);
  
      if(data.isAccessory){
        $('#accessories_wrapper').append(cardWrapper);
      }
      else{
        $('#clothing_wrapper').append(cardWrapper);
      }
    }
  
    
  
    for(var i=0; i<carouselData.length; i++){
      createCarousel(carouselData[i])
    }
  
    var prodData = new XMLHttpRequest();
    prodData.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/product", true);
    prodData.onreadystatechange = function() {
      if(this.readyState === 4){
        itemsData = JSON.parse(this.responseText);
        for(var k=0; k<itemsData.length; k++){
          createItemCards(itemsData[k]);
        }
      }  
    }
    prodData.send();
  
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
  
    $('.carousel').slick({
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      dots: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0',
            slidesToShow: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0',
            slidesToShow: 1
          }
        }
      ]
    });
  
  })




