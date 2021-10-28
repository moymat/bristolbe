import IsAuth from "../IsAuth";
import Logo from "../Logo";
import "./style.scss";

const InputLayout = ({ children }) => {
	return (
		<div className="input-layout">
			<IsAuth />
			<Logo />
			{children}
		</div>
	);
};

export default InputLayout;
