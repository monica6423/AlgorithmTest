// --- Directions
// Write a function that accepts a positive number N.
// The function should console log a pyramid shape
// with N levels using the # character.  Make sure the
// pyramid has spaces on both the left *and* right hand sides
// --- Examples
//   pyramid(1)
//       '#'
//   pyramid(2)
//       ' # '
//       '###'
//   pyramid(3)
//       '  #  '
//       ' ### '   1-3 <= 1 &&  1+3>= 1
//       '#####'

function pyramid(n, row = 0, level ='') {
   if(row === n) {
       return;
   }

   if(level.length === 2 * n -1) {
    //log the current level
    //and move on to next row
    console.log('level',level);
    //increment row by 1
    return pyramid(n, row + 1);
   }

   //decide add space or # 
   //if its within the range  midpoint+-range
   const midpoint = Math.floor(( 2 * n -1) /2);
   let add;
   if(midpoint - row <= level.length && midpoint + row >= level.length){
       console.log('level.length',level, level.length)
       add = '#';
       console.log('add', add)
   }else{
       add = ' ';
   }

   pyramid(n, row, level + add);
}

module.exports = pyramid;

// function pyramid(n) {
//     const midpoint = Math.floor((2*n-1)/2);

//     for(let row = 0; row < n; row++){
//         let level = '';

//         for(let column = 0; column < 2 * n - 1; column++) {
//             //calculate the midpoint of our row
//             if (midpoint - row <= column && midpoint + row >= column) {
//                 level += '#';
//             } else {
//                 level += ' ';
//             }
//         }

//         console.log(level)
//     } 
// }