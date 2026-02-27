(function() {
    emailjs.init("lgvTtfPwnRWXLKzr8");
})();

const playlist = [
    "iu - i stan u",
    "keshi - wantchu",
    "cliff - chemistry",
    "daniel - more than a crush",
    "mr. muffin - you, only you",
    "kanegi. - honestly, maybe",
    "keshi - soft spot",
    "lauv - steal the show",
    "rocco - baby blue",
    "rocco - l.o.v.e"
];

let currentTrackIndex = 0;
const audio = document.getElementById('bg-music');
const trackNameDisplay = document.getElementById('track-name');
const vinyl = document.getElementById('vinyl-disk');
const playPauseBtn = document.getElementById('play-pause');
const volumeSlider = document.getElementById('volume-slider');

function togglePlayer() {
    document.getElementById('music-widget').classList.toggle('hidden');
    document.getElementById('player-ribbon').classList.toggle('hidden');
}

function updateTrack() {
    const track = playlist[currentTrackIndex];
    audio.src = track + ".mp3";
    trackNameDisplay.innerText = track;
    audio.play().then(() => {
        playPauseBtn.innerText = "⏸";
        vinyl.classList.add('spinning');
    }).catch(e => console.log("Playback failed:", e));
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerText = "⏸";
        vinyl.classList.add('spinning');
    } else {
        audio.pause();
        playPauseBtn.innerText = "▶";
        vinyl.classList.remove('spinning');
    }
}

function changeVolume() {
    audio.volume = volumeSlider.value;
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    updateTrack();
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    updateTrack();
}

function createSnow() {
    const container = document.getElementById('snow-container');
    if (container.hasChildNodes()) return;
    const flakes = ['❄', '❅', '❆'];
    for (let i = 0; i < 50; i++) {
        const flake = document.createElement('div');
        flake.className = 'snow';
        flake.innerHTML = flakes[Math.floor(Math.random() * flakes.length)];
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.animationDuration = (Math.random() * 5 + 5) + 's';
        flake.style.fontSize = (Math.random() * 8 + 10) + 'px';
        flake.style.opacity = Math.random() * 0.6 + 0.3;
        container.appendChild(flake);
    }
}

function revealLetter() {
    const flap = document.getElementById('pouch-flap');
    const wrapper = document.getElementById('pouch-wrapper');
    const scene = document.getElementById('letter-scene');
    const photoCol = document.getElementById('photo-col');
    
    flap.style.transform = "rotateX(150deg)";
    
    audio.volume = volumeSlider.value;
    audio.play().then(() => {
        vinyl.classList.add('spinning');
        playPauseBtn.innerText = "⏸";
    }).catch(e => {
        console.log("Audio trigger failed");
    });

    setTimeout(() => {
        wrapper.style.opacity = "0";
        setTimeout(() => {
            wrapper.style.display = "none";
            scene.classList.remove('hidden');
            scene.classList.add('animate-pop');
            photoCol.classList.add('animate-fade-in');
            
            if (audio.paused) {
                audio.play();
                vinyl.classList.add('spinning');
                playPauseBtn.innerText = "⏸";
            }
        }, 400);
    }, 600);
}

function resetLetter() {
    const wrapper = document.getElementById('pouch-wrapper');
    const scene = document.getElementById('letter-scene');
    const flap = document.getElementById('pouch-flap');
    
    audio.pause();
    vinyl.classList.remove('spinning');
    playPauseBtn.innerText = "▶";
    scene.classList.add('hidden');
    wrapper.style.display = "block";
    setTimeout(() => {
        wrapper.style.opacity = "1";
        flap.style.transform = "rotateX(0deg)";
    }, 50);
}

function sendEmail() {
    const btn = document.getElementById('send-btn');
    const messageInput = document.getElementById('reply-message');
    const message = messageInput.value;
    if (message.trim() === "") return;
    btn.innerText = "Sending...";
    btn.disabled = true;
    const params = {
        message: message,
        reply_to: "ryanvalencia709@gmail.com"
    };
    emailjs.send("service_cbjcktj", "template_l9a4rmm", params)
        .then(() => {
            btn.innerText = "Sent!";
            messageInput.value = "";
            setTimeout(() => {
                btn.innerText = "Send";
                btn.disabled = false;
            }, 3000);
        }, (error) => {
            btn.innerText = "Error";
            btn.disabled = false;
        });
}