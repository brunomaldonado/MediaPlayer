import  MediaPlayer  from '../../mediaPlayer';
import Adds, { Add } from './adds'

class AddsPlugin {
  private adds: Adds;
  private player: MediaPlayer;
  private media: HTMLMediaElement;
  private currentAdd: Add;
  private addsContainer: HTMLElement;

  constructor() {
    this.adds = Adds.getInstance();
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.addsContainer = document.createElement('div');
  }

  run(player: MediaPlayer) {
    this.player = player;
    this.player.container.appendChild(this.addsContainer);
    this.media = this.player.media;
    this.media.addEventListener('timeupdate', this.handleTimeUpdate);
  }

  private handleTimeUpdate() {
    const currentTime = Math.floor(this.media.currentTime);
    if(currentTime % 30 === 0) {
      this.renderAdds();
    }
  }

  private renderAdds() {
    if(this.currentAdd) {
      return;
    }

    const add = this.adds.getAdds();
    //guardar un registro actual
    this.currentAdd = add;
    console.log(this.currentAdd);
    this.addsContainer.innerHTML = ` 
    <div class="adds">
      <a class="adds__link" href="${this.currentAdd.url}" target="_blank">
        <img class="adds__img" src="${this.currentAdd.imageUrl}" />
        <div class="adds__info">
          <h5 class="adds__title">${this.currentAdd.title}</h5>
          <p class="adds__body">${this.currentAdd.body}</p>
        </div>
      </a>
      <div class="adds__close"><span class="close">x</span></div>
    </div>
  `;

    setTimeout(() => {
      this.currentAdd = null;
      this.addsContainer.innerHTML = ''
    }, 10000)
  }
}

export default AddsPlugin;