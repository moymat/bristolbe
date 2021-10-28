import Logo from "../Logo";
import "./style.scss";


export default function InputLayout({children}) {
    
    return (
        <div className="input-layout"> 
            <Logo />
            {children}
        </div>
    )
}