/* Port Hueneme Pro Plumbing: single script. Breakpoint matches CSS (900px). */
(function () {
  "use strict";

  var toggle = document.getElementById("mob-toggle");
  var drawer = document.getElementById("mob-drawer");
  var overlay = document.getElementById("mob-overlay");
  var closeBtn = document.getElementById("drawer-close");

  function openDrawer() {
    drawer.classList.add("is-open");
    overlay.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation menu");
    document.documentElement.style.overflow = "hidden";
    if (closeBtn) { closeBtn.focus(); }
  }
  function closeDrawer() {
    drawer.classList.remove("is-open");
    overlay.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
    document.documentElement.style.overflow = "";
  }

  if (toggle && drawer && overlay) {
    toggle.addEventListener("click", function () {
      if (toggle.getAttribute("aria-expanded") === "true") { closeDrawer(); } else { openDrawer(); }
    });
    if (closeBtn) { closeBtn.addEventListener("click", closeDrawer); }
    overlay.addEventListener("click", closeDrawer);
    var links = drawer.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) { links[i].addEventListener("click", closeDrawer); }
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeDrawer(); } });
    if (window.matchMedia) {
      var mq = window.matchMedia("(min-width: 901px)");
      var onChange = function (e) { if (e.matches) { closeDrawer(); } };
      if (mq.addEventListener) { mq.addEventListener("change", onChange); } else if (mq.addListener) { mq.addListener(onChange); }
    }
  }

  /* FAQ accordion: max-height toggle, content stays in the DOM */
  var buttons = document.querySelectorAll(".faq-q button");
  for (var b = 0; b < buttons.length; b++) {
    buttons[b].addEventListener("click", function () {
      var item = this.closest(".faq-item");
      var open = item.classList.toggle("is-open");
      this.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* Floating call button hides while the footer is on screen */
  var fab = document.querySelector(".float-call");
  var foot = document.querySelector(".site-footer");
  if (fab && foot && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { fab.classList.toggle("is-hidden", en.isIntersecting); });
    }, { threshold: 0.05 });
    io.observe(foot);
  }
})();
