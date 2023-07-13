import "./App.css";
import { Link } from "react-router-dom";

function App() {
	return (
		<div>
			<Link to="/sorting">
				<button>Sorting</button>
			</Link>
			<Link to="/path-finding">
				<button>Path Finding</button>
			</Link>
		</div>
	);
}

export default App;
