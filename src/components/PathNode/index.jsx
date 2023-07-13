/* eslint-disable react/prop-types */
import "./styles.css";

// Simple node in a path
const PathNode = ({
	r,
	c,
	onMouseDown,
	onMouseEnter,
	onMouseUp,
	isFinish,
	isStart,
	isWall,
}) => {
	// update the state of node with colors
	const state = isStart ? "start" : isFinish ? "finish" : isWall ? "wall" : "";

	return (
		<div
			className={`nd ${state}`}
			id={`nd-${r}-${c}`}
			onMouseDown={onMouseDown}
			onMouseEnter={onMouseEnter}
			onMouseUp={onMouseUp}
		></div>
	);
};

export default PathNode;
