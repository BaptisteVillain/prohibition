console.log('mdr')

let liquor = [[1920, 1638], [1921, 4963], [1922, 4188], [1923, 4804], [1924, 5380], [1925, 7041], [1926, 14221], [1927, 5972], [1928, 4254], [1929, 3312]]
let brewery = [[1890, 2011], [1900, 1852], [1910, 1448], [1920, 0], [1930, 0], [1940, 703], [1950, 496]]
let death = [[1918, 2.7], [1920, 1.0], [1922, 2.6], [1924, 3.1], [1926, 3.9], [1928, 4.0], [1930, 3.5]]
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