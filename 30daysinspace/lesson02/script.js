// How long the light stays on, and then off, in milliseconds.
// Try changing this number! Please keep it at 200 or more:
// very fast red flashing can be unsafe for some people.
const blinkDelay = 500;

// Find the parts of the page we want to control
const light = document.getElementById("light");
const lightSwitch = document.getElementById("light-switch");
const lightStatus = document.getElementById("light-status");

// This will remember our running timer, so that we can stop it later
let blinkTimer;

// If the light is on, turn it off. If it is off, turn it on.
function toggleLight() {
    light.classList.toggle("on");
}

// Make the light match the position of the switch
function updateLight() {
    if (lightSwitch.checked) {
        // Switch on: start blinking
        blinkTimer = setInterval(toggleLight, blinkDelay);
        lightStatus.textContent = "BLINKING";
    } else {
        // Switch off: stop the timer, then make sure the light is left off
        clearInterval(blinkTimer);
        light.classList.remove("on");
        lightStatus.textContent = "OFF";
    }
}

// Whenever the switch is flipped, update the light
lightSwitch.addEventListener("change", updateLight);

// Make sure the light is correct as soon as the page loads
updateLight();
