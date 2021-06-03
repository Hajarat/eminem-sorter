export default class Node {
<<<<<<< Updated upstream
    constructor(data) {
        this.id = data._id
        this.name = data.name
        this.url = data.url
=======
    constructor(data, url) {
        this.data = data
        this.url = url
>>>>>>> Stashed changes
        this.left = null
        this.right = null
    }

    insertRight(data, url) {
        if (this.right == null) {
            this.right = new Node(data, url)
        }  else {
            console.log("Error, there should be no right child here")
        }
    }

    insertLeft(data, url) {
        if (this.left == null) {
            this.left = new Node(data, url)
        } else {
            console.log("Error, there should be no left child here")
        }
    }

}