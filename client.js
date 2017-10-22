const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// initialize field
for (let i = 0; i < fieldArray.length; i++) {
  const field = fieldArray[i]
  const div = document.createElement('div')
  div.classList.add('gameField', `${field.position}`)
  div.id = i
  div.innerHTML = field.value
  $('.gameFieldContainer').appendChild(div)
}

// client side logic
let gameIsActive = true
let clientsTurn = true

const highlightField = (e) => {
  if(gameIsActive && e.target.innerHTML == '') {
    e.target.classList.add('activeField')
  }
}

const removeHighlight = (e) => {
  if(gameIsActive && e.target.innerHTML == '') {
    e.target.classList.remove('activeField')
  }
}

const highlightWinningFields = () => {
  for (let i = 0; i < fieldArray.length; i++) {
    if (fieldArray[i].winning) {
      document.getElementById(i).classList.add('winningField')
    }
  }
}

const reset = (e) => {
  for (let i = 0; i < fieldArray.length; i++) {
    const field = fieldArray[i]
    field.value = ''
    field.winning = false

    const div = document.getElementById(i)
    div.innerHTML = ''
    div.classList.remove('activeField', 'winningField')
  }
  gameIsActive = true
  clientsTurn = true
  console.log('Reset')
}

const makeMove = (e) => {
  if (!gameIsActive || e.target.innerHTML != '' || !clientsTurn) {
    return
  }

  removeHighlight(e)

  // register client move
  const fieldIndex = parseInt(e.target.id)
  e.target.innerHTML = fieldArray[fieldIndex].value = 'O' // set field at fieldIndex to O

  gameIsActive = !helper.checkForWin(fieldArray)
  console.log(`Player made move at ${fieldIndex}`)

  if (!gameIsActive) {
    highlightWinningFields()
    return
  }

  // prevent user from making another move while bot calculates next move
  clientsTurn = false
  
  const emptyFields = helper.getEmptyFields(fieldArray)
  gameIsActive = !emptyFields.length == 0
    
  if (gameIsActive) {
    // only make a move when game is active
    // bot returns the index at which it wants to make the move

    // Bot.makeRandomMove(fieldArray, emptyFields)
    Bot.makeSmartMove(fieldArray, emptyFields)
      .then( index => {
        document.getElementById(index).innerHTML = fieldArray[index].value = 'X'
        
        gameIsActive = !helper.checkForWin(fieldArray)
        console.log(`Bot made a move at index ${index}`)

        if (!gameIsActive) {
          highlightWinningFields()
        }
        
        clientsTurn = true
      }) 
  }
}

$$('.gameField').forEach( (field) => {
  
  field.addEventListener('mouseenter', highlightField)
  field.addEventListener('mouseleave', removeHighlight)
  field.addEventListener('click', makeMove)
})

$('.resetButton').addEventListener('click', reset)