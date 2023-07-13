/* eslint-disable react/prop-types */
// import React from 'react'
import ReactSlider from "react-slider";
import Select from "react-select";
import "./styles.css";

const PathToolbar = ({
	setCurrentAlgo,
	handleClick,
	speed,
	setSpeed,
	running,
	generateMaze,
}) => {
	const options = [
		{ value: "dijkshtra", label: "Dijkshtra's" },
		{ value: "dfs", label: "DFS" },
		{ value: "bfs", label: "BFS" },
		{ value: "A*", label: "A* Heursitic" },
	];
	return (
		<div className="path-toolbar">
			<Select
				isDisabled={running}
				className="select-container-path"
				classNamePrefix="react-select-path"
				options={options}
				defaultValue={options[0]}
				onChange={(op) => setCurrentAlgo(op.value)}
				menuPlacement="top"
			/>

			<div className="path-slider">
				<ReactSlider
					disabled={running}
					marks
					min={1}
					max={15}
					defaultValue={15 - speed}
					onChange={(e) => setSpeed(18 - e)}
					className="horizontal-slider-path"
					thumbClassName="slider-thumb-path"
					trackClassName="slider-track-path"
					renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
				/>
			</div>

			<button disabled={running} onClick={handleClick} className="maze-btn">
				GetPath !
			</button>
			<button disabled={running} onClick={generateMaze} className="maze-btn">
				Generate Maze
			</button>
		</div>
	);
};

export default PathToolbar;
