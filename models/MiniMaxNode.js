let nextID = 0

function MiniMaxNode(object = {}, type) {
  this.id = nextID++
  this.object = object
  this.children = []
  this.type = type
  this.parent = {}
  this.value = undefined
  
  this.addChild = function(child) {
    this.children.push(child)
  }
  this.isLeaf = function() {
    return this.children.length == 0
  }
}

// Possible node types
MiniMaxNode.MAX = 1
MiniMaxNode.MIN = -1