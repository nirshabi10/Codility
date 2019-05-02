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

let ER = new PriorityQueue()
ER.enqueue("common cold", 3)
ER.enqueue("gun shot wound", 1)
ER.enqueue("high fever", 4)
ER.enqueue("headache", 9)
ER.enqueue("horny", 7)
ER.enqueue("glass in foot", 2)

