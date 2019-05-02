class Graph {
    constructor() {
        this.adjacencyList = {}
    }

    addVertex(name) {
        if (!this.adjacencyList[name]) this.adjacencyList[name] = []
    }

    removeVertex(vertex) {
        if (this.adjacencyList[vertex]) {
            for (let v of this.adjacencyList[vertex]) {
                this.removeEdge(v, vertex)
            }
            delete this.adjacencyList[vertex]
        }

    }

    addEdge(v1, v2) {
        if (this.adjacencyList[v1]) {
            if (!this.adjacencyList[v1].includes(v2)) {
                this.adjacencyList[v1].push(v2)
            }
        }
        if (this.adjacencyList[v2]) {
            if (!this.adjacencyList[v2].includes(v1)) {
                this.adjacencyList[v2].push(v1)
            }
        }
    }

    removeEdge(v1, v2) {
        if (this.adjacencyList[v1]) {
            this.adjacencyList[v1] = this.adjacencyList[v1].filter(
                v => v !== v2
            )
        }
        if (this.adjacencyList[v2]) {
            this.adjacencyList[v2] = this.adjacencyList[v2].filter(
                v => v !== v1
            )
        }
    }

    DFRecursive(start) {
        const visited = {}
        const results = []
        const adjacencyList = this.adjacencyList;

        (function dfs(vertex) {
            if (adjacencyList[vertex]) {
                if (!vertex) return null
                results.push(vertex)
                visited[vertex] = true
                adjacencyList[vertex].forEach(neighbour => {
                    if (!visited[neighbour]) return dfs(neighbour)
                })
            }
        })(start)
        return results
    }

    DFIterative(start) {
        const stack = [start]
        const results = []
        const visited = {}
        let vertex

        visited[start] = true
        while (stack.length) {
            vertex = stack.pop()
            results.push(vertex)
            this.adjacencyList[vertex].forEach(neighbour => {
                if (!visited[neighbour]) {
                    visited[neighbour] = true
                    stack.push(neighbour)
                }
            })
        }
        return results
    }

    BF(start) {
        const queue = [start]
        const results = []
        const visited = {}
        let vertex

        visited[start] = true
        while (queue.length) {
            vertex = queue.shift()
            results.push(vertex)
            this.adjacencyList[vertex].forEach(neighbour => {
                if (!visited[neighbour]) {
                    queue.push(neighbour)
                    visited[neighbour] = true
                }
            })

        }
        return results
    }



}

const g = new Graph()

g.addVertex("Tokyo")
g.addVertex("Dallas")
g.addVertex("Aspen")
g.addVertex("Los Angeles")
g.addVertex("Hong Kong")

g.addEdge("Tokyo", "Dallas")
g.addEdge("Aspen", "Dallas")
g.addEdge("Hong Kong", "Dallas")
g.addEdge("Hong Kong", "Tokyo")
g.addEdge("Los Angeles", "Hong Kong")
g.addEdge("Los Angeles", "Aspen")