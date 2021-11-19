const transpose = function(matrix) {
  if (matrix.length === 0) return [];
  let resultArray = [];
  for (let i = 0; i < matrix[0].length; i++) {
    resultArray.push([]);
    for (let j = 0; j < matrix.length; j++) {
      resultArray[i].push(matrix[j][i]);
    }
  }
  return resultArray;
};

const reverseRows = (matrix) => {
  
  let newMatrix = [];

  for (let row of matrix) {
    newMatrix.push(row.reverse());
  }

  return newMatrix;
}

const printMatrix = (matrix) => {
  for (const row of matrix) {
    for (const el of row) {
      process.stdout.write(el + " ");
    }
    process.stdout.write('\n');
  }
};

// const letters = [
//   ['A', 'W', 'C', 'F', 'Q', 'U', 'A', 'L'],
//   ['S', 'E', 'I', 'N', 'F', 'E', 'L', 'D'],
//   ['Y', 'F', 'C', 'F', 'Q', 'U', 'A', 'L'],
//   ['H', 'M', 'J', 'T', 'E', 'V', 'R', 'G'],

//   ['W', 'H', 'C', 'S', 'Y', 'E', 'R', 'L'],
//   ['B', 'F', 'R', 'E', 'N', 'E', 'Y', 'B'],
//   ['U', 'B', 'T', 'W', 'A', 'P', 'A', 'I'],
//   ['O', 'D', 'C', 'A', 'K', 'U', 'A', 'S'],
//   ['E', 'Z', 'K', 'F', 'Q', 'U', 'A', 'L'],
// ]; 

// printMatrix(letters);
// console.log();
// printMatrix(reverseRows(letters));

const coordinatesValid = function(matrix, i, j) {
  let noRows = matrix.length;
  let noCols = matrix[0].length;
  return (i >= 0 && i < noRows) && (j >= 0 && j < noCols);
};

const generateStringsDiagonally = (matrix) => {
  let arrayOfStrings = [];
  for (let i = 0; i < matrix.length; i++) {
    let thisRow = [];
    for (let j = 0; j < matrix[0].length; j++)  {
      if (j > i) break;
      thisRow.push(matrix[i - j][j]);
    }
    arrayOfStrings.push(thisRow);
  }
  for (let i = 1; i < matrix[0].length; i++) {
    let thisRow = [];
    let currentCol, currentRow;
    for (let j = 0; j < matrix.length; j++) {
      currentRow = matrix.length - 1 - j;
      currentCol = i + j;
      if (coordinatesValid(matrix, currentRow, currentCol)) {
        thisRow.push(matrix[currentRow][currentCol]);
      }
    }
    arrayOfStrings.push(thisRow);
  }

  return arrayOfStrings;
};

const checkRowsForWord = (letters, word) => {
  const horizontalJoin = letters.map(ls => ls.join(''));
  for (l of horizontalJoin) {
    if (l.includes(word)) return true;
  }
};

const wordSearchBottomUpTopRight = (letters, word) => {
  return checkRowsForWord(generateStringsDiagonally(letters), word);
  // const foundInSecondHalf = checkRowsForWord(generateStringsDiagonally(transposeDiagonally(letters)), word);
  //return foundInFirstHalf || foundInSecondHalf ? true : false;
};


const wordSearch = (letters, word) => {
  if (typeof word !== 'string' || word.length === 0) return false;
  if (!(Array.isArray(letters) && letters.length)) return false;
  //Horizontally/Vertically
  const foundWordHorizontally = checkRowsForWord(letters, word);
  const foundWordVertically = checkRowsForWord(transpose(letters), word);
  const reverseWord = word.split('').reverse().join('');
  const foundWordHorizontallyReverse = checkRowsForWord(letters, reverseWord);
  const foundWordVerticallyReverse = checkRowsForWord(transpose(letters), reverseWord);
  //Diagonally
  const foundWordDiagonallyBtmLeftTopRight = wordSearchBottomUpTopRight(letters,word);
  const foundWordDiagonallyBtmLeftTopRightReverse = wordSearchBottomUpTopRight(letters,reverseWord);
  const foundWordDiagonallyTopLeftBtmRight = wordSearchBottomUpTopRight(reverseRows(letters),word);
  const foundWordDiagonallyTopLeftBtmRightReverse = wordSearchBottomUpTopRight(reverseRows(letters),reverseWord);
  return foundWordHorizontally
      || foundWordVertically
      || foundWordHorizontallyReverse
      || foundWordVerticallyReverse
      || foundWordDiagonallyBtmLeftTopRight
      || foundWordDiagonallyBtmLeftTopRightReverse
      || foundWordDiagonallyTopLeftBtmRight
      || foundWordDiagonallyTopLeftBtmRightReverse
    ? true : false;
};

module.exports = wordSearch;