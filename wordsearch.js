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
  
const printMatrix = (matrix) => {
    for (const row of matrix) {
        for (const el of row) {
            process.stdout.write(el + " ");
        }
        process.stdout.write('\n');
    }
};

  //Loop for number rows
  //Once number of rows reached
  //Loop for number of columns -- i = row.length

  const coordinatesValid = function (matrix, i, j) {
    let noRows = matrix.length;
    let noCols = matrix[0].length;
    return (i >= 0 && i < noRows) && (j >= 0 && j < noCols);
  }

  const generateStringsDiagonally = (matrix) => {
    let arrayOfStrings = [];
    for (let i = 0; i < matrix.length; i++) {
        let thisRow = []
        for (let j = 0; j < matrix[0].length; j++)  {
            if (j > i) break;
            thisRow.push(matrix[i-j][j]);
        }
        arrayOfStrings.push(thisRow);
    }   
    for (let i = 1; i < matrix[0].length; i++) {
      let thisRow = [];
      let currentCol, currentRow; 
      for (let j = 0; j < matrix.length; j++) {
        currentRow = matrix.length - 1 - j;
        currentCol = i + j;
        if (coordinatesValid(matrix, currentRow, currentCol)){
          thisRow.push(matrix[currentRow][currentCol]);
        }
      }
      arrayOfStrings.push(thisRow);
    }

    return arrayOfStrings;
}

const makeArray = (rows, cols) => {
    let array = [];
    for (let i = 0; i < rows; i++){
        array.push([]);
        for (let j = 0; j < cols; j++){
            array[i].push('*');
        }
    }
    
    return array;
}
  
// const transposeDiagonally = (matrix) => {
//     if (!matrix.length) return [];
//     let rowsOfMatrix = matrix.length;
//     let colsOfMatrix = matrix[0].length;
//     let newMatrix = makeArray(rowsOfMatrix, colsOfMatrix);
  
//     for (let p = 0; p < rowsOfMatrix; p++) {
//       for (let q = 0; q < colsOfMatrix; q++){
//         newMatrix[p][q] = matrix[rowsOfMatrix - 1 - q][colsOfMatrix - 1 - p];
//       }
//     }
  
//     return newMatrix;
//   }
  
//   printMatrix(makeArray(3,3));
//   printMatrix(transposeDiagonally(letters));
  // printMatrix(transposeDiagonally([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
  
//   //Generate List of stings:
//   // A
//   // S W
//   // Y E C

//
console.log(generateStringsDiagonally([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));

//         [0][0]
//         [1][0] [0][1]
//         [2][0] [1][1] [0][2]

const checkRowsForWord = (letters, word) => {
    const horizontalJoin = letters.map(ls => ls.join(''))
    for (l of horizontalJoin) {
        if (l.includes(word)) return true
    }
}

const wordSearchBottomUpTopRight = (letters, word) => {
    return checkRowsForWord(generateStringsDiagonally(letters), word);
    // const foundInSecondHalf = checkRowsForWord(generateStringsDiagonally(transposeDiagonally(letters)), word);
    //return foundInFirstHalf || foundInSecondHalf ? true : false;    
}


const wordSearch = (letters, word) => { 
    if(typeof word !== 'string' || word.length === 0) return false;
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
    const foundWordDiagonallyTopLeftBtmRight = wordSearchBottomUpTopRight(transpose(letters),word);
    const foundWordDiagonallyTopLeftBtmRightReverse = wordSearchBottomUpTopRight(transpose(letters),reverseWord);
    return foundWordHorizontally 
      || foundWordVertically 
      || foundWordHorizontallyReverse
      || foundWordVerticallyReverse
      || foundWordDiagonallyBtmLeftTopRight
      || foundWordDiagonallyBtmLeftTopRightReverse
      || foundWordDiagonallyTopLeftBtmRight
      || foundWordDiagonallyTopLeftBtmRightReverse
      ? true : false;
}

module.exports = wordSearch