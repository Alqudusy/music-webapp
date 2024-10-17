const audio = new Audio();
const fileURLs = [
    "musics/Larry_Gaaga_ft_Joeboy_-_Ready_Loadedsongs.com.ng.mp3",
    "musics/Oxlade_ft_Wande_Coal_-_ASUNASA_HOLD_YOUR_WAIST__Loadedsongs.com.ng.mp3",
    "musics/Bella_Shmurda_ft_BOJ_Krizbeatz_-_Mentali_Loadedsongs.com.ng.mp3",
    "musics/Boy_Spyce_-_Shout_Loadedsongs.com.ng.mp3",
    "musics/CKay_-_In_My_Bed_Loadedsongs.com.ng.mp3",
    "musics/Kcee_-_Netfliss_Loadedsongs.com.ng.mp3",
    "musics/Lordeyang_ft_Damo_K_-_Forgive_Me_Loadedsongs.com.ng.mp3",
    "musics/Mr_Say_-_Ewa_Bamijo_(www.NETNAIJA.com).mp3",
    "musics/Phyno_ft_Johnny_Drille_-_Sweet_Karma_Loadedsongs.com.ng.mp3",
    "musics/Shallipopi_-_Free_Service_Loadedsongs.com.ng.mp3"
];

const musicMetadata = [];

fileURLs.forEach((fileUrl, index) => {
    fetch(fileUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.blob();
        })
        .then(blob => {
            window.jsmediatags.read(blob, {
                onSuccess: function(tag) {
                    const tags = tag.tags;
                    const title = tags.title || 'Unknown Title';
                    const artist = tags.artist || 'Unknown Artist';

                    musicMetadata[index] = {
                        title: title,
                        artist: artist,
                        image: tags.picture ? `data:${tags.picture.format};base64,${arrayBufferToBase64(tags.picture.data)}` : 'default-image.png'
                    };

                    const musicItem = document.querySelectorAll('#musics')[index];
                    const titleElement = musicItem.querySelector('#title');
                    const artistElement = musicItem.querySelector('#artist-name');
                    const imgElement = musicItem.querySelector('img');

                    titleElement.textContent = title;
                    artistElement.textContent = artist;
                    imgElement.src = musicMetadata[index].image;
                },
                onError: function(error) {
                    console.log(error);
                }
            });
        })
        .catch(error => {
            console.log("Error fetching the file:", error);
        });
});

function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}
const musicItems = document.querySelectorAll('#musics');


function updateCurrentMusic(index) {
    const currentMusic = musicMetadata[index];
    
    const currentImage = document.getElementById('current-artist-image');
    const currentArtistName = document.getElementById('current-artist-name');
    const currentMusicTitle = document.getElementById('current-music-title');

    currentImage.src = currentMusic.image;
    currentArtistName.textContent = currentMusic.artist;
    currentMusicTitle.textContent = currentMusic.title;
    
    audio.src = fileURLs[index];
    audio.play();
}

musicItems.forEach((musicItem, index) => {
    musicItem.addEventListener('click', () => {
        updateCurrentMusic(index);
    });
});

const playButton = document.getElementById('play-btn');
const backwardButton = document.getElementById('backward');
const forwardButton = document.getElementById('forward');

let currentIndex = 0;

playButton.addEventListener('click', () => {
    upadatePlayPause();
});

function upadatePlayPause() {
    if (audio.paused) {
        audio.play();
        playButton.classList.remove('fa-play');
        playButton.classList.add('fa-pause');
    } else {
        audio.pause();
        playButton.classList.remove('fa-pause');
        playButton.classList.add('fa-play');
    }
}

backwardButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + fileURLs.length) % fileURLs.length;
    updateCurrentMusic(currentIndex);
    upadatePlayPause();
    audio.play();
});

forwardButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % fileURLs.length;
    updateCurrentMusic(currentIndex);
    upadatePlayPause();
    audio.play();
});
const volumeSlider = document.querySelector('#volume');
volumeSlider.addEventListener('input', () => {
    audio.volume = parseFloat(volumeSlider.value) / 100;
});
const seekingElement = document.querySelector('#seeking');
seekingElement.addEventListener('input', function() {
    const seekTime = audio.duration * (this.value / 100);
    audio.currentTime = seekTime;
});

audio.addEventListener('timeupdate', function() {
    const currentTime = (audio.currentTime / audio.duration) * 100;
    seekingElement.value = currentTime;
});