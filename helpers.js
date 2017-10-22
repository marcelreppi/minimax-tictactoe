const helper = {
  checkForWin: function(fieldArray) {
    // check if one of the possible winning combinations exists on the field
    return winningIndices.some(x => {
      if(fieldArray[x[0]].value == fieldArray[x[1]].value && fieldArray[x[1]].value == fieldArray[x[2]].value) {
        if(fieldArray[x[0]].value != '') {
          fieldArray[x[0]].winning = true
          fieldArray[x[1]].winning = true
          fieldArray[x[2]].winning = true
          return true // stop Array.some from running
        }
      }
    })
  },

  getEmptyFields: function(fieldArray) {
    // check which fields are empty
    // returns array of indices of fields that are still empty
    return fieldArray
      .filter( (field) => field.value == '' )
      .map( field => fieldArray.indexOf(field) )
  },

  getDeepCopyFieldArray: function(fieldArray) {
    const newFieldArray = []
    for (let i = 0; i < fieldArray.length; i++) {
      const field = fieldArray[i];
      const newField = Object.assign({}, field)
      newFieldArray.push(newField)
    }
    return newFieldArray
  },

  getDeepCopyArray: function(array) {
    const newArray = new Array(array.length)
    for (let i = 0; i < array.length; i++) {
      newArray[i] = array[i]
    }
    return newArray
  }
}

  
  
