/* 
Two positive integers N and M are given. Integer N represents the number of chocolates arranged in a circle, numbered from 0 to N − 1.

You start to eat the chocolates. After eating a chocolate you leave only a wrapper.

You begin with eating chocolate number 0. Then you omit the next M − 1 chocolates or wrappers on the circle, and eat the following one.

More precisely, if you ate chocolate number X, then you will next eat the chocolate with number (X + M) modulo N (remainder of division).

You stop eating when you encounter an empty wrapper.

For example, given integers N = 10 and M = 4. You will eat the following chocolates: 0, 4, 8, 2, 6.

The goal is to count the number of chocolates that you will eat, following the above rules.

Write a function:

function solution(N, M);

that, given two positive integers N and M, returns the number of chocolates that you will eat.

For example, given integers N = 10 and M = 4. the function should return 5, as explained above.

Write an efficient algorithm for the following assumptions:

N and M are integers within the range [1..1,000,000,000].

*/

// Using Euclidean divide and conquer technique to get the greatest common divisor

function Euclidean(a, b, res) {
    if (a === b) {
        return res * a
    } else if (a % 2 === 0 && b % 2 === 0) {
        return Euclidean(a / 2, b / 2, 2 * res)
    } else if (a % 2 === 0) {
        return Euclidean(a / 2, b, res)
    } else if (b % 2 === 0) {
        return Euclidean(a, b / 2, res)
    } else if (a > b) {
        return Euclidean(a - b, b, res)
    } else {
        return Euclidean(a, b - a, res)
    }

}

// using lcm to get the least common multiple

function lcm(a, b) {
    return (a * b) / (Euclidean(a, b, 1))
}

// the least common multiple, divided by M will give us the answer.

function solution(N, M) {
    return lcm(N, M) / M

}


