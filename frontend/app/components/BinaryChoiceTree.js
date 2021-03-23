import Node from './Node'

export default class BinaryChoiceTree {        
    constructor() {
        this.root = null
    }

    insertRoot(data, rightElement) {
        if(this.root === null) {
            const newRoot = new Node(data)
            this.root = newRoot
            newRoot.right = new Node(rightElement)
        } else {
            console.log("Error! root already exists")
        }
    }
}