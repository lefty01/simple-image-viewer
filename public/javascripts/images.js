
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


    $('.delete_image').on('click', 	deleteImage);

});


function deleteImage(event) {
    event.preventDefault();
    var deleteme = confirm("really delete image: " + $(this).attr('id'));
    //console.log('delete? ' + deleteme);
    if (deleteme) {
        $.ajax({
            type: 'DELETE',
            url: '/remove/' + $(this).attr('id')
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
