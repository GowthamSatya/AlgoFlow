import { useEffect, useState } from "react";
import "../App.css";
import {
	quickSort,
	mergeSort,
	bubbleSort,
	selectionSort,
	generateArr,
} from "../utils";

import Toolbar from "../components/Toolbar";

const Sorting = () => {
	const [arr, setArr] = useState([]);
	const [currentAlgo, setCurrentAlgo] = useState("merge");
	const [speed, setSpeed] = useState(300);
	const [count, setCount] = useState(0);
	const [running, setIsRunning] = useState(false);

	useEffect(() => {
		const arr = generateArr(count);
		setArr(arr);
	}, [count]);

	const sortBars = () => {
		setIsRunning(true);

		switch (currentAlgo) {
			case "merge":
				merge();
				break;
			case "selection":
				select();
				break;
			case "bubble":
				bubble();
				break;
			case "quick":
				quick();
				break;
		}
	};

	const visualize = (animations) => {
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName("arr_bar");
			const isColorChange = i % 3 !== 2;
			if (isColorChange) {
				const [barOneIdx, barTwoIdx] = animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;
				const color = i % 3 === 0 ? "red" : "yellow";
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i * (600 - speed));
			} else if (animations[i] === "noSwap") {
				setTimeout(() => {}, i * (600 - speed));
			} else {
				setTimeout(() => {
					const [barOneIdx, newHeight1, barTwoIdx, newHeight2] = animations[i];
					const barOneStyle = arrayBars[barOneIdx].style;
					barOneStyle.height = `${newHeight1 / 2}px`;
					const barTwoStyle = arrayBars[barTwoIdx].style;
					barTwoStyle.height = `${newHeight2 / 2}px`;
				}, i * (600 - speed));
			}

			setTimeout(() => {
				setIsRunning(false);
			}, (i + 1) * (600 - speed) * 165);
		}
	};

	const merge = () => {
		setIsRunning(true);
		const animations = mergeSort(arr);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName("arr_bar");
			const isColorChange = i % 3 !== 2;
			if (isColorChange) {
				const [barOneIdx, barTwoIdx] = animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;
				const color = i % 3 === 0 ? "red" : "yellow";
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i * (600 - speed));
			} else {
				setTimeout(() => {
					const [barOneIdx, newHeight] = animations[i];
					const barOneStyle = arrayBars[barOneIdx].style;
					barOneStyle.height = `${newHeight / 2}px`;
				}, i * (600 - speed));
			}

			setTimeout(() => {
				setIsRunning(false);
			}, (i + 1) * (600 - speed) * 165);
		}
	};

	const select = () => {
		const moves = selectionSort(arr);
		visualize(moves);
	};

	const bubble = () => {
		const moves = bubbleSort(arr);
		visualize(moves);
	};

	const quick = () => {
		const moves = quickSort(arr);
		visualize(moves);
	};

	return (
		<div className="sorting_container">
			<div className="bar_container">
				{arr.map((i, idx) => {
					return (
						<div
							key={idx}
							className="arr_bar"
							style={{
								background: "#808080",
								width: "20px",
								height: `${i / 2}px`,
							}}
						></div>
					);
				})}
			</div>

			<Toolbar
				currentAlgo={currentAlgo}
				setCurrentAlgo={setCurrentAlgo}
				handleClick={sortBars}
				speed={speed}
				setSpeed={setSpeed}
				size={count}
				setSize={setCount}
				running={running}
				resetArray={() => {
					const arr = generateArr(count);
					setArr(arr);
				}}
			/>
		</div>
	);
};

export default Sorting;
