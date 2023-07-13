const bubbleSort = (arr) => {
	let array = [...arr];
	const moves = [];
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length - 1 - i; j++) {
			// change colours
			moves.push([j, j + 1]);
			// revert colours
			moves.push([j, j + 1]);
			if (array[j] > array[j + 1]) {
				//Swap the numbers
				let temp = array[j];
				moves.push([j, array[j + 1], j + 1, array[j]]);
				array[j] = array[j + 1];
				array[j + 1] = temp;
			} else {
				moves.push("noSwap");
			}
		}
	}
	return moves;
};

export default bubbleSort;
