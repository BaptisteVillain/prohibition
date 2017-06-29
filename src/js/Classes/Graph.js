class Graph {
  constructor(parent, array, type, correct = 0) {
    this.array = array
    this.parent = parent
    this.type = type
    this.correct = correct

    this.findMaxMin(this.array, this.correct)

    this.draw(this.parent, this.array, this.type, this.X, this.Y)
  }

  findMaxMin(array, correct) {
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
      if (this.Y.min === null) this.Y.min = array[i][1]
      if (array[i][0] <= this.X.min) this.X.min = array[i][0]
      if (array[i][0] >= this.X.max) this.X.max = array[i][0]
      if (array[i][1] + correct <= this.Y.min) this.Y.min = array[i][1] + correct
      if (array[i][1] + correct >= this.Y.max) this.Y.max = array[i][1] + correct
    }
  }

  draw(parent, array, type, X, Y) {

    this.div = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    this.div.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    this.div.setAttribute("width", "100%")
    this.div.setAttribute("height", "100%")
    this.div.setAttribute("class", "graph")
    parent.appendChild(this.div)

    let width = parent.offsetWidth / array.length
    let adjust = width / 2
    let graph = document.createElementNS("http://www.w3.org/2000/svg", "g")
    graph.setAttribute("class", "graph-chart")
    let numbers = document.createElementNS("http://www.w3.org/2000/svg", "g")
    numbers.setAttribute("class", "graph-numbers")

    switch (type) {
      case 1:
        for (let i = 0; i < array.length; i++) {
          let value = document.createElementNS("http://www.w3.org/2000/svg", "g")
          value.setAttribute("class", "graph-value")
          let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
          rect.setAttribute("height", ((array[i][1] + this.correct) / Y.max) * parent.offsetHeight * 0.8)
          rect.setAttribute("width", 15)
          rect.setAttribute("x", ((i * width) + adjust))
          rect.setAttribute("y", (parent.offsetHeight - 40) - (((array[i][1] + this.correct) / Y.max) * parent.offsetHeight * 0.8))
          value.appendChild(rect)
          graph.appendChild(value)

          let number = document.createElementNS("http://www.w3.org/2000/svg", "text")
          number.setAttribute("text-anchor", "middle")
          number.setAttribute("x", ((i * width) + 7.5 + adjust))
          number.setAttribute("y", parent.offsetHeight - 10)
          number.innerHTML = array[i][0]
          numbers.appendChild(number)

          document.createElementNS("http://www.w3.org/2000/svg", "g")
          value.setAttribute("class", "graph-value")

          let value_number = document.createElementNS("http://www.w3.org/2000/svg", "text")
          value_number.setAttribute("text-anchor", "middle")
          value_number.setAttribute("x", ((i * width) + 7.5 + adjust))
          value_number.setAttribute("y", (parent.offsetHeight - 50) - (((array[i][1] + this.correct) / Y.max) * parent.offsetHeight * 0.8))
          value_number.innerHTML = array[i][1]
          value.appendChild(value_number)
        }
        this.div.appendChild(graph)
        this.div.appendChild(numbers)
        break
      case 2:
        let polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline")
        let circles = document.createElementNS("http://www.w3.org/2000/svg", "g")
        circles.setAttribute("class", "circles")

        let string = new String()

        for (let i = 0; i < array.length; i++) {
          string += ((i * width) + adjust)
          string += ","
          string += (parent.offsetHeight - 40) - ((array[i][1] / Y.max) * parent.offsetHeight * 0.8)
          string += " "

          let value = document.createElementNS("http://www.w3.org/2000/svg", "g")
          value.setAttribute("class", "graph-value")

          let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
          circle.setAttribute("cx", ((i * width) + adjust))
          circle.setAttribute("cy", (parent.offsetHeight - 40) - (((array[i][1] + this.correct) / Y.max) * parent.offsetHeight * 0.8))
          circle.setAttribute("r", "5")
          value.appendChild(circle)
          circles.appendChild(value)

          let number = document.createElementNS("http://www.w3.org/2000/svg", "text")
          number.setAttribute("text-anchor", "middle")
          number.setAttribute("y", parent.offsetHeight - 10)
          number.setAttribute("x", ((i * width) + adjust))
          number.innerHTML = array[i][0]
          numbers.appendChild(number)

          let value_number = document.createElementNS("http://www.w3.org/2000/svg", "text")
          value_number.setAttribute("text-anchor", "middle")
          value_number.setAttribute("x", ((i * width) + adjust))
          value_number.setAttribute("y", (parent.offsetHeight - 55) - (((array[i][1] + this.correct) / Y.max) * parent.offsetHeight * 0.8))
          value_number.innerHTML = array[i][1]
          value.appendChild(value_number)
        }

        polyline.setAttribute("points", string)

        let prevPos, totalLength = 0
        for (let i = 0; i < polyline.points.numberOfItems; i++) {
          let pos = polyline.points.getItem(i);
          if (i > 0) {
            totalLength += Math.sqrt(Math.pow((pos.x - prevPos.x), 2) + Math.pow((pos.y - prevPos.y), 2))
          }
          prevPos = pos
        }
        polyline.setAttribute("stroke-dasharray", totalLength)
        polyline.setAttribute("stroke-dashoffset", totalLength)

        this.div.appendChild(circles)
        this.div.appendChild(polyline)
        this.div.appendChild(numbers)
        break
    }
  }
}
