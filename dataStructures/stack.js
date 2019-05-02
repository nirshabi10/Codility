class Node {
    constructor(val) {
        this.val = val
        this.next = null
    }
}

class Stack {
    constructor() {
        this.first = null
        this.last = null
        this.size = 0
    }

    push(val) {
        const newNode = new Node(val)
        if (!this.first) {
            this.first = newNode
            this.last = newNode
        } else {
            const currentFirst = this.first
            this.first = newNode
            this.first.next = currentFirst
        }
        return ++this.size
    }

    pop() {
        if (!this.first) return null
        const returnedNode = this.first
        if (this.length === 1) {
            this.last = null
        }
        this.first = returnedNode.next
        returnedNode.next = null
        this.size--
        return returnedNode.val
    }
}