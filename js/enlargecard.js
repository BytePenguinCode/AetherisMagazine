document.querySelectorAll(".article-img").forEach((img) => {
    img.addEventListener("click", function () {
        // Apply scaling and fading to white simultaneously
        this.style.transition =
            "transform 1.5s ease-in-out, opacity 1.5s ease-in-out, background-color 1.5s ease-in-out";
        this.style.transform = `scale(10)`; // Expand the image to fill the screen
        this.style.opacity = 0; // Fade out the image
        this.style.backgroundColor = "white"; // Fade to white

        // Wait for the transition to finish and then navigate to the new page
        setTimeout(() => {
            window.location.href = "card.html"; // Navigate to the new page
        }, 100); // Wait for the full transition duration before redirecting (1.5 seconds)
    });
});
