$(document).ready(function () {
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);

    $("html, body").animate(
      {
        scrollTop: $target.offset().top,
      },
      100,
      "swing"
    );
  });

  $("#scrollButton").on("click", function () {
    var $target = $("#section1"); // Здесь указываем ID блока, к которому хотим прокрутить страницу
    $("html, body").animate(
      {
        scrollTop: $target.offset().top,
      },
      100,
      "swing"
    );
  });
});
