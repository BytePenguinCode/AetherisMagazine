document.querySelectorAll(".article-img").forEach((img) => {
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
