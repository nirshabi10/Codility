class QueueNode {
    constructor(val) {
        this.val = val
        this.next = null
    }
}

class Queue {
    constructor() {
        this.first = null
        this.last = null
        this.size = 0
    }

    enqueue(val) {
        const newNode = new QueueNode(val)
        if (!this.first) {
            this.first = newNode
            this.last = newNode
        } else {
            this.last.next = newNode
            this.last = newNode
        }
        return ++this.size
    }

    dequeue() {
        if (!this.first) return null
        const returned = this.first
        if (this.size === 1) {
            this.last = null;
        }
        this.first = this.first.next
        this.size--
        return returned.val
    }
}

// const queue = new Queue