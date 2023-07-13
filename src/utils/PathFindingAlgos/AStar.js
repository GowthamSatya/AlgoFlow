import { getAllNodes, getSortedStar, updateNeighborsStar } from "..";

const AStar = (grid, startNode, endNode) => {
	// store all the final moves required
	const moves = [];

	// start node dist is always zero
	startNode.dist = 0;
	startNode.heuristic = 0;

	// AllNodes - A function that returns 2d grid in 1d form
	const unvisited = getAllNodes(grid);

	// travrsing the unvisited array
	while (unvisited.length) {
		// sort all the nodes based on the heuristic
		getSortedStar(unvisited);
		// get the first element of arr
		const cur = unvisited.shift();
		// if it is end node we reached the goal
		if (cur === endNode) {
			return moves;
		}
		// if it is wall ignore it
		if (cur.isWall) continue;
		// if the node is unreachable
		if (cur.dist + cur.heuristic === Infinity) return moves;
		// set the node to visited
		cur.isVisited = true;
		// include this node in our path
		moves.push(cur);
		// util function to update the neighbors
		updateNeighborsStar(cur, grid, endNode);
	}
	return moves;
};

export default AStar;
