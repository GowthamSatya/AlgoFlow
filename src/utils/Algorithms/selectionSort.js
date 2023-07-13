const selectionSort = (arr) => {
	let array = [...arr];
	const moves = [];
	for (let i = 0; i < array.length; i++) {
		// set current index as minimum
		let min = i;
		let temp = array[i];
		for (let j = i + 1; j < array.length; j++) {
			// change colours
			moves.push([min, j]);
			// revert colours
			moves.push([min, j]);
			//no swap yet
			moves.push("noSwap");
			if (array[j] < array[min]) {
				//update minimum if current is lower that what we had previously
				min = j;
			}
		}
		// change colours
		moves.push([i, min]);
		// revert colours
		moves.push([i, min]);
		// swap the numbers
		moves.push([i, array[min], min, array[i]]);
		array[i] = array[min];
		array[min] = temp;
	}
	return moves;
};

export default selectionSort;
