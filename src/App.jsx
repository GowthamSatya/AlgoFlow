import "./App.css";
import { Link } from "react-router-dom";
import Card from "./components/Card";

function App() {
	return (
		<div className="main-page">
			<Link className="sort" to="/sorting">
				<Card name="Sorting" />
			</Link>
			<Link className="sort" to="/path-finding">
				<Card name="Path Finding" />
			</Link>
		</div>
	);
}

export default App;
