const track = document.getElementById("articles");
const headerHeight = document.querySelector(".header")?.offsetHeight || 0;
const footerHeight = document.querySelector(".footer")?.offsetHeight || 0;

// new
let isDragging = false;
const dragThreshold = 2; // pixels
let startX = 0;


function handleMouseDown(e) {
    track.dataset.mouseDownAt = e.clientX || e.touches[0].clientX;
    startX = e.clientX || e.touches[0].clientX;
    isDragging = false;
}

function handleMouseUp() {
    // const endX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
    // const dragDistance = Math.abs(endX - startX);
    
    // // Handle click/tap
    // if (!isDragging && dragDistance < dragThreshold) {
    //     const target = e.target.closest('a');
    //     if (target) {
    //         return; // Allow normal link behavior
    //     }
    // }

    // // Prevent navigation if dragging occurred
    // if (isDragging) {
    //     e.preventDefault();
    // }


    // old
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
    isDragging = false;
}

function handleMouseMove(e) {
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;

    // // new
    // if (Math.abs(clientX - startX) > dragThreshold) {
    //     isDragging = true;
    // }

    // old
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
