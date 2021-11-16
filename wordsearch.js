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

//transposeDiagonal
/*
[1 2 3] 
[4 5 6]
[7 8 9] 

[9 6 3]
[8 5 2]
[7 4 1]

[0,0] [0,1] [0,2]
[1,0] [1,1] [1,2]
[2,0] [2,1] [2,2]

[2,2] [1,2] [0, 2]
[2,1] [1,1] [0, 1]
[2,0] [1,0] [0, 0]

[i,j-0] [i-1,j-0] [i-2, j-0] [p = 0, q =0] [p = 0, q = 1] [p = 0, q = 2]
[i,j-1] [i-1,j-1] [i-2, j-1] [p = 1, q =0] [p = 1, q = 1] [p = 1, q = 2]
[i,j-2] [i-1,j-2] [i-2, j-2] [p = 2, q =0] [p = 2, q = 1] [p = 2, q = 2]
*/

const letters = [
    ['A', 'W', 'C', 'F', 'Q', 'U', 'A', 'L'],
    ['S', 'E', 'I', 'N', 'F', 'E', 'L', 'D'],
    ['Y', 'F', 'C', 'F', 'Q', 'U', 'A', 'L'],
    ['H', 'M', 'J', 'T', 'E', 'V', 'R', 'G'],
    ['W', 'H', 'C', 'S', 'Y', 'E', 'R', 'L'],
    ['B', 'F', 'R', 'E', 'N', 'E', 'Y', 'B'],
    ['U', 'B', 'T', 'W', 'A', 'P', 'A', 'I'],
    ['O', 'D', 'C', 'A', 'K', 'U', 'A', 'S'],
    ['E', 'Z', 'K', 'F', 'Q', 'U', 'A', 'L'],
  ];


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
  
const transposeDiagonally = (matrix) => {
    if (!matrix.length) return [];
    let rowsOfMatrix = matrix.length;
    let colsOfMatrix = matrix[0].length;
    let newMatrix = makeArray(rowsOfMatrix, colsOfMatrix);
  
    for (let p = 0; p < rowsOfMatrix; p++) {
      for (let q = 0; q < colsOfMatrix; q++){
        newMatrix[p][q] = matrix[rowsOfMatrix - 1 - q][colsOfMatrix - 1 - p];
      }
    }
  
    return newMatrix;
  }
  
//   printMatrix(makeArray(3,3));
//   printMatrix(transposeDiagonally(letters));
  printMatrix(transposeDiagonally([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
  
//   //Generate List of stings:
//   // A
//   // S W
//   // Y E C
  
const generateStringsDiagonally = (matrix) => {
    let arrayOfStrings = [];
    for (let i = 0; i < matrix.length; i++) {
        //let thisString = '';
        let thisRow = []
        for (let j = 0; j < matrix[0].length; j++)  {
            if (j > i) break;
            //thisString += matrix[i-j][j];
            thisRow.push(matrix[i-j][j]);
        }
        //arrayOfStrings.push(thisString);
        arrayOfStrings.push(thisRow);
    } 
    return arrayOfStrings;
}

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
    const foundInFirstHalf = checkRowsForWord(generateStringsDiagonally(letters), word);
    const foundInSecondHalf = checkRowsForWord(generateStringsDiagonally(transposeDiagonally(letters)), word);
    return foundInFirstHalf || foundInSecondHalf ? true : false;    
}


const wordSearch = (letters, word) => { 
    if(typeof word !== 'string' || word.length === 0) return false;
    //Horizontally/Vertically
    const foundWordHorizontally = checkRowsForWord(letters, word);
    const foundWordVertically = checkRowsForWord(transpose(letters), word);
    const reverseWord = word.split('').reverse().join('');
    const foundWordHorizontallyReverse = checkRowsForWord(letters, reverseWord);
    const foundWordVerticallyReverse = checkRowsForWord(transpose(letters), reverseWord);
    //Diagonally
    const foundWordDiagonally = wordSearchBottomUpTopRight(letters,word);



    return foundWordHorizontally || foundWordVertically || foundWordHorizontallyReverse || foundWordVerticallyReverse || foundWordDiagonally ? true : false;
}

module.exports = wordSearch