class Music{
  constructor(){
    this.audio = new Audio
    this.buttons_play = document.querySelectorAll('.audio-listen')
    this.buttons_pause = document.querySelectorAll('.audio-mute')


    const that = this
    this.buttons_play.forEach(function(button) {
      button.addEventListener('click', function(){
        that.audio.src = this.dataset.src
        that.audio.play()
        that.buttons_pause.forEach(function(button) {
          button.classList.remove('hide')
        },this)
      })
    }, this);
    
    this.buttons_pause.forEach(function(button) {
      button.addEventListener('click', () => {
        this.audio.pause()
        that.buttons_pause.forEach(function(button) {
          button.classList.add('hide')
        },this)
      })
    }, this);

    this.audio.addEventListener('pause', () => {
      that.buttons_pause.forEach(function(button) {
          button.classList.add('hide')
        },this)
    })

  }

}

const music = new Music()