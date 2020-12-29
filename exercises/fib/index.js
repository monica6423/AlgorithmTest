// --- Directions
// Print out the n-th entry in the fibonacci series.
// The fibonacci series is an ordering of numbers where
// each number is the sum of the preceeding two.
// For example, the sequence
//  [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
// forms the first ten entries of the fibonacci series.
// Example:
//   fib(4) === 3

function memoize(fn) {
    const cache = {};
    return function(...args) {
        //if we have called slowFib before, we'll look into our cache object
        //and return that
        if(cache[args]){
            return cache[args];
        }

        const result = fn.apply(this, args);
        cache[args] = result;

        return result;
    }
}

function slowFib(n) {
    //recursive solution
    //how to solve runtime??
    //memoization
    //store the arguments of each function call along with the result.
    //if the function is called again with the same arguments, return the pre-computed result
    //rather than calling the function again

    if(n < 2){
        return n
    }

    return fib(n - 1)+fib(n - 2)
}

const fib = memoize(slowFib);

module.exports = fib;


// function fib(n) {
//     const result = [0, 1];

//     //linear runtime complexity
//     for(let i = 2; i <= n; i++){
//         const a = result[i - 1];
//         const b = result[i - 2];

//         result.push(a + b);
//     }

//     return result[n];
// }



// function fib(n) {
//     //recursive solution
//    //every increase in n, we are gonna have dramatic increase in function call
//    //--->exponential runtime complexity
//     if(n < 2){
//         return n
//     }

//     return fib(n - 1)+fib(n - 2)
// }