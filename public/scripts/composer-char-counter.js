$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    const charCount = $('#tweet-text').val().length;
    const sum = 140 - charCount;

    $("output[name='counter']").val(sum);

    if (sum < 0) {
      $("output[name='counter']").css({color: 'red'});
    } else {
      $("output[name='counter']").css({color: '#545149'});
    }
  })
});