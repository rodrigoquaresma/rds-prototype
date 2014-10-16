function goNextImg() {
  showNextImage('forward')
  return void(0);
}

function goPrevImg() {
  showNextImage('backward')
  return void(0);
}

function findNextImage(currentImage, direction) {
  var total = $('input#fbpw_total_imgs').val() - 1;
  var currentImage = parseInt(currentImage.val(), 10);

  if (currentImage <= total && direction === "forward") {
    return currentImage + 1;
  } else if (currentImage >= 2 && direction === "backward") {
    return currentImage - 1;
  }
  return null;
}

function showNextImage(direction) {
  var currentImage = $('input#fbpw_current_img');
  var nextImageTarget = findNextImage(currentImage, direction);

  if (nextImageTarget) {
    var displayedImage = $('img#fbpw_img_' + currentImage.val());
    var nextImage = $('img#fbpw_img_' + nextImageTarget)

    displayedImage.hide();
    currentImage.val(nextImageTarget);
    nextImage.show();

    $('input#fbpw_current_img_val').val(nextImage.attr('src'));
    $('#fbpw_total > span').html(nextImageTarget);
  }
}

function emptyFbpwFetchedData() {
  $("#fbpw_fetched_data").slideUp('hide');
  $('input#fbpw_current_img').val(0);
  $('input[name="post[extra_args][picture]"]').val('');
  $('input[name="post[extra_args][caption]"]').val('');
  $('input[name="post[extra_args][name]"]').val('');
  $('input[name="post[extra_args][link]"]').val('');
  try { $('textarea[name="post[extra_args][description]"]').html(''); } catch(err) { }
  return void(0);
}
