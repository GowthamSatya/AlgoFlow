import { Outlet, useHref } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

const Layout = () => {
	const [name, setName] = useState(null);
	const href = useHref();
	const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const [theme, setTheme] = useLocalStorage(
		"theme",
		defaultDark ? "dark" : "light"
	);
	const [color, setColor] = useState("red");

	const handleClick = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	useEffect(() => {
		if (href == "/sorting") setName("Sorting");
		else if (href == "/path-finding") setName("Pathfinding");
	}, [href]);

	return (
		<div className="main" data-theme={theme} data-color={color}>
			<Navbar name={name} handleClick={handleClick} />
			<div className="outlet">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default Layout;
