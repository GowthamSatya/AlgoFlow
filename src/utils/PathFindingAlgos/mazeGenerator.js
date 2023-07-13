const generateMaze = (grid) => {
	let sr = 5, // start row and col for maze
		sc = 15;

	let height = grid.length,
		width = grid[0].length;

	// update walls
	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			convertWall(grid, i, j, false);
		}
	}

	// update walls
	for (let i = 0; i < height; i++) {
		for (let j = (i % 2) + 1; j < width; j += (i % 2) + 1) {
			convertWall(grid, i, j, true);
		}
	}
	for (let i = 0; i < height; i++) {
		convertWall(grid, i, 0, true);
	}

	// get the clear path in generated maze
	let visited = [];
	let path = [{ r: sr, c: sc }];
	while (path.length > 0) {
		const index = getRand(path);
		const node = path[index];
		path.splice(index, 1);
		visited = visited.concat([node]);
		const { c: connected, u: unconnected } = getNeighbors(grid, visited, node);
		if (connected.length > 0) {
			let rn = getRand(connected);
			console.log(connected[rn]);
			connect(grid, node, connected[rn]);
			connected.splice(rn);
		}
		path = path.concat(unconnected);
	}
};

const getNeighbors = (grid, visited, node) => {
	let { r: row, c: col } = node;
	let neighbors = [
		{ r: row + 2, c: col },
		{ r: row - 2, c: col },
		{ r: row, c: col + 2 },
		{ r: row, c: col - 2 },
	];
	neighbors = validate(grid, neighbors.slice());
	let connected = [];
	let unconnected = [];
	neighbors.forEach((neighbor) => {
		if (isVisited(visited, neighbor)) {
			connected.push(neighbor);
		} else {
			unconnected.push(neighbor);
		}
	});
	return { c: connected, u: unconnected };
};

const isVisited = (visited, node) => {
	let { r: nr, c: nc } = node;
	for (let index = 0; index < visited.length; index++) {
		let { r: ir, c: ic } = visited[index];
		if (nr === ir && nc === ic) {
			return true;
		}
	}
	return false;
};

const validate = (grid, points) => {
	let height = grid.length,
		width = grid[0].length;
	let pRe = [];
	for (let index = 0; index < points.length; index++) {
		let { r: row, c: col } = points[index];
		if (0 <= row && row < height && 0 <= col && col < width) {
			pRe.push(points[index]);
		}
	}
	return pRe;
};

const connect = (grid, a, b) => {
	let { r: ar, c: ac } = a;
	let { r: br, c: bc } = b;
	let row = (ar + br) / 2;
	let col = (ac + bc) / 2;
	convertWall(grid, row, col, false);
};

const randInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRand = (path) => {
	return randInt(0, path.length - 1);
};

const convertWall = (grid, r, c, isWall) => {
	const node = grid[r][c];
	const newNode = {
		...node,
		isWall: isWall,
	};
	grid[r][c] = newNode;
};

export default generateMaze;
