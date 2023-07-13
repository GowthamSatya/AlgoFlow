export const GRID_ROWS = 30;
export const GRID_COLS = 30;
export const START_X = 1;
export const START_Y = 3;
export const END_X = 24;
export const END_Y = 28;
export const DEFAULT_PATH_SPEED = 7;
export const DEFAULT_PATH_ALGO = "dijkshtra";
export const DEFAULT_SORT_ALGO = "merge";

export { default as dijkshtra } from "./PathFindingAlgos/dijkshtra";
export { default as DFS } from "./PathFindingAlgos/dijkshtra";
export { default as BFS } from "./PathFindingAlgos/dijkshtra";
export { default as AStar } from "./PathFindingAlgos/dijkshtra";
export { default as generateMaze } from "./PathFindingAlgos/dijkshtra";
export { default as quickSort } from "./Algorithms/quickSort";
export { default as mergeSort } from "./Algorithms/mergeSort";
export { default as bubbleSort } from "./Algorithms/bubbleSort";
export { default as selectionSort } from "./Algorithms/selectionSort";

export const swap = (arr, i1, i2) => {
	const temp = arr[i2];
	arr[i2] = arr[i1];
	arr[i1] = temp;
};

export const swapNpush = (arr, i1, i2, auxArr, Idx1, Idx2, moves) => {
	// change colours
	moves.push([Idx1, Idx2]);
	// revert colours
	moves.push([Idx1, Idx2]);
	// swap the numbers
	moves.push([Idx1, auxArr[Idx2], Idx2, auxArr[Idx1]]);
	swap(arr, i1, i2);
	swap(auxArr, Idx1, Idx2);
};

export const generateArr = (count) => {
	let arr = Array.from(
		{ length: count + 10 },
		() => Math.floor(Math.random() * (900 - 5 + 1)) + 5
	);

	return arr;
};

export const getAllNodes = (grid) => {
	const res = [];
	for (const row of grid) for (const nd of row) res.push(nd);
	return res;
};

// return the shortest path
// backtrack from the endNodeNode
export const getShortestPath = (endNode) => {
	const path = [];
	let cur = endNode;
	while (cur !== null) {
		path.unshift(cur);
		cur = cur.prevNode;
	}
	return path;
};

export const getSorted = (nodes) => {
	nodes.sort((a, b) => a.dist - b.dist);
};

export const updateUnvisitedNeighbors = (closest, grid) => {
	const nbrs = [];
	const { r: row, c: col } = closest;

	//check boundaries and push
	if (row > 0) nbrs.push(grid[row - 1][col]);
	if (row < grid.length - 1) nbrs.push(grid[row + 1][col]);
	if (col > 0) nbrs.push(grid[row][col - 1]);
	if (col < grid[0].length - 1) nbrs.push(grid[row][col + 1]);
	for (const nbr of nbrs) {
		if (!nbr.isVisited) {
			nbr.dist = closest.dist + 1;
			nbr.prevNode = closest;
		}
	}
};

export const getNeighbors = (node, grid) => {
	const nbrs = [];
	const res = [];
	const { r: row, c: col } = node;

	// bounds checking
	if (row < grid.length - 1) nbrs.push(grid[row + 1][col]);
	if (row > 0) nbrs.push(grid[row - 1][col]);
	if (col < grid[0].length - 1) nbrs.push(grid[row][col + 1]);
	if (col > 0) nbrs.push(grid[row][col - 1]);

	for (let index = 0; index < nbrs.length; index++) {
		const nbr = nbrs[index];
		// update the neighbors params
		if (!nbr.isVisited) {
			nbr.dist = node.dist + 1;
			nbr.prevNode = node;
			nbr.isVisited = true;
			res.push(nbr);
		}
	}
	return res;
};

// simple js sort function utilty for A* Heurisitic Sorting
export const getSortedStar = (nodes) => {
	nodes.sort((a, b) => a.dist + a.heuristic - (b.dist + b.heuristic));
};

// simple manattanDistance function utilty for
function manhattanDistance(a, b) {
	return Math.abs(a.r - b.r) + Math.abs(a.c - b.c);
}

export const updateNeighborsStar = (cur, grid, endNode) => {
	const nbrs = [];
	// get the row and col of current node
	const { r: row, c: col } = cur;

	// checking the boundaries
	if (row > 0) nbrs.push(grid[row - 1][col]);
	if (row < grid.length - 1) nbrs.push(grid[row + 1][col]);
	if (col > 0) nbrs.push(grid[row][col - 1]);
	if (col < grid[0].length - 1) nbrs.push(grid[row][col + 1]);

	// update the dist and heuristic of its neighbors
	for (const nbr of nbrs) {
		if (!nbr.isVisited) {
			nbr.dist = cur.dist + 1;
			nbr.heuristic = manhattanDistance(nbr, endNode);
			nbr.prevNode = cur;
		}
	}
};
