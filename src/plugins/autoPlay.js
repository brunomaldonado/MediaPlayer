// import MediaPlayer from '../mediaPlayer'

// const minimizeButton = document.querySelector('#minimize_button');
// const repeatRecorring = document.querySelector('#repeat_recorring');
const videoParallax = document.querySelector('.video_parallax');

class AutoPlay {
  constructor(video) {
    this.player = video;
  }
  run(player) {
    player.play();
    player.toggleMute();
    // btnPause.style.display = 'block';
    // btnPlay.style.display = 'none';
    document.querySelector('#minimize_button').style.display = 'none';
    document.querySelector('#repeat_recorring').style.display = 'none';
    videoParallax.style.display = 'none';

    // minimizeButton.style.display = 'none';
    // repeatRecorring.style.display = 'none';
    // document.querySelector('.speaker_button').style.display = 'block';
    // document.getElementById('volume').style.display = 'none';
  }

}

export default AutoPlay;