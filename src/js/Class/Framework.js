class Framework{
  constructor(container, fixed){
    this.container        = container
    this.fixed            = fixed
    this.container_story  = container.querySelector('.container--story')
    this.timeline         = document.querySelector('.timeline')
    this.buttons_next     = document.querySelectorAll('.next')
    this.buttons_prev     = document.querySelectorAll('.prev')
    this.sections         = container.querySelectorAll('.container--section, .container--story--row-civil .container--story--section')
    this.button_scroll    = document.querySelector('.fixed-vertical-control')
    this.current_index    = 0
    this.current_chapter  = 0    
    this.previous_index   = undefined
    this.chapters         = document.querySelectorAll('.timeline--part')
    this.chapter_prev     = document.querySelectorAll('.chapter-prev')
    this.chapter_next     = document.querySelectorAll('.chapter-next')
    // this.section_next     = document.querySelectorAll('.section-next')

    this.buttons_prev.forEach(function(button) {
      button.addEventListener('click', (e) => {
        e.preventDefault()    
        if(this.current_index > 0){
          this.previous_index = this.current_index        
          this.current_index -= 1
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
        }
      })
    }, this)

    this.button_scroll.addEventListener('click', (e) => {
      e.preventDefault()
      this.container_story.classList.toggle('scrolled')
      console.log('scroll')
    })

    this.chapter_prev.forEach(function(button) {
      button.addEventListener('click', (e) => {
        e.preventDefault()    
        if(this.current_chapter > 0){
          this.previous_chapter = this.current_chapter     
          this.current_chapter -= 1
          this.current_index = this.current_chapter * 4 + 3
          this.selectChapter()
        }
      })
    }, this)

    this.chapter_next.forEach(function(button) {
      button.addEventListener('click', (e) => {
        e.preventDefault()
        if(this.current_chapter < this.chapters.length - 1){
          this.previous_chapter = this.current_chapter     
          this.current_chapter += 1
          this.current_index = this.current_chapter * 4 + 3          
          this.selectChapter()
        }
      })
    }, this)

  }

  selectChapter(){
    this.container.style.transform = 'translateX(-'+ (this.current_chapter * 100) +'vw)'
    this.container.classList.add('hide')
    framework.container.style.transform = 'translateX(-'+ ((this.current_chapter * 4 + 3) * 100) +'vw)'
  }

  select(){
    this.container.style.transform = 'translateX(-'+ (this.current_index * 100) +'vw)'
    if(!this.sections[this.current_index].classList.contains('container--story--section')){
      this.fixed.classList.add('hide')
    }
    else{
      this.fixed.classList.remove('hide')      
    }



  }

}

const framework = new Framework(document.querySelector('.container'), document.querySelector('.fixed'))

console.log(framework)