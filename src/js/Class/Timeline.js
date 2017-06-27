class Timeline{
  constructor(container){
    this.container = container
    this.chapters = container.querySelectorAll('.timeline--part')
    this.current_chapter = 0
    this.previous_chapter = 0
    this.current_section = 0
    this.chapter_prev = document.querySelectorAll('.chapter-prev')
    this.chapter_next = document.querySelectorAll('.chapter-next')
    this.section_next = document.querySelectorAll('.section-next')

    this.chapter_prev.forEach(function(button) {
      button.addEventListener('click', (e) => {
        e.preventDefault()    
        if(this.current_chapter > 0){
          this.previous_chapter = this.current_chapter     
          this.current_chapter -= 1
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
}

const timeline = new Timeline(document.querySelector('.timeline'))