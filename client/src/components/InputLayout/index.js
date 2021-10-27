import Logo from "../Logo";
import "./style.scss";

const InputLayout = ({ children }) => {
	return (
		<div className="input-layout">
			<Logo />
			{children}
		</div>
	);
};

export default InputLayout;
