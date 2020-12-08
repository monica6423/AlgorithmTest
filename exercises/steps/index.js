// --- Directions
// Write a function that accepts a positive number N.
// The function should console log a step shape
// with N levels using the # character.  Make sure the
// step has spaces on the right hand side!
// --- Examples
//   steps(2)
//       '# '
//       '##'
//   steps(3)
//       '#  '
//       '## '
//       '###'
//   steps(4)
//       '#   '
//       '##  '
//       '### '
//       '####'


//recursion tips:
//1. identify base case, where do we stop to make a return;
//2. call function again, making sure the arguments have changed in some fashion

function steps(n, row = 0, stair = '') {
    if(n === row){
        return;
    }

    //if we hit the end of the row, we console log and call step again
    if(n === stair.length){
        console.log(stair);
        //call the steps move on to next row
        return steps(n, row + 1);
    }

    if(stair.length <= row){
        stair += '#';
    }else{
        stair += ' '; 
    }

    //call steps again 
    steps(n, row, stair);
}

module.exports = steps;


// function steps(n) {
//     for(let row = 0; row < n; row++){
//         let stair = '';

//         for(let column = 0; column < n; column++){
//             if(column <= row){
//                 stair += '#';
//             }else{
//                 stair += ' ';
//             }
//         }

//         console.log(stair);
//     }
// }