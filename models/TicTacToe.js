const fieldArray = [
  {
    position: 'topL',
    value: '',
    winning: false
  },
  {
    position: 'topM',
    value: '',
    winning: false
  },
  {
    position: 'topR',
    value: '',
    winning: false
  },
  {
    position: 'middleL',
    value: '',
    winning: false
  },
  {
    position: 'middleM',
    value: '',
    winning: false
  },
  {
    position: 'middleR',
    value: '',
    winning: false
  },
  {
    position: 'bottomL',
    value: '',
    winning: false
  },
  {
    position: 'bottomM',
    value: '',
    winning: false
  },
  {
    position: 'bottomR',
    value: '',
    winning: false
  }
]

const winningIndices = [
  [0, 1, 2],  // top row
  [3, 4, 5],  // middle row
  [6, 7, 8],  // bottom row
  [0, 3, 6],  // left column
  [1, 4, 7],  // middle column
  [2, 5, 8],  // right column
  [0, 4, 8],  // top left to bottom right diagonal
  [6, 4, 2]   // bottom left to top right diagonal
]

const Players = {
  Server: 'X',
  Client: 'O'
}