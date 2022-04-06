$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    const charCount = $('#tweet-text').val().length;
    const sum = 140 - charCount;

    if (sum < 0) {
      $("output[name='counter']").val(sum).css({color: 'red'});
    } else {
      $("output[name='counter']").val(sum);
    }
  })
});