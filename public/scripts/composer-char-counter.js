$( document ).ready(function() {
      var maxLength = 140;
  $('textarea').keyup(function() {
    var length = $(this).val().length;
    var length = maxLength-length;
    $('.counter').text(length);
    if(length < 0){
      $('.counter').css('color', 'red');
    }
    if(length > 0){
      $('.counter').css('color', 'black');
    }
  });
});
