class Framework{
  constructor(container, controls){
    this.container      = container
    this.button_next    = controls.querySelector('.next')
    this.button_prev    = controls.querySelector('.prev')
    this.sections       = container.querySelectorAll('.container--section, .container--story--section')
    this.current_index  = 0
    this.previous_index = undefined

    this.button_prev.addEventListener('click', (e) => {
      e.preventDefault()    
      if(this.current_index > 0){
        this.previous_index = this.current_index        
        this.current_index -= 1
        this.select()
      }
    })
    
    this.button_next.addEventListener('click', (e) => {
      e.preventDefault()      
      if(this.current_index < this.sections.length-1 - document.querySelectorAll('.container--story--row-good .container--story--section').length){
        this.previous_index = this.current_index
        this.current_index += 1
        this.select()
      }
    })

  }
  select(){
    this.container.style.transform = 'translateX(-'+ (this.current_index * 100) +'vw)'
  }
}

const framework = new Framework(document.querySelector('.container'), document.querySelector('.fixed'))

console.log(framework)