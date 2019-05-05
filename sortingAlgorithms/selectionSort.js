// Time Complexity O(n^2)
// Space Complexity O(1)

function selectionSort(arr) {
    const swap = (arr, idx1, idx2) => {
        [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
    }

    //make a for loop to run on everything
    //set the minimum to the first element
    //make an inner loop and start running from the second one and on
    //compare each element to the minimum and save the index
    //swap the two elements
    for (let i = 0; i < arr.length; i++) {
        let lowest = i
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[lowest] < arr[j]) lowest = j
        }
        if (lowest !== i) swap(arr, i, minIndex)
    }
    return arr
}

// var data = Array.apply(null, {length: 100000}).map(Function.call, Math.random)
// dateStart = new Date()
// bubbleSort(data)
// dateEnd = new Date()
// console.log(dateEnd.getTime() - dateStart.getTime())