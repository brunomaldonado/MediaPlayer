import  MediaPlayer  from './mediaPlayer.js';
import AutoPlay from './plugins/autoPlay.js';
import AutoPause from './plugins/autoPause.js';
// import Adds from '../src/plugins/adds.js';

const videoPlayer = document.querySelector('.video_player-container');
const video = document.querySelector('.media');
const playButton = document.querySelector('.play_button');
const pauseButton = document.querySelector('.pause_button');
const volumeRange = document.querySelector('.volume');
const speakerButton = document.querySelector('.speaker_button')
const muteButton = document.querySelector('.mute_button');
const maximizeButton = document.querySelector('#maximize_button')
const minimizeButton = document.querySelector('#minimize_button')
const repeatRecorring = document.querySelector('#repeat_recorring');
const progress = document.querySelector('.video_progress');
const videoParallax = document.querySelector('.video_parallax');

const player = new MediaPlayer({
  el:video, 
  plugins:[new AutoPlay(), new AutoPause(),
]});

video.addEventListener('click', () => player.togglePlay());
playButton.addEventListener('click', () => player.togglePlay());
pauseButton.addEventListener('click', () => player.togglePlay());
speakerButton.addEventListener('click', () => player.toggleMute())
muteButton.addEventListener('click', () => player.toggleMute())
repeatRecorring.addEventListener('click', recorring);
maximizeButton.addEventListener('click', toggleFullscreen);
minimizeButton.addEventListener('click', toggleFullscreen);
videoParallax.addEventListener('click', () => {player.togglePlay()
  videoParallax.style.display = 'none';
})

volumeRange.addEventListener('input', (e) => {
  video.volume = volumeRange.value;

  if(volumeRange.value <=0 ) {
    muteButton.style.display = 'block';
  } else if(volumeRange.value > 0 ) {
    muteButton.style.display = 'none';
  }
})

//service workers
if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
    .register('./sw.js')
    .then(registration => console.log('Service worker registration successful', registration))
    .catch(error => console.error('Service worker registration failed', error))
  })

} else {
  console.log('No service workers are not sopported.')
}

function toggleFullscreen() {

  if(!document.fullscreenElement) {
    videoPlayer.requestFullscreen();
    // document.querySelector('.video_progress').style.width = '98%';
    
    // videoPlayer.style.minWidth = '100%';
    // videoPlayer.style.minHeight = '100%';
    // videoPlayer.style.objectFit = 'cover';
    // videoPlayer.style.position = 'fixed';
    // videoPlayer.style.top = '0';
    // videoPlayer.style.bottom = '0';
  } else {
    document.exitFullscreen();
  }

  // if(videoPlayer.style.transform == 'scale(0.5)') {
  //   videoPlayer.style.transform = 'scale(1)';
  // } else {
  //   videoPlayer.style.transform = 'scale(0.5)';
  // }
}

document.addEventListener('fullscreenchange', function() {
  
  if(!document.fullscreenElement) {

    // videoPlayer.style.width = '100vw';
    // videoPlayer.style.height = '100vh';
    
    // videoPlayer.style.position = 'absolute';
    // videoPlayer.style.top = '50%';
    // videoPlayer.style.left = '50%';
    // videoPlayer.style.transform = 'translate(-50%, -50%)';
    // videoPlayer.style.display = 'block';

    maximizeButton.style.display = 'block';
    minimizeButton.style.display = 'none';
  } else {
    maximizeButton.style.display = 'none';
    minimizeButton.style.display = 'block';
  }
})

video.addEventListener('dblclick', toggleFullscreen);
video.addEventListener('timeupdate', updateTime);

function updateTime() {
  let time = document.querySelector('.time');
  time.innerHTML = `${conversion(video.currentTime)} / ${conversion(video.duration)}`;

  let percentage = (100 * video.currentTime) / (video.duration);
  let progressBar = document.querySelector('.video_progress-filled');
  progressBar.style.width = `${percentage}%`;

  if(percentage == 100) {
    repeatRecorring.style.display = 'block';
    pauseButton.style.display = 'none';
    videoParallax.style.display = 'block';
  }
  // progressdot.style.width = `${percentage}%`;
  
  // 100%  - video.duration
  //  %    - video.currentTime
}

//conrvert minute and seconds
function conversion(seconds) {
  let date = new Date(seconds * 1000);   
  let second = (date.getSeconds() <= 9) ? "0"+date.getSeconds() : date.getSeconds();
  let minute = (date.getMinutes() <= 9) ? "0"+date.getMinutes() : date.getMinutes();
  return `${minute}:${second}`;
}

progress.addEventListener('click', progreesClickPosition);

function progreesClickPosition(e) {
  let clikPosition = e.offsetX;
  // alert(clikPosition);
  let widthNav = document.querySelector('.video_progress').offsetWidth;
  let percentage = (100 * clikPosition) / widthNav;
  let position = Math.floor(video.duration * (percentage / 100));
  video.currentTime = position;

}

repeatRecorring.addEventListener('click', recorring);

function recorring(e) {
  video.currentTime = 0;
  player.togglePlay();
  repeatRecorring.style.display = 'none';
  pauseButton.style.display = 'block';
}