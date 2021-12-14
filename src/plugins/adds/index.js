import Adds from './adds.js';

class AddsPlugin {
  constructor() {
    this.cleanTime = 10;
    this.Adds = Adds.getInstance();
    this.cleanBanner = this.cleanBanner.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.addsContainer = document.createElement('div');
    // this.closeIcon = document.createElement('span');
    // this.closeIcon.innerHTML = 'x';
    // this.closeIcon.classList.add('close');

    this.div = document.createElement('div');
    this.div.classList.add('adds__close');
    this.closeIcon = document.createElement('span');
    this.closeIcon.className = 'close';
    this.div.appendChild(this.closeIcon);
    this.closeIcon.innerHTML = 'x';
    this.closeIcon.classList.add('close');
  }

  run(player) {
    this.player = player;
    this.player.container.appendChild(this.addsContainer);
    this.media = this.player.media;
    this.media.addEventListener('timeupdate', this.handleTimeUpdate);
  }

   handleTimeUpdate() {
    const currentTime = Math.floor(this.media.currentTime);
    if(currentTime % 30 === 0) {
      this.renderAdds();
    }
  }

   renderAdds() {
    if(this.currentAdd) {
      return;
    }

    this.currentAdd = this.Adds.getAdds();
    this.addsContainer.classList.add('adds');
    console.log(this.currentAdd);
    this.addsContainer.innerHTML = ` 
      <a class="adds__link" href="${this.currentAdd.url}" target="_blank">
        <img class="adds__img" src="${this.currentAdd.imageUrl}" />
        <div class="adds__info">
          <h5 class="adds__title">${this.currentAdd.title}</h5>
          <p class="adds__body">${this.currentAdd.body}</p>
        </div>
      </a>
      `;
      // <div class="adds__close"><span id="close" class="close">x</span></div>
      this.addsContainer.appendChild(this.div);
    // setTimeout(() => {
    //   this.currentAdd = null;
    //   this.addsContainer.innerHTML = ''
    // }, 10000)

    setTimeout(() => 
      this.cleanBanner(true),
      this.cleanTime * 1000);
  }

  cleanBanner(setAddToNull) {
    setAddToNull ? this.currentAdd = null : '';
    this.addsContainer.innerHTML = '';
    this.addsContainer.classList.remove('adds');
  }

  addEventListeners() {
    this.closeIcon.addEventListener('click', () => this.cleanBanner(false));
  }
}

export default AddsPlugin;