// Find the parts of the page we want to control
const systems = document.getElementById("systems");

const labLight = document.getElementById("lab-light");
const labStatus = document.getElementById("lab-status");

const cabinLight = document.getElementById("cabin-light");
const cabinStatus = document.getElementById("cabin-status");

const exteriorLight = document.getElementById("exterior-light");
const exteriorStatus = document.getElementById("exterior-status");

// Turn one light on or off, and show it on the screen
function setLight(light, status, isOn) {
    if (isOn) {
        light.classList.add("on");
        status.textContent = "ON";
    } else {
        light.classList.remove("on");
        status.textContent = "OFF";
    }
}

// Runs whenever ANY switch is flipped
function handleSwitch(event) {
    // event.target is the exact switch that was flipped
    const flippedSwitch = event.target;

    // Check which switch it was, and control the matching light
    switch (flippedSwitch.id) {
        case "lab-switch":
            setLight(labLight, labStatus, flippedSwitch.checked);
            break;
        case "cabin-switch":
            setLight(cabinLight, cabinStatus, flippedSwitch.checked);
            break;
        case "exterior-switch":
            setLight(exteriorLight, exteriorStatus, flippedSwitch.checked);
            break;
    }
}

// One listener on the box around the switches. When a switch changes,
// the event "bubbles" up from the switch to this box, so one is enough!
systems.addEventListener("change", handleSwitch);
