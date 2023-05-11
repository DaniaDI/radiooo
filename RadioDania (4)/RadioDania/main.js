// Set up API endpoint
const url = 'http://de1.api.radio-browser.info/json/stations/bycountry/canada';

// Keep track of currently playing audio and current station
let currentAudio = null;
let currentStation = null;

$.ajax(
    {
        contentType: 'application/json',
        method: 'POST',
        url: url,
        data: {
            countrycode: 'CA'
        },
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                const station = data[i];
                const name = station.name;
                const url = station.url;
                const stationElement = createStationElement(name, url);
                $('#radioList').append(stationElement);
            }
        }

    }
);

// Function to create station element
function createStationElement(name, url) {
    const element = $(`
    <div class="radioDiv">
        <button id="buttonRadio" onclick="togglePlay(this, '${url}')">
            <span class="material-symbols-outlined">
                slow_motion_video
            </span>
        </button>
        <p class="nameRadio">${name}</p>
    </div>
    `);
    return element;
}

// Function to toggle play/pause and change icon
function togglePlay(buttonRadio, url) {
    // Get audio element for this URL or create a new one
    let audio = currentAudio;
    if (!audio || audio.src !== url) {
        audio = new Audio(url);
        currentAudio = audio;
    }

    // Toggle play/pause
    if (audio.paused) {
        // Stop any currently playing audio
        if (currentStation) {
            currentStation.find('buttonRadio').html('<span class="material-symbols-outlined"> slow_motion_video </span>');
            if (currentAudio) {
                currentAudio.pause();
            }
        }

        // Play this audio
        audio.play();
        buttonRadio.innerHTML = '<span class="material-symbols-outlined"> stop_circle </span>';
        currentStation = $(buttonRadio).parent();
    } else {
        audio.pause();
        buttonRadio.innerHTML = '<span class="material-symbols-outlined"> slow_motion_video </span>';
        currentStation = null;
    }
}

 

document.querySelectorAll(".radioDiv").forEach(el => el.style.borderBottom = "1px solid #062232");