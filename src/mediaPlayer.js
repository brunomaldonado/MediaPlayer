

let pauseButton = document.querySelector('.pause_button');
let playButton = document.querySelector('.play_button');
let muteButton = document.querySelector('.mute_button');
let speakerButton = document.querySelector('.speaker_button');
let repeatRecorring = document.querySelector('#repeat_recorring');
const videoParallax = document.querySelector('.video_parallax');

class MediaPlayer {
  constructor(config) {
    this.media = config.el; 
    this.plugins = config.plugins || []; 
    this.initPlayer();
    this.initPlugins();
  }

  initPlayer() {
    this.container = document.createElement('div');
    this.container.style.position = 'relative';
    // this.container.className = 'video_player-container';
    this.media.parentNode.insertBefore(this.container, this.media);
    this.container.appendChild(this.media);
  }

   initPlugins() {
    this.plugins.forEach(plugin => {
      plugin.run(this);
    })
  }

  play() {
    this.media.play(); 
  }
  pause() {
    this.media.pause();
  }
  togglePlay() {
    if (this.media.paused) {
      this.media.play();
    
      pauseButton.style.display = 'block';
      playButton.style.display = 'none';
      repeatRecorring.style.display = 'none';
      videoParallax.style.display = 'none';


    } else {
      this.media.pause();
      pauseButton.style.display = 'none';
      playButton.style.display = 'block';
      videoParallax.style.display = 'none';

    }
  }

  toggleMute() {
    if(this.media.muted) {
      this.media.muted = false;
      
      muteButton.style.display = 'none'
      speakerButton.style.display = 'block';

    } else {
      this.media.muted = true; 
      
      muteButton.style.display = 'block'
      speakerButton.style.display = 'block';
    }
  }
}



export default MediaPlayer;