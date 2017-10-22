function MiniMaxTree(root) {
  this.root = root

  this.evaluateTree = function() {
    function evaluateNode(node) {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i]
        if (child.value == undefined) {
          evaluateNode(child)
        }
        // child value is defined => we reached a leaf

        // if current value is not defined yet, take child value
        if (node.value == undefined) {
          node.value = child.value
          continue // move on to next child
        } 

        // current value is defined but maybe the child has a better value for my node type
        // when im a max node, only update my value if child value is greater than my current value
        if (node.type == MiniMaxNode.MAX) {
          node.value = child.value > node.value ? child.value : node.value
        }
        // when im a min node, only update my value if child value is smaller than my current value
        if (node.type == MiniMaxNode.MIN) {
          node.value = child.value < node.value ? child.value : node.value
        }
      }
    }  
    evaluateNode(this.root)
  }
  
  this.nodeCount = function() {    
    function countChildren(node) {
      let count = node.children.length
			node.children.forEach(c => {
				count += countChildren(c);
			});
			return count;
		}
		return 1 + countChildren(this.root);
  }
}