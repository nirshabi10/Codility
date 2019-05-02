/* A prime is a positive integer X that has exactly two distinct divisors: 1 and X. The first few prime integers are 2, 3, 5, 7, 11 and 13.

A semiprime is a natural number that is the product of two (not necessarily distinct) prime numbers. The first few semiprimes are 4, 6, 9, 10, 14, 15, 21, 22, 25, 26.

You are given two non-empty arrays P and Q, each consisting of M integers. These arrays represent queries about the number of semiprimes within specified ranges.

Query K requires you to find the number of semiprimes within the range (P[K], Q[K]), where 1 ≤ P[K] ≤ Q[K] ≤ N.

For example, consider an integer N = 26 and arrays P, Q such that:

    P[0] = 1    Q[0] = 26
    P[1] = 4    Q[1] = 10
    P[2] = 16   Q[2] = 20
The number of semiprimes within each of these ranges is as follows:

(1, 26) is 10,
(4, 10) is 4,
(16, 20) is 0.
Write a function:

class Solution { public int[] solution(int N, int[] P, int[] Q); }

that, given an integer N and two non-empty arrays P and Q consisting of M integers, returns an array consisting of M elements specifying the consecutive answers to all the queries.

For example, given an integer N = 26 and arrays P, Q such that:

    P[0] = 1    Q[0] = 26
    P[1] = 4    Q[1] = 10
    P[2] = 16   Q[2] = 20
the function should return the values [10, 4, 0], as explained above.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [1..50,000];
M is an integer within the range [1..30,000];
each element of arrays P, Q is an integer within the range [1..N];
P[i] ≤ Q[i].
*/

// let's first create a function that returns all the prime numbers of to N
// the function returns an array containing all the numbers from 0 to N. 
// each prime number gets the value of 0.

function arrayF(n) {
    const F = Array.from({ length: n + 1 }, num => 0)
    i = 2
    while (i * i <= n) {
        if (F[i] === 0) {
            let k = i * i
            while (k <= n) {
                if (F[k] === 0) {
                    F[k] = i
                }
                k += i
            }
        }
        i += 1
    }
    return F
}

// now lets create another function that given an array of PrimeNumbers an a number, returns the number of primeFactors

function factorization(x, F) {
    const primeFactors = []
    while (F[x] > 0) {
        primeFactors.push(F[x])
        x = x / F[x]
    }
    primeFactors.push(x)
    return primeFactors
}

// now we'll use the two helper methods to create an array containing the number of semiPrimes up to N

function getSemiPrimesUpToN(N) {
    const primeNumbersUpToN = arrayF(N)
    const semiPrimes = Array.from({ length: N + 1 }, num => 0)
    let num = 0
    for (let i = 2; i < N + 1; i++) {
        if (factorization(i, primeNumbersUpToN).length == 2) {
            num++
            semiPrimes[i] = num
        } else {
            semiPrimes[i] = num
        }
    }
    return semiPrimes
}

function solution(N, P, Q) {
    const results = []
    const semiPrimes = getSemiPrimesUpToN(N)
    for (let key in P) {
        let count = semiPrimes[Q[key]] - semiPrimes[P[key] - 1]
        results.push(count)
    }
    return results
}