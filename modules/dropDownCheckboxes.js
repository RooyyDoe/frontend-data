// show dropdown on link click
$('.select-choose__link').click(function() {
    $(this).next('.select-choose__list').slideToggle('fast');
    return false;
  });

  // $('.select-choose__item input[type=checkbox]').each(function() {
  //   // value of clicked checkbox
  //   var thisVal = $(this).attr('value') + ', ';
  //   $(this).change(function() {
  //     //current value of our "select"
  //     var currentText = $('.select-choose').find('.select-choose__title').val();
  //     if ( $(this).is(':checked') ) {
  //       // if checkbox checked append his value to select
  //       currentText = currentText + thisVal;
  //     } else {
  //       // if checkbox unactive remove her value from select
  //       currentText = currentText.replace(thisVal, '');
  //     }
  //     $(this).closest('.select-choose').find('.select-choose__title').val(currentText);
  //   })
  // })