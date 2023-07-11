document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(".image-checkbox");

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      checkboxes.forEach(function (cb) {
        if (cb !== checkbox) {
          cb.checked = false;
        }
      });
    });
  });
});
