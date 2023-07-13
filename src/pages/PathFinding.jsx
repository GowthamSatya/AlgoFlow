import { useEffect, useState } from "react";

import PathNode from "../components/PathNode";
import PathToolbar from "../components/PathToolbar";

import {
	dijkshtra,
	generateMaze,
	BFS,
	DFS,
	AStar,
	GRID_COLS,
	GRID_ROWS,
	START_X,
	START_Y,
	END_X,
	END_Y,
	DEFAULT_PATH_ALGO,
	getShortestPath,
	DEFAULT_PATH_SPEED,
} from "../utils";

const PathFinding = () => {
	const [pathGrid, setPathGrid] = useState([]); // the defualt grid
	const [currentAlgo, setCurrentAlgo] = useState(DEFAULT_PATH_ALGO);
	const [pressed, setIsPressed] = useState(false); // state for mouse events
	const [running, setRunning] = useState(false); // state for alg running
	const [help, setHelp] = useState(false); // helper to force update the state
	const [speed, setSpeed] = useState(DEFAULT_PATH_SPEED); // visual speed of the algoS

	useEffect(() => {
		const grid = initGrid(false);
		setPathGrid(grid);
	}, []);

	const visualize = () => {
		if (running) return;
		setRunning(true);

		let g = initGrid(false);
		setPathGrid(g);
		const st = g[START_X][START_Y];
		const end = g[END_X][END_Y];
		let moves;

		switch (currentAlgo) {
			case "dijkshtra":
				moves = dijkshtra(g, st, end);
				break;
			case "dfs":
				moves = DFS(g, st, end);
				break;
			case "bfs":
				moves = BFS(g, st, end);
				break;
			case "A*":
				moves = AStar(g, st, end);
				break;
		}

		// now the grid got updated we get the shortest path from it
		const shortedPath = getShortestPath(end);

		// visualize the node traversal
		for (let i = 0; i < moves.length; i++) {
			setTimeout(() => {
				const node = moves[i];
				if (!node.isStart && !node.isEnd) {
					document.getElementById(
						`nd-${node.r}-${node.c}`
					).className = `nd visited`;
				}
			}, speed * i);
		}

		// visiualze the final path
		for (let i = 0; i < shortedPath.length; i++) {
			setTimeout(() => {
				const node = shortedPath[i];
				if (!node.isStart && !node.isEnd) {
					document.getElementById(
						`nd-${node.r}-${node.c}`
					).className = `nd path`;
				}
			}, speed * moves.length + 50 * i);
		}

		// delay to setRunning state
		setTimeout(() => {
			setRunning(false);
		}, speed * moves.length + 50 * shortedPath.length);
	};

	const handleClick = () => {
		visualize();
	};

	const initGrid = (clearGrid) => {
		let g = [];

		for (let r = 0; r < GRID_ROWS; r++) {
			const curr = [];

			for (let c = 0; c < GRID_COLS; c++) {
				let isWall = false;

				const el = document.getElementById(`nd-${r}-${c}`);
				if (
					el &&
					(el.className === "nd path" || el.className === "nd visited")
				) {
					el.className = "nd";
				}

				if (!clearGrid && el && el.className === "nd wall") {
					isWall = true;
				}
				curr.push(createNode(r, c, isWall));
			}

			g.push(curr);
		}

		return g;
	};

	const createNode = (r, c, wall) => {
		return {
			r,
			c,
			isStart: r === START_X && c === START_Y,
			isEnd: r === END_X && c === END_Y,
			isWall: wall,
			prevNode: null,
			dist: Infinity,
			heuristic: Infinity,
			isVisited: false,
		};
	};

	const clearPath = () => {
		for (let r = 0; r < GRID_ROWS; r++) {
			for (let c = 0; c < GRID_COLS; c++) {
				const el = document.getElementById(`nd-${r}-${c}`);
				if (
					el &&
					(el.className === "nd visited" || el.className === "nd path")
				) {
					el.className = "nd";
				}
			}
		}
	};

	const updateWall = (grid, r, c) => {
		const node = grid[r][c];
		const newNode = {
			...node,
			isWall: !node.isWall,
		};

		grid[r][c] = newNode;
	};

	const handleMouseDown = (r, c) => {
		if (!running) {
			updateWall(pathGrid, r, c);
			setIsPressed(true);
			clearPath();
		}
	};

	const handleMouseEnter = (r, c) => {
		if (pressed) {
			updateWall(pathGrid, r, c);
			setIsPressed(true);
			setHelp(!help);
		}
	};

	const handleMouseUp = () => {
		setIsPressed(false);
	};

	return (
		<div className="path-main">
			<div className="grid-row">
				{pathGrid.map((row, rId) => {
					return (
						<div className="grid-col" key={rId}>
							{row.map((node, nodeId) => {
								const { r: row, c: col, isStart, isEnd, isWall } = node;

								return (
									<PathNode
										key={nodeId}
										r={row}
										c={col}
										isStart={isStart}
										isFinish={isEnd}
										isWall={isWall}
										onMouseDown={() => handleMouseDown(row, col)}
										onMouseEnter={() => handleMouseEnter(row, col)}
										onMouseUp={handleMouseUp}
										dist={node.dist === Infinity ? -1 : node.dist}
									/>
								);
							})}
						</div>
					);
				})}
			</div>
			<PathToolbar
				handleClick={handleClick}
				speed={speed}
				setSpeed={setSpeed}
				setCurrentAlgo={setCurrentAlgo}
				running={running}
				generateMaze={() => {
					generateMaze(pathGrid);
					setHelp(!help);
					clearPath();
				}}
			/>
		</div>
	);
};

export default PathFinding;
