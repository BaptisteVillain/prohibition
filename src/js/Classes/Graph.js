class Graph {
  constructor(parent, array, type) {
    this.array = array
    this.parent = parent
    this.type = type

    this.findMaxMin(this.array)

    this.draw(this.parent, this.array, this.type, this.X, this.Y)
  }

  findMaxMin(array) {
    this.X = {
      max: 0,
      min: null
    }
    this.Y = {
      max: 0,
      min: null
    }
    for (let i = 0; i < array.length; i++) {
      if (this.X.min === null) this.X.min = array[i][0]
      if (this.Y.min === null) this.X.min = array[i][1]
      if (array[i][0] <= this.X.min) this.X.min = array[i][0]
      if (array[i][0] >= this.X.max) this.X.max = array[i][0]
      if (array[i][1] <= this.Y.min) this.Y.min = array[i][1]
      if (array[i][1] >= this.Y.max) this.Y.max = array[i][1]
    }
  }

  draw(parent, array, type, X, Y) {

    this.div = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    this.div.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    this.div.setAttribute("width", "100%")
    this.div.setAttribute("height", "100%")
    this.div.setAttribute("class", "graph")

    let width = parent.offsetWidth / array.length
    let adjust = width / 2

    switch (type) {
      case 1:
        for (let i = 0; i < array.length; i++) {
          let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
          rect.style.transform = "translate(" + ((i * width) + adjust) + "px, 0)"
          rect.setAttribute("fill", "yellow")
          rect.setAttribute("height", (array[i][1] / Y.max) * parent.offsetHeight)
          rect.setAttribute("width", 10)
          rect.setAttribute("y", parent.offsetHeight - ((array[i][1] / Y.max) * parent.offsetHeight * 0.8))
          this.div.appendChild(rect)
        }
        break
      case 2:
        let polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline")
        polyline.setAttribute("fill", "none")
        polyline.setAttribute("stroke", "blue")
        polyline.setAttribute("stroke-width", "2")

        let g = document.createElementNS("http://www.w3.org/2000/svg", "g")

        let string = new String()

        for (let i = 0; i < array.length; i++) {
          string += ((i * width) + adjust)
          string += ","
          string += (parent.offsetHeight - ((array[i][1] / Y.max) * parent.offsetHeight * 0.8))
          string += " "

          let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
          circle.setAttribute("cx", ((i * width) + adjust))
          circle.setAttribute("cy", (parent.offsetHeight - ((array[i][1] / Y.max) * parent.offsetHeight * 0.8)))
          circle.setAttribute("r", "4")

          g.appendChild(circle)
        }

        polyline.setAttribute("points", string)

        this.div.appendChild(g)
        this.div.appendChild(polyline)
        break
    }

    parent.appendChild(this.div)
  }
}