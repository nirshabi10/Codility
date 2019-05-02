class WeightedGraph {
    constructor() {
        this.adjacencyList = {}
    }

    addVertex(name) {
        if (!this.adjacencyList[name]) this.adjacencyList[name] = []
    }

    addEdge(v1, v2, weight) {
        if (this.adjacencyList[v1]) {
            if (!this.adjacencyList[v1].includes(v2)) {
                this.adjacencyList[v1].push({ node: v2, weight })
            }
        }
        if (this.adjacencyList[v2]) {
            if (!this.adjacencyList[v2].includes(v1)) {
                this.adjacencyList[v2].push({ node: v1, weight })
            }
        }
    }

    Dijkstras(start, finish) {
        const nodes = new PriorityQueue()
        const distances = {}
        const previous = {}
        let path = [] //to return at end
        let smallest

        //build up initial state
        for (let vertex in this.adjacencyList) {
            if (vertex === start) {
                distances[vertex] = 0
                nodes.enqueue(vertex, 0)
            } else {
                distances[vertex] = Infinity
                nodes.enqueue(vertex, Infinity)
            }
            previous[vertex] = null
        }

        //as long as there is something to visit
        while (nodes.values.length) {
            smallest = nodes.dequeue().val
            if (smallest === finish) {
                while (previous[smallest]) {
                    path.push(smallest)
                    smallest = previous[smallest]
                }
                break;
            }
            if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.adjacencyList[smallest]) {
                    // find neighboring node
                    let nextNode = this.adjacencyList[smallest][neighbor]

                    // calculate new distances to neighboring node
                    let candidate = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node
                    if (candidate < distances[nextNeighbor]) {
                        // updating new smallest distance to neighbor
                        distances[nextNeighbor] = candidate
                        // updating previous - how we got to neighbor
                        previous[nextNeighbor] = smallest
                        // enqueue in priority queue with new priority
                        nodes.enqueue(nextNeighbor, candidate)
                    }
                }
            }

        }
        return path.concat(smallest).reverse()
    }
}


class Node {
    constructor(val, priority) {
        this.val = val
        this.priority = priority
    }
}

class PriorityQueue {
    constructor() {
        this.values = []
    }

    enqueue(val, priority) {
        const newNode = new Node(val, priority)
        this.values.push(newNode)
        this.bubbleUp()
    }

    bubbleUp() {
        let index = this.values.length - 1
        const element = this.values[index]
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2)
            let parent = this.values[parentIndex]
            if (element.priority >= parent.priority) break
            this.values[parentIndex] = element
            this.values[index] = parent
            index = parentIndex
        }
    }

    dequeue() {
        const min = this.values[0]
        const end = this.values.pop()
        if (this.values.length > 0) {
            this.values[0] = end
            this.sinkDown()
        }
        return min
    }

    sinkDown() {
        let index = 0
        const length = this.values.length
        const element = this.values[index]
        while (true) {
            let leftChildIdx = index * 2 + 1
            let rightChildIdx = index * 2 + 2
            let leftChild, rightChild
            let swap = null
            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx]
                if (leftChild.priority < element.priority) {
                    swap = leftChildIdx
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx]
                if (
                    swap === null && rightChild.priority < element.priority ||
                    swap !== null && rightChild.priority < leftChild.priority
                ) {
                    swap = rightChildIdx
                }
            }
            if (swap === null) break
            this.values[index] = this.values[swap]
            this.values[swap] = element
            index = swap
        }
    }
}

const wg = new WeightedGraph()

wg.addVertex("A")
wg.addVertex("B")
wg.addVertex("C")
wg.addVertex("D")
wg.addVertex("E")
wg.addVertex("F")

wg.addEdge("A", "B", 4)
wg.addEdge("A", "C", 2)
wg.addEdge("B", "E", 3)
wg.addEdge("C", "D", 2)
wg.addEdge("C", "F", 4)
wg.addEdge("D", "E", 3)
wg.addEdge("D", "F", 1)
wg.addEdge("F", "E", 1)

wg.Dijkstras("A", "E")