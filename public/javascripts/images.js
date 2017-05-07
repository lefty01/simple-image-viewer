
$(document).ready(function () {
    $('#myCarousel').carousel({
        interval: 0
    })


  //Handles the carousel thumbnails
  $('[id^=carousel-selector-]').click(function () {
    var id_selector = $(this).attr("id");
    try {
      var id = /-(\d+)$/.exec(id_selector)[1];
      console.log(id_selector, id);
      $('#myCarousel').carousel(parseInt(id));
      $(window).scrollTop(0);
    } catch (e) {
      console.log('Regex failed!', e);
    }
  });
  // When the carousel slides, auto update the text
  $('#myCarousel').on('slid.bs.carousel', function (e) {
    var id = $('.item.active').data('slide-number');
    $('#carousel-text').html($('#slide-content-'+id).html());
  });


  $('.deleteme').on('click', deleteImage);

});


function deleteImage(event) {
    event.preventDefault();
    var which_img = $('.carousel-inner .item.active .deleteimage').attr('imgname');
    //var which_num = $('.carousel-inner .item.active').attr('data-slide-number');
    console.log('name: ' + which_img);
    var deleteme = confirm("really delete image: " + which_img);

    // update link
    $("a.deleteme").attr("href", which_img);

    //console.log('delete? ' + deleteme);
    if (deleteme) {
        $.ajax({
            type: 'DELETE',
	    url: '/remove/' + which_img
        }).done(function( response ) {
            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }
        });
    }
    else {
        return false;
    }
    return true;
}
