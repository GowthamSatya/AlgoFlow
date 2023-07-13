import { getNeighbors } from "..";

// Same as BFS
const DFS = (grid, startNode, endNode) => {
	const moves = [];
	let unvisited = [];
	unvisited.push(startNode);

	while (unvisited.length) {
		const node = unvisited.pop();
		if (node === endNode) {
			return moves;
		}
		if (node.isWall) continue;
		node.isVisited = true;
		moves.push(node);

		unvisited = unvisited.concat(getNeighbors(node, grid));
	}

	return moves;
};

export default DFS;
