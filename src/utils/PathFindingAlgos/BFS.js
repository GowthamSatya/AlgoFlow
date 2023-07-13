import { getNeighbors } from "..";

const BFS = (grid, startNode, endNode) => {
	const moves = [];
	let unvisited = [];
	// update the dist of the start node
	startNode.dist = 0;
	unvisited.push(startNode);

	// traverse the queue
	while (unvisited.length) {
		const node = unvisited.shift();
		// reached the goal
		if (node === endNode) {
			return moves;
		}
		// skip wall
		if (node.isWall) continue;
		// udpate visited
		node.isVisited = true;
		// add the curr node to path
		moves.push(node);
		// update the Neighborss
		unvisited = unvisited.concat(getNeighbors(node, grid));
	}

	return moves;
};

export default BFS;
