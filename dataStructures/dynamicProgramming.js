// the recursive way, O(2^n) / O(1.6^n)

function fibonacci(num, memo = [undefined, 1, 1]) {
    if (memo[num] !== undefined) return memo[num]
    const res = fibonacci(num - 1, memo) + fibonacci(num - 2, memo)
    memo[num] = res
    return res
}


