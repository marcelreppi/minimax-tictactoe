const MiniMaxValues = {
  Server: 1,
  Client: -1,
  Tie: 0
}

const Bot = {

  generateTree: function(tree, maxDepth = Infinity) {
    
    function expandNode(currentNode) {
      const fieldArray = currentNode.object.fieldArray
      const emptyFields = currentNode.object.emptyFields
      const activePlayer = currentNode.object.activePlayer

      // if there is a winner this node should be a leaf
      if (helper.checkForWin(fieldArray)) {
        // evaluate leaf value
        // if current field is a winning situation, player in previous turn won the round
        currentNode.value = activePlayer == Players.Server ? MiniMaxValues.Client : MiniMaxValues.Server
        
        return // stop further calculation
      }

      // check for max depth
      const nextDepth = currentNode.object.depth + 1
      if (nextDepth > maxDepth) {
        // there hasnt been a winner yet but maxDepth is reached
        currentNode.value = MiniMaxValues.Tie
        return
      }

      if (emptyFields.length == 0) {
        // no winner but emptyFields is empty => tie
        currentNode.value = MiniMaxValues.Tie
        return
      }
      
      // loop through empty fields and simulate move
      for (let i = 0; i < emptyFields.length; i++) {
        const newFieldArray = helper.getDeepCopyFieldArray(fieldArray)
        const sign = activePlayer

        // simulate move
        newFieldArray[emptyFields[i]].value = sign

        // remove empty index where a move was just simulated
        const newEmptyFields = helper.getDeepCopyArray(emptyFields)
        const moveIndex = newEmptyFields.splice(i, 1)[0]
        
        // determine the next player
        const nextPlayer = activePlayer == Players.Server ? Players.Client : Players.Server

        const nextTurn = {
          fieldArray: newFieldArray,
          emptyFields: newEmptyFields,
          activePlayer: nextPlayer,
          depth: nextDepth,
          moveIndex: moveIndex
        }

        const nextNodeType = currentNode.type == MiniMaxNode.MAX ? MiniMaxNode.MIN : MiniMaxNode.MAX

        const childNode = new MiniMaxNode(nextTurn, nextNodeType)
        childNode.parent = currentNode
        currentNode.addChild(childNode)
        expandNode(childNode)
      }
    }
    expandNode(tree.root)
  },


  makeSmartMove: function(fieldArray, emptyFields) {
    return new Promise((resolve, reject) => {
      const currentTurn = {
        fieldArray,
        emptyFields,
        activePlayer: Players.Server,
        depth: 0
      }

      const root = new MiniMaxNode(currentTurn, MiniMaxNode.MAX)
      const tree = new MiniMaxTree(root)

      // generate tree and evaluate all leaf nodes
      this.generateTree(tree)

      // evaluate rest of tree based on leaf values
      tree.evaluateTree()

      // filter children that match the roots node value
      const possibleMoves = tree.root.children
        .filter((child) => {
          return child.value == tree.root.value
        })
        .map((child) => {
          return child.object.moveIndex
        })

      // choose random move out of possible moves
      const x = Math.floor(Math.random() * possibleMoves.length)

      resolve(possibleMoves[x])
    })
  },

  makeRandomMove: function(fieldArray, emptyFields) {
    //pick random index from emptyIndices array and make the move
    const x = Math.floor(Math.random() * emptyFields.length)
    const fieldIndex = emptyFields[x];
    // return the chosen index where to make the move
    return fieldIndex
  }
}