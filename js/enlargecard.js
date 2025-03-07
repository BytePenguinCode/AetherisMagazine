document.querySelectorAll(".article-img").forEach((img) => {
    let pressTimer;

    // Long press starts
    img.addEventListener("touchstart", (e) => {
        pressTimer = setTimeout(() => {
            img.style.transform = "scale(1.05)";
        }, 500); // Adjust time for long press (500ms)
    });

    // Cancel long press if user moves or releases touch
    img.addEventListener("touchend", () => {
        clearTimeout(pressTimer);
        img.style.transform = "scale(1)";
    });

    img.addEventListener("touchmove", () => {
        clearTimeout(pressTimer);
    });

    img.addEventListener("click", function () {
        this.style.transition =
            "transform 1.5s ease-in-out, opacity 1.5s ease-in-out, background-color 1.5s ease-in-out";
        this.style.transform = "scale(10)"; // Expand the image
        this.style.opacity = 0; // Fade out
        this.style.backgroundColor = "white"; // Fade to white

        setTimeout(() => {
            window.location.href = "card.html"; // Navigate to the new page
        }, 50); // Start navigating after 100ms

        // Reset the image in the background
        setTimeout(() => {
            this.style.transition = "none"; // Remove transition
            this.style.transform = "scale(1)"; // Reset scale
            this.style.opacity = 1; // Reset opacity
            this.style.backgroundColor = "transparent"; // Reset background
        }, 300); // Reset styles after a short delay (before navigation completes)
    });
});
