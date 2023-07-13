import { getAllNodes, getSorted, updateUnvisitedNeighbors } from "..";

const dijkshtra = (grid, startNode, endNode) => {
	const visitedInOrder = [];
	startNode.dist = 0;
	const unvisited = getAllNodes(grid);

	while (unvisited.length) {
		getSorted(unvisited);
		const node = unvisited.shift();
		if (node === endNode) {
			return visitedInOrder;
		}
		if (node.isWall) continue;
		if (node.dist === Infinity) return visitedInOrder;
		node.isVisited = true;
		visitedInOrder.push(node);

		updateUnvisitedNeighbors(node, grid);
	}
	return visitedInOrder;
};

export default dijkshtra;
