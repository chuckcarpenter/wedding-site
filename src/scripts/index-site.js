(function () {
  if (!window.document.querySelector) return !1;
  document.addEventListener("DOMContentLoaded", function () {
    var a = document.getElementById("mobileSelect"),
      b = !0;
    if (!a) return !1;
    a.addEventListener("focus", function () {
      if (!0 === b) {
        b = !1;
        for (var c = 0; c < a.options.length; c++) a.options[c].selected = !1;
        a.blur();
        a.focus();
      }
      setTimeout(function () {
        b = !0;
      }, 200);
    });
    a.addEventListener("change", function () {
      if (!0 === b) {
        for (var c, d = 0; d < a.options.length; d++)
          !0 === a.options[d].selected && (c = a.options[d].value);
        window.location = c;
      }
    });
  });
  window.addEventListener("resize", function () {
    for (
      var a = document.querySelectorAll("img[data-src]"), b = 0;
      b < a.length;
      b++
    )
      ImageLoader.load(a[b]);
  });
})();
