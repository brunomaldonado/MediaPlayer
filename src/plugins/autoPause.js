
let pauseButton = document.querySelector('.pause_button');
let playButton = document.querySelector('.play_button');
let repeatRecorring = document.querySelector('#repeat_recorring');
const videoParallax = document.querySelector('.video_parallax');

class AutoPause {
  // private threshold: number;
  // pausedByTag: boolean = false;
  // player:mediaPlayer;

  constructor() {
    this.threshold = 0.35;
    this.handleIntersection = this.handleIntersection.bind(this); //bind this establce permanente el this al instacia del objeto.
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.pausedByTag = false;

  }

  run(player) {
    this.player = player;
    const observer = new IntersectionObserver(this.handleIntersection, {
      threshold: this.threshold,
    })

    observer.observe(player.media);

    document.addEventListener('visibilitychange', this.handleVisibilityChange)
  }

   handleIntersection(entries) {
    const entry = entries[0];
    // console.log(entry);

    // const isVisible = entry.intersectionRatio >= this.threshold;
    const isVisible = entry.intersectionRatio >= this.threshold;

    if(isVisible) {
      this.player.play();
      pauseButton.style.display = 'block';
      playButton.style.display = 'none';
      this.pausedByTag = false;
    } else {
      this.player.pause();
      pauseButton.style.display = 'none';
      playButton.style.display = 'block';
      repeatRecorring.style.display = 'none';
      videoParallax.style.display = 'none';

      this.pausedByTag = true;
    }
  }

   handleVisibilityChange() {
    const isVisible = document.visibilityState === 'visible';
    // (isVisible) ? this.player.play() : this.player.pause();
    if(isVisible && !this.pausedByTag) {
      this.player.play();
      // document.querySelector('.pause_button').style.display = 'block';
      pauseButton.style.display = 'block';
      // this.pausedByTag = false;
    } else {
      this.player.pause();
      playButton.style.display = 'none';
      repeatRecorring.style.display = 'none';
      videoParallax.style.display = 'none';


      // document.querySelector('.play_button').style.display = 'none';

    }
    // if(!isVisible && !this.player.paused) {
    //   this.player.pause();
    //   this.pausedByTag = true;
    // }
    // if(isVisible && this.pausedByTag) {
    //   this.player.play();
    //   this.pausedByTag = false;
    // }
  }
}

export default AutoPause;