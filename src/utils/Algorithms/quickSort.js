import { swapNpush } from "..";

// a function for swapping 2 elements
function s2(arr, i1, i2, moves) {
	const temp = arr[i2];
	// change colours
	moves.push([i1, i2]);
	// revert colours
	moves.push([i1, i2]);
	// swap the numbers
	moves.push([i1, arr[i2], i2, arr[i1]]);
	arr[i2] = arr[i1];
	arr[i1] = temp;
}

const quickSort = (arr) => {
	let array = [...arr];
	const moves = [];

	// base case
	if (array.length < 2) {
		return array;
	}
	// select pivot element randomly
	const pivotIndex = 0;
	// swap pivot to index 0. pivot element is thus forth at array[0]
	s2(array, pivotIndex, 0, moves);
	// i denotes boundary between smaller and larger elements than pivot
	let i = 1;
	// iterate over all elements larger than 0 (pivot). If the element is larger than
	// pivot, swap it with ith element and advance i
	for (let j = 1; j < array.length; j++) {
		//console.log(`iteration: ${j}`)
		if (array[j] < array[0]) {
			//console.log(array[j])
			s2(array, i, j, moves);
			i++;
		} else {
			// change colours
			moves.push([i, j]);
			// revert colours
			moves.push([i, j]);
			//no swap yet
			moves.push("noSwap");
		}
	}
	s2(array, 0, i - 1, moves);
	const leftArray = array.slice(0, i - 1);
	const rightArray = array.slice(i, array.length);
	// recursively apply the same to left and right subarrays and merge
	const auxiliaryArray = array.slice();
	QuickSortHelper(leftArray, moves, auxiliaryArray, 0);
	QuickSortHelper(rightArray, moves, auxiliaryArray, i);
	return moves;
};

const QuickSortHelper = (mainArray, moves, auxArray, startIdx) => {
	// base case
	if (mainArray.length < 2) {
		return;
	}

	const pivotIndex = 0;
	swapNpush(mainArray, pivotIndex, 0, auxArray, startIdx, startIdx, moves);
	let i = 1;
	let iTracker = startIdx + 1;
	let jTracker = startIdx + 1;
	for (let j = 1; j < mainArray.length; j++) {
		if (mainArray[j] < mainArray[0]) {
			//console.log(array[j])
			swapNpush(mainArray, i, j, auxArray, iTracker, jTracker, moves);
			i++;
			iTracker++;
			jTracker++;
		} else {
			// change colours
			moves.push([iTracker, jTracker]);
			// revert colours
			moves.push([iTracker, jTracker]);
			//no swap yet
			moves.push("noSwap");
			jTracker++;
		}
	}
	swapNpush(mainArray, 0, i - 1, auxArray, startIdx, iTracker - 1, moves);
	const leftArray = mainArray.slice(0, i - 1);
	const rightArray = mainArray.slice(i, mainArray.length);
	// recursively apply the same to left and right subarrays and merge
	QuickSortHelper(leftArray, moves, auxArray, startIdx);
	QuickSortHelper(rightArray, moves, auxArray, iTracker);
};

export default quickSort;
