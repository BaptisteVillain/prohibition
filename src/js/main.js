console.log('mdr')

let liquor = [[1920, 1637633], [1921, 4963005], [1922, 4187625], [1923, 4803873], [1924, 5379528], [1925, 7040537], [1926, 14220552], [1927, 5971903], [1928, 4254030], [1929, 3312491]]
let brewery = [[1890, 2011], [1900, 1852], [1910, 1448], [1920, 0], [1930, 0], [1940, 703], [1950, 496]]
let death = [[1918, 1.7], [1920, 0.3], [1922, 0.8], [1924, 1.4], [1926, 1.7], [1928, 2.2], [1930, 2.0]]
let murder = [[1920, 11.5], [1921, 14], [1922, 13.9], [1923, 13.4], [1924, 13.9], [1925, 14.0], [1926, 14,1], [1927, 14.0], [1928, 14.5], [1929, 13.8], [1930, 14.7], [1931, 15.3], [1932, 15.1], [1933, 16.0]]

new Graph(document.querySelector(".graph-civil-1"), brewery, 2)
new Graph(document.querySelector(".graph-mafia-1"), liquor, 1)
new Graph(document.querySelector(".graph-civil-2"), death, 2)
new Graph(document.querySelector(".graph-mafia-2"), murder, 1)


const generic         = document.querySelector('video.generic')
const skip            = document.querySelector('.generic-skip')
const generic_animate = document.querySelector('.landing-content')

setTimeout(function() {
  generic.muted = true
  skip.classList.add('hide')  
}, 43000);

skip.addEventListener('click', () => {
  generic.muted = true
  generic_animate.classList.add('skipped')
  generic_animate.style.animation = '0'
  skip.classList.add('hide')
})