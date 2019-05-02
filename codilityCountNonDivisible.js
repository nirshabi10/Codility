/* You are given an array A consisting of N integers.

For each number A[i] such that 0 ≤ i < N, we want to count the number of elements of the array that are not the divisors of A[i]. We say that these elements are non-divisors.

For example, consider integer N = 5 and array A such that:

    A[0] = 3
    A[1] = 1
    A[2] = 2
    A[3] = 3
    A[4] = 6
For the following elements:

A[0] = 3, the non-divisors are: 2, 6,
A[1] = 1, the non-divisors are: 3, 2, 3, 6,
A[2] = 2, the non-divisors are: 3, 3, 6,
A[3] = 3, the non-divisors are: 2, 6,
A[4] = 6, there aren't any non-divisors.
Write a function:

function solution(A);

that, given an array A consisting of N integers, returns a sequence of integers representing the amount of non-divisors.

Result array should be returned as an array of integers.

For example, given:

    A[0] = 3
    A[1] = 1
    A[2] = 2
    A[3] = 3
    A[4] = 6
the function should return [2, 4, 3, 2, 0], as explained above.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [1..50,000];
each element of array A is an integer within the range [1..2 * N].
*/

// To make this solution effiecient we first need to understand what is a non divisors
// We will first get the number's divisors, then we will check the number of occurences for each divisor in the array.
// We will add to it the number of occurences of the number itself.
// The number of non-divisors will be equal to:
// length of the array - number of divisors - number of occurences

// first let's build a helper method to return the number of divisors for a given number
// this method will run in O(n) time complexity

function getDividors(num) {
    if (num === 1) return []
    const results = [1]
    let i
    for (i = 2; i < Math.sqrt(num); i++) {
        if (num % i === 0) results.push(i, num / i)
    }
    if (i === Math.sqrt(num)) results.push(i)
    return results
}

// then we will create a helper function that given an array, it returns an object will all the information we need
// The time complexity here is O(n*logm) when n is the array length and m is the largest number in the array (worst case)

function createHelperObj(array) {
    const obj = {}
    for (let i = 0; i < array.length; i++) {
        let num = array[i]
        if (!obj[num]) {
            let dividers = getDividors(num)
            obj[num] = {
                occurences: 1,
                dividers: dividers
            }
        } else {
            obj[num].occurences += 1
        }
    }
    return obj
}

// we now can use these functions to help compute the number of non-divisors

function solution(A) {
    const len = A.length
    const helpObj = createHelperObj(A)
    const results = []

    for (let i = 0; i < len; i++) {
        let num = A[i]
        let numberOfDivisors = 0
        for (let val of helpObj[num].dividers) {
            if (!helpObj[val]) continue
            numberOfDivisors += helpObj[val].occurences
        }
        let numberOfNonDivisors = len - helpObj[num].occurences - numberOfDivisors
        results.push(numberOfNonDivisors)
    }
    return results
}