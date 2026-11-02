// YouTube only plays embedded videos on pages that have a web address
// (http:// or https://). A file opened by double-clicking it (file://)
// gets "Error 153", so there we let the link open the video on YouTube.
const video = document.getElementById("video");
const pageHasWebAddress = location.protocol === "http:" || location.protocol === "https:";

if (pageHasWebAddress) {
    video.addEventListener("click", function (event) {
        event.preventDefault(); // stay on this page instead of going to YouTube

        const player = document.createElement("iframe");
        player.src = "https://www.youtube.com/embed/" + video.dataset.videoId + "?autoplay=1";
        player.title = "30 Days Lost in Space introduction video";
        player.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
        player.referrerPolicy = "strict-origin-when-cross-origin";
        player.allowFullscreen = true;

        video.replaceWith(player);
    });
}
