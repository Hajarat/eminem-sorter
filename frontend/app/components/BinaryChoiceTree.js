import Node from './Node'

export default class BinaryChoiceTree {        
    constructor() {
        this.root = null
    }

    insertRoot(data, url, rightElement, rightElementURL) {
        if(this.root === null) {
            const newRoot = new Node(data,url)
            this.root = newRoot
            newRoot.right = new Node(rightElement, rightElementURL)
        } else {
            console.log("Error! root already exists")
        }
    }
}