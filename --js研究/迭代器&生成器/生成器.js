class Node {
  id
  neighbors

  constructor (id) {
    this.id = id
    this.neighbors = new Set()
  }
}

class RandomGraph {
  nodes

  constructor (size) {
    this.nodes = new Set()
    for (let i = 0; i < size; ++i) {
      this.nodes.add(new Node(i))
    }
    const threshold = 1 / size
    for (const x of this.nodes) {
      for (const y of this.nodes) {
        if (Math.random() < threshold) {
          x.connect(y)
        }
      }
    }
  }

  print () {
    for (const node of this.nodes) {
      const ids = [...node.neighbors]
        .map(x => x.id)
        .join(',')
      console.log(`${node.id}:${ids}`)
    }
  }
}

const g = new RandomGraph(6)
