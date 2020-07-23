var sudokuSize = 9;
var numberOfCells;
var numberOfBlocks;
var blockLength;
var blockHeight;
var index = 1;
var allowedValues = new Array(sudokuSize).fill(0).map(() => index++);
var errorCounter;
var errors = 0;
var seconds = 0;
var minutes = 0;
var hours = 0;
var t;

var sudokuGrid;
// var fakeSudokuGrid = new Array(numberOfCells).fill(0);
var htmlSudoku;
var sudokuCells;

window.onload=function() {
    // Available sizes buttons and inputs
    const size2X2 = document.getElementById('2');
    const size4X4 = document.getElementById('4');
    const size6X6 = document.getElementById('6');
    const size8X8 = document.getElementById('8');
    const size9X9 = document.getElementById('9');


    // Size buttons listeners
    size2X2.addEventListener('click', () => { sudokuSize = size2X2.innerHTML;});
    size4X4.addEventListener('click', () => { sudokuSize = size4X4.innerHTML;});
    size6X6.addEventListener('click', () => { sudokuSize = size6X6.innerHTML;});
    size8X8.addEventListener('click', () => { sudokuSize = size8X8.innerHTML;});
    size9X9.addEventListener('click', () => { sudokuSize = size9X9.innerHTML;});


    // Board generation button
    const generator = document.getElementById('generateBoard');


    // HTML Sudoku Table
    htmlSudoku = document.getElementById("sudokuTable");

    // Error counter
    errorCounter = document.getElementById('errors');

    // Timer
    timeCounter = document.getElementById('timer');


    // Generator button listener
    generator.addEventListener('click', () => 
    {
        initGame();
    });    
}

function initGame() {
  numberOfCells = Math.pow(sudokuSize, 2);
  numberOfBlocks = sudokuSize;
  blockLength = Math.floor(Math.sqrt(sudokuSize));
  blockHeight = sudokuSize / blockLength;
  errors = 0;
  localStorage.setItem('userMistakes', errors)
  errorCounter.innerHTML = localStorage.getItem('userMistakes');

  localStorage.setItem('timeTaken', timeCounter.innerHTML)
  timeCounter.innerHTML = "00:00:00";
  seconds = 0; minutes = 0; hours = 0;

  generateSudoku(sudokuSize);

  console.log(sudokuGrid);

  timer();
}

function createEmptyGrid(size) 
{ 
    return new Array(size).fill(Array(size).fill(0)); 
}

function generateSudoku(sudokuSize) {
  sudokuGrid = createEmptyGrid(sudokuSize);

  fillSudokuWithRandom(sudokuSize*0.75, sudokuGrid);

  if(document.getElementById('sudoku')) {
    var oldGrid = document.getElementById('sudoku')
    document.getElementById('sudokuTable').removeChild(oldGrid);
  }
  var grid = document.createElement("table");
  grid.setAttribute("id", "sudoku");
  for(var i=0; i<sudokuSize; i++) {
    var row = document.createElement("tr");
    row.setAttribute("class", i + '_row');
    for(var j=0; j<sudokuSize; j++) {
      var col = document.createElement("td");
      col.setAttribute("class", i + '_col');
      
      var inpt = document.createElement("input");
      inpt.setAttribute("type", "number");
      inpt.setAttribute("min", "1");
      inpt.setAttribute("max", sudokuSize+"");
      inpt.setAttribute("id", i + '' + j + '_cell' );
      inpt.setAttribute("class", "sudokuCell")

      if(sudokuGrid[i][j]) {
        inpt.value = sudokuGrid[i][j];
      }
      
      col.appendChild(inpt);
      row.appendChild(col);
    }
    grid.appendChild(row);
  }
  htmlSudoku.appendChild(grid);
  addEventListeners();
}

function addEventListeners() {
  for(var i=0; i<sudokuSize; i++) {
    for(var j = 0; j<sudokuSize; j++) {
      document.getElementById(i + '' + j + '_cell').addEventListener('input', e => {
        var value = e.data;
        var cellID = e.target.id + "";

        var cell = cellID.slice(0, cellID.indexOf('_'));

        console.log(sudokuGrid);
        

        if(!isValid(sudokuGrid, cell[0], cell[1], value)) {
          document.getElementById(cellID).setAttribute('class', 'illegalMove');
          errors++;
          localStorage.setItem('userMistakes', errors)
          errorCounter.innerHTML = localStorage.getItem('userMistakes');
        } else {
          document.getElementById(cellID).setAttribute('class', 'legalMove');
          document.getElementById(cellID).value = value;
          updateGrid(cell[0], cell[1], value);
        }
      })
    }
  }
}


function updateGrid(row, col, value) {
  var tmp = new Array(sudokuSize);
  for(var i=0; i<tmp.length; i++) { tmp[i] = sudokuGrid[row][i]; }
    
    tmp[col] = value;
    
    sudokuGrid[row] = tmp;
}

function updateGrid(row, col, value) {
  var tmp = new Array(sudokuSize);
  for(var i=0; i<tmp.length; i++) { tmp[i] = sudokuGrid[row][i]; }
    
    tmp[col] = value;
    
    sudokuGrid[row] = tmp;
}

function countTime() {
  seconds++;
  if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
          minutes = 0;
          hours++;
      }
  }
  
  timeCounter.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

  timer();
}

function timer() {
  t = setTimeout(countTime, 1000);
}

function fillSudokuWithRandom(numberOfNumbers, board) {
  for(var i=0; i<numberOfNumbers; i++)
  {
    var x = Math.floor(Math.random() * sudokuSize);
    var y = Math.floor(Math.random() * sudokuSize);
    var n = Math.floor(Math.random() * sudokuSize);
    if(isValid(board, x, y, n)) { updateGrid(x, y, n);}
  }
}

/***
 * Functions to solve sudoku inspired by : https://stackoverflow.com/questions/42736648/sudoku-solver-in-js
 */

function isValid(board, row, col, k) {
  for (var i = 0; i < sudokuSize; i++) {
      const m = blockLength * Math.floor(row / blockLength) + Math.floor(i / blockLength);
      const n = blockHeight * Math.floor(col / blockHeight) + i % blockHeight;
      if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
        return false;
      }
  }
  return true;
}

function sodokoSolver(data) {
for (let i = 0; i < sudokuSize; i++) {
  for (let j = 0; j < sudokuSize; j++) {
    if (data[i][j] == '.') {
      for (let k = 1; k <= sudokuSize; k++) {
        if (isValid(data, i, j, k)) {
          data[i][j] = `${k}`;
        if (sodokoSolver(data)) {
         return true;
        } else {
         data[i][j] = '.';
        }
       }
     }
     return false;
   }
 }
}
return true;
}