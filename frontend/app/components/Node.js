export default class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }

    insertRight(data) {
        if (this.right == null) {
            this.right = new Node(data)
        }  else {
            console.log("Error, there should be no right child here")
        }
    }

    insertLeft(data) {
        if (this.left == null) {
            this.left = new Node(data)
        } else {
            console.log("Error, there should be no left child here")
        }
    }

}