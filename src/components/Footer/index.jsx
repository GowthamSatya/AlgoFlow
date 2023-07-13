import "./styles.css";
import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
	return (
		<div className="footer">
			<div>
				<span>Made with ❤️ - by Gowtham Satya</span>
			</div>
			<div className="social-icons">
				<AiFillGithub size={20} />
			</div>
		</div>
	);
};

export default Footer;
