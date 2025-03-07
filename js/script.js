// List of pages where scrolling should be disabled
const noScrollPages = ["/index.html"]; // Adjust based on your structure

if (noScrollPages.includes(window.location.pathname)) {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
} else {
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
}

const track = document.getElementById("articles");
const headerHeight = document.querySelector(".header")?.offsetHeight || 0;
const footerHeight = document.querySelector(".footer")?.offsetHeight || 0;

function handleMouseDown(e) {
    track.dataset.mouseDownAt = e.clientX || e.touches[0].clientX;
}

function handleMouseUp() {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

function handleMouseMove(e) {
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;

    if (clientY < headerHeight || clientY > window.innerHeight - footerHeight) {
        return; // Prevent scrolling when near header or footer
    }

    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - clientX,
        maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained =
            parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(
            Math.min(nextPercentageUnconstrained, -9),
            -91
        );

    track.dataset.percentage = nextPercentage;

    animateTrack(nextPercentage);
}

function handleWheel(e) {
    const delta = e.deltaY * 0.2; // Adjust sensitivity
    const prevPercentage = parseFloat(track.dataset.percentage) || 0;

    const nextPercentageUnconstrained = prevPercentage - delta;
    const nextPercentage = Math.max(
        Math.min(nextPercentageUnconstrained, -9),
        -91
    );

    track.dataset.percentage = nextPercentage;

    animateTrack(nextPercentage);
}

function animateTrack(nextPercentage) {
    track.style.transform = `translateX(${nextPercentage + 50}%)`;

    track.animate(
        {
            transform: `translateX(${nextPercentage + 50}%)`,
        },
        {
            duration: 1300,
            fill: "forwards",
        }
    );

    for (const image of track.getElementsByClassName("article-img")) {
        image.animate(
            {
                objectPosition: `${100 + nextPercentage}% center`,
            },
            { duration: 1300, fill: "forwards" }
        );
    }
}

// Desktop Events
window.addEventListener("mousedown", handleMouseDown);
window.addEventListener("mouseup", handleMouseUp);
window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("wheel", handleWheel);

// Mobile Events
window.addEventListener("touchstart", handleMouseDown);
window.addEventListener("touchend", handleMouseUp);
window.addEventListener("touchmove", handleMouseMove);
