class Framework{
  constructor(container, fixed){
    this.container        = container
    this.fixed            = fixed
    this.container_story  = container.querySelector('.container--story')
    this.timeline         = document.querySelector('.timeline')
    this.buttons_next     = document.querySelectorAll('.next')
    this.buttons_prev     = document.querySelectorAll('.prev')
    this.sections         = container.querySelectorAll('.container--section, .container--story--row-civil .container--story--section')
    this.mafia_sections   = container.querySelectorAll('.container--story--row-mafia .container--story--section')
    this.button_scroll    = document.querySelector('.fixed-vertical-control')
    
    this.current_index    = 0
    this.previous_index   = undefined
    
    this.current_chapter  = 0

    this.current_section  = 0
    this.previous_section = 0

    this.chapters         = document.querySelectorAll('.timeline--part')
    this.chapter_prev     = document.querySelectorAll('.chapter-prev')
    this.chapter_next     = document.querySelectorAll('.chapter-next')
    this.timeline         = document.querySelector('.timeline')
    this.timelines_fill   = document.querySelectorAll('.timeline--container--seek-bar-fill')
    this.buttons_sections = document.querySelectorAll('.timeline--container--pin')
    this.previous_button  = undefined

    this.button_split     = document.querySelector('.mafia-scroll')

    this.buttons_prev.forEach(function(button) {
      button.addEventListener('click', (e) => {
        e.preventDefault()    
        if(this.current_index > 0){
          this.previous_index = this.current_index    
          this.current_index -= 1
          this.current_chapter -= 1
          this.current_section = 3
          this.previous_section = 3
          this.timeline.style.transform = 'translateX(-'+ (this.current_chapter * 100) +'vw)'
          this.buttons_sections.forEach(function(element) {
            element.classList.remove('active')
          }, this);      
          this.timelines_fill[this.current_chapter].style.transform = 'scaleX(.8)'
          this.buttons_sections[(3 * this.current_chapter + this.current_section) - 1].classList.add('active')
          this.select()
        }
      })
    }, this)

    this.buttons_next.forEach(function(button) {
      button.addEventListener('click', (e) => {
        e.preventDefault()
        if(this.current_index < this.sections.length - 1){
          this.previous_index = this.current_index
          this.current_index += 1
          this.select()

          if(this.current_index >= 3 ){
            this.current_section  = (this.current_index - 3) % 4
            if(this.previous_section == 3 && this.current_section == 0){
              this.current_chapter += 1
              this.timeline.style.transform = 'translateX(-'+ (this.current_chapter * 100) +'vw)'

              this.buttons_sections.forEach(function(element) {
                element.classList.remove('active')
              }, this);
              this.timelines_fill[this.current_chapter].style.transform = 'scaleX('+ (this.buttons_sections[3 * this.current_chapter].getBoundingClientRect().left / window.innerWidth) +')'
              this.buttons_sections[3 * this.current_chapter].classList.add('active')

            }
            else{
              if(this.current_section >= 1 && this.current_section <= 3){           
                this.buttons_sections.forEach(function(element) {
                    element.classList.remove('active')
                }, this);
                this.timelines_fill[this.current_chapter].style.transform = 'scaleX('+ (this.buttons_sections[3 * this.current_chapter + this.current_section -1].getBoundingClientRect().left / window.innerWidth) +')'
                this.buttons_sections[3 * this.current_chapter + this.current_section-1].classList.add('active')
              }
            }
            this.previous_section = this.current_section
          }
        }
      })
    }, this)

    this.button_scroll.addEventListener('click', (e) => {
      e.preventDefault()
      this.button_scroll.classList.toggle('rotate')
      this.container_story.classList.toggle('scrolled')
      this.mafia_sections[this.current_index-3].classList.add('active')
      this.sections[this.current_index].classList.add('active')
      if(this.current_index === 9){
        if(this.button_scroll.classList.contains('rotate')){
          video_mafia.play()
          video_civil.pause()
        }
        else{
          video_mafia.pause()
          video_civil.play()
        }
      }

      music.audio.pause()

      let effect = new Audio
      effect.src = 'assets/audio/scroll.mp3'
      effect.volume = 0.1     
      effect.play()
    })


    this.chapter_prev.forEach(function(button) {
      button.addEventListener('click', (e) => {
        e.preventDefault()    
        if(this.current_chapter >= 0){
          this.previous_chapter = this.current_chapter     
          this.current_index = this.current_chapter * 4 + 3
          this.selectChapter()
        }
      })
    }, this)

    this.chapter_next.forEach(function(button) {
      button.addEventListener('click', (e) => {
        e.preventDefault()
        if(this.current_chapter < this.chapters.length - 1){
          this.current_chapter += 1
          this.current_index = this.current_chapter * 4 + 3
          this.selectChapter()
        }
      })
    }, this)


    const that = this
    this.buttons_sections.forEach(function(button) {
      button.addEventListener('click', function(e){
        e.preventDefault()
        that.current_index = Math.floor(this.dataset.target) + (that.current_chapter * 4) + 3
        that.previous_section = this.dataset.target

        that.buttons_sections.forEach(function(element) {
          element.classList.remove('active')
        }, this);

        this.classList.add('active')
        that.timelines_fill[that.current_chapter].style.transform = 'scaleX('+ (this.getBoundingClientRect().left / window.innerWidth) +')'

        that.select()
      })
    }, this)

    this.button_split.addEventListener('click', () => {
      this.container_story.style.transition = 'none'
      this.container_story.classList.add('scrolled')
      this.button_scroll.classList.add('rotate')      
      this.container_story.style.transition = 'transform .65s ease-in-out'     
    })


  }

  selectChapter(){
    this.timeline.style.transform = 'translateX(-'+ (this.current_chapter * 100) +'vw)'

    this.buttons_sections.forEach(function(element) {
          element.classList.remove('active')
    }, this);

    this.timelines_fill[this.current_chapter].style.transform = 'scaleX('+ (this.buttons_sections[3 * this.current_chapter].getBoundingClientRect().left / window.innerWidth) +')'
    this.buttons_sections[3 * this.current_chapter].classList.add('active')

    this.select()
  }

  select(){
    this.container.style.transform = 'translateX(-'+ (this.current_index * 100) +'vw)'
    if(this.current_index > 3 && this.button_scroll.classList.contains('rotate')){
      this.mafia_sections[this.current_index-3].classList.add('active')
    }
    else{
      this.sections[this.current_index].classList.add('active')
    }
    if(this.sections[this.current_index].classList.contains('hide-fixed')){
      this.fixed.classList.add('hide')
    }
    else{
      this.fixed.classList.remove('hide')      
    }
    music.audio.pause()
    if(this.current_index != 9){
      video_mafia.pause()
      video_civil.pause()
    }
    let effect = new Audio
    effect.src = 'assets/audio/next.mp3'
    effect.volume = 0.3
    effect.play()
  }
}

const framework = new Framework(document.querySelector('.container'), document.querySelector('.fixed'))