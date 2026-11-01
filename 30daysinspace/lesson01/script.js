// How long the light stays on, and then off, in milliseconds.
// Try changing this number! Please keep it at 200 or more:
// very fast red flashing can be unsafe for some people.
const blinkDelay = 500;

// Find the light on the page
const light = document.getElementById("light");

// If the light is on, turn it off. If it is off, turn it on.
function toggleLight() {
    light.classList.toggle("on");
}

// Run toggleLight again and again, waiting blinkDelay milliseconds each time
setInterval(toggleLight, blinkDelay);
