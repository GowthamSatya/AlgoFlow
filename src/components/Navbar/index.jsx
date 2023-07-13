import "./styles.css";
import { IoIosArrowBack } from "react-icons/io";

const Navbar = ({ name, handleClick }) => {
	const handleBackBtn = () => {
		window.location.href = "/";
	};
	return (
		<div className="navbar">
			{name && (
				<div className="nav_left">
					<button onClick={handleBackBtn} className="back-btn">
						<IoIosArrowBack size={30} />
					</button>
					<h3>{name} Visualizer</h3>
				</div>
			)}

			<div className="nav_right">
				<h2>Algo-Visualizer</h2>
			</div>
		</div>
	);
};

export default Navbar;
