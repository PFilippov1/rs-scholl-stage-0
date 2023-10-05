'use strict';
const player = document.querySelector('.player')
const playBtn = document.querySelector('.play-button')
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')
const audio = document.querySelector('.audio')
const progress = document.querySelector('.progress')
const progressLine = document.querySelector('.progress-line')
const artist = document.querySelector('.artist')
const song = document.querySelector('.song')
const imageSongWrapper = document.querySelector('.image-song__wrapper')
const imageSong = document.querySelector('.image-song')
const btnImg = document.querySelector('.btn-img')
const playedTime = document.querySelector('.played-time');
const fullTime = document.querySelector('.full-time');
const background = document.querySelector('.wrapper')

// all songs
const songs = [{ artist: 'Beyonce', song: 'Don`t hurt yourself', audioMp3: 'beyonce', album: 'lemonade' },
{ artist: 'Dua Lipa', song: 'Don`t start now', audioMp3: 'dontstartnow', album: 'dontstartnow' }]
// default song
let songIndex = 1




//Init player
function loadSong(audioSong) {
    // artist.innerHTML = audioSong.artist
    // song.innerHTML = audioSong.song

    // rule for (`)

    artist.innerHTML = audioSong.artist.split(' ').map(word => {
        const index = word.indexOf('`');
        console.log(index)
        if (index >= 0 && index < word.length - 1) {
            return word.slice(0, index) + '`' + word[index + 1].toLowerCase() + word.slice(index + 2);
        } else {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    }).join(' ');

    song.innerHTML = audioSong.song.split(' ').map(word => {
        const index = word.indexOf('`');
        if (index >= 0 && index < word.length - 1) {
            return word.slice(0, index) + '`' + word[index + 1].toLowerCase() + word.slice(index + 2);
        } else {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    }).join(' ');



    audio.src = `assets/audio/${audioSong.audioMp3}.mp3`
    // imageSong.scr = `..audio-player/assets/img/${audioSong.album}.png`
    imageSong.src = `assets/img/${audioSong.album}.png`
    // imageSong.setAttribute('src', `assets/img/${audioSong.album}.png`)
    background.style.backgroundImage = `url(assets/img/${audioSong.album}.png)`
    background.style.backgroundRepeat = 'no-repeat';
    background.style.backgroundSize = 'cover';
    background.style.backgroundPosition = 'center';

}
loadSong(songs[songIndex])

window.addEventListener('click', (e) => {
    console.log(e.target)
})

// Play songs
function playSong() {
    player.classList.add('play')
    btnImg.src = 'assets/svg/pause.png'
    audio.play()
}
function pauseSong() {
    player.classList.remove('play')
    btnImg.src = 'assets/svg/play.png'
    audio.pause()
}
playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play')
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

function nextSong() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}
nextBtn.addEventListener('click', nextSong)

function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}

prevBtn.addEventListener('click', prevSong)

//upd progress
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement
    // console.log(duration)
    // console.log(currentTime)
    const percentProgress = (currentTime / duration) * 100
    progressLine.style.width = `${percentProgress}%`
}
audio.addEventListener('timeupdate', updateProgress)

//set progress
function setProgress(e) {
    const width = this.clientWidth
    // console.log(width)
    const coordinateX = e.offsetX
    console.log(coordinateX)
    const duration = audio.duration
    audio.currentTime = (coordinateX / width) * duration
}

progress.addEventListener('click', setProgress)
audio.addEventListener('ended', nextSong)

// =======================================================
//time data

audio.addEventListener('loadeddata', () => {
    const timeCode = getTimeCodeFromNum(audio.duration);
    fullTime.textContent = timeCode;
});

audio.addEventListener('timeupdate', () => {
    const timeCode = getTimeCodeFromNum(audio.currentTime);
    playedTime.textContent = timeCode;
});

function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
    ).padStart(2, 0)}`;
}








