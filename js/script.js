const track = document.getElementById("articles")
const headerHeight = document.querySelector(".header")?.offsetHeight
const footerHeight = document.querySelector(".footer")?.offsetHeight


window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage
}

window.onmousemove = e => {
    const mouseY = e.clientY;

    if (mouseY < headerHeight || mouseY > window.innerHeight - footerHeight) {
        return; // Don't run the animation if the mouse is near the header or footer
    }

    if(track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
          maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
          nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
          nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, -9), -91)

    track.dataset.percentage = nextPercentage

    track.style.transform = `translateX(${nextPercentage + 50}%)`;

    track.animate({
        transform: `translateX(${nextPercentage + 50}%)`},
    {
        duration: 1300, fill: "forwards"});

    for(const image of track.getElementsByClassName("article-img")) {
        image.animate({
                objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1300, fill: "forwards"});
    }
}