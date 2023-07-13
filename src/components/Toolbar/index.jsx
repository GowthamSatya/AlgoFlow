/* eslint-disable react/prop-types */
// import React from 'react'
import ReactSlider from "react-slider";
import Select from "react-select";
import "./styles.css";

const Toolbar = ({
	setCurrentAlgo,
	handleClick,
	speed,
	setSpeed,
	size,
	running,
	setSize,
	resetArray,
}) => {
	const options = [
		{ value: "merge", label: "Merge Sort" },
		{ value: "quick", label: "Quick Sort" },
		{ value: "selection", label: "Selection Sort" },
		{ value: "bubble", label: "Bubble Sort" },
	];
	return (
		<div className="toolbar">
			<Select
				isDisabled={running}
				className="select-container"
				classNamePrefix="react-select"
				options={options}
				defaultValue={options[0]}
				onChange={(op) => setCurrentAlgo(op.value)}
				menuPlacement="top"
			/>
			<div className="sliders">
				<div className="slider">
					<ReactSlider
						defaultValue={size}
						disabled={running}
						onChange={(e) => setSize(e)}
						className="horizontal-slider"
						thumbClassName="slider-thumb"
						trackClassName="slider-track"
						renderThumb={(props, state) => (
							<div {...props}>{state.valueNow}</div>
						)}
					/>
				</div>
				<div className="slider">
					<ReactSlider
						disabled={running}
						marks
						min={1}
						max={20}
						defaultValue={speed / 30}
						onChange={(e) => setSpeed(e * 30)}
						className="horizontal-slider"
						thumbClassName="slider-thumb"
						trackClassName="slider-track"
						renderThumb={(props, state) => (
							<div {...props}>{state.valueNow}</div>
						)}
					/>
				</div>
			</div>

			<button disabled={running} onClick={handleClick} className="sort-btn">
				Sort !
			</button>
			<button disabled={running} onClick={resetArray} className="sort-btn">
				Generate Array
			</button>
		</div>
	);
};

export default Toolbar;
