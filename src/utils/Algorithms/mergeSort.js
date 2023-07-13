const mergeSort = (arr) => {
	let array = [...arr];
	const moves = [];
	if (array.length <= 1) return array;
	const auxiliaryArray = array.slice();
	mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, moves);
	return moves;
};

const mergeSortHelper = (
	mainArray,
	startIdx,
	endIdx,
	auxiliaryArray,
	moves
) => {
	if (startIdx === endIdx) return;
	const middleIdx = Math.floor((startIdx + endIdx) / 2);
	mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, moves);
	mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, moves);
	doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, moves);
};

const doMerge = (
	mainArray,
	startIdx,
	middleIdx,
	endIdx,
	auxiliaryArray,
	moves
) => {
	let k = startIdx;
	let i = startIdx;
	let j = middleIdx + 1;
	while (i <= middleIdx && j <= endIdx) {
		// These are the values that we're comparing; we push them once
		// to change their color.
		moves.push([i, j]);
		// These are the values that we're comparing; we push them a second
		// time to revert their color.
		moves.push([i, j]);
		if (auxiliaryArray[i] <= auxiliaryArray[j]) {
			// We overwrite the value at index k in the original array with the
			// value at index i in the auxiliary array.
			moves.push([k, auxiliaryArray[i]]);
			mainArray[k++] = auxiliaryArray[i++];
		} else {
			// We overwrite the value at index k in the original array with the
			// value at index j in the auxiliary array.
			moves.push([k, auxiliaryArray[j]]);
			mainArray[k++] = auxiliaryArray[j++];
		}
	}
	while (i <= middleIdx) {
		// These are the values that we're comparing; we push them once
		// to change their color.
		moves.push([i, i]);
		// These are the values that we're comparing; we push them a second
		// time to revert their color.
		moves.push([i, i]);
		// We overwrite the value at index k in the original array with the
		// value at index i in the auxiliary array.
		moves.push([k, auxiliaryArray[i]]);
		mainArray[k++] = auxiliaryArray[i++];
	}
	while (j <= endIdx) {
		// These are the values that we're comparing; we push them once
		// to change their color.
		moves.push([j, j]);
		// These are the values that we're comparing; we push them a second
		// time to revert their color.
		moves.push([j, j]);
		// We overwrite the value at index k in the original array with the
		// value at index j in the auxiliary array.
		moves.push([k, auxiliaryArray[j]]);
		mainArray[k++] = auxiliaryArray[j++];
	}
};

export default mergeSort;
