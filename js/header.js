document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".header-right");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("active");
    });
});
