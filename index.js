const P = require('bluebird');
const prompt = P.promisifyAll(require('prompt'));
// var colors = require('colors/safe');


prompt.message = '';
prompt.start();

let board = [
  ['_', '_', '_'],
  ['_', '_', '_'],
  ['_', '_', '_'],
];
let turn = 'Player 1';
let ended = false;

const toggleTurn = () => {
  turn = turn === 'Player 1' ? 'Player 2' : 'Player 1';
};

const printBoard = () => {
  board.forEach((row, i) => {
    i === 0 && console.log('  0 1 2');
    let rowString = i;
    row.forEach((block) => {
      rowString += ' ' + block;
    });
    console.log(rowString);
  });
};

const won = (row, col, mark) => {
  let win = true;
  for (let i = 0; i < 3; i++) {
    if(board[row][i] !== mark) win = false;
  }
  if (win === true) return true;
  win = true
  for (let i = 0; i < 3; i++) {
    if(board[i][col] !== mark) win = false;
  }
  if (win === true) return true;
  return false;
};

console.log('Turn:', turn);
printBoard();

const promptMove = () => {
  prompt.getAsync(['row', 'col'])
  .then(({row, col}) => {
    console.log('row: ' + row);
    console.log('column: ' + col);

    let mark = turn === 'Player 1' ? 'X' : 'O';
    board[row][col] = mark;

    toggleTurn();
    printBoard();
    if (won(row, col, mark)) {
      console.log(turn + ' won!');
    } else {
      promptMove();
    }
  })
  .catch(error => {
    console.log('Error:', error);
  }); 
};

promptMove();