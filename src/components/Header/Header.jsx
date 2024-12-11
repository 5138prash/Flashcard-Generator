import { Link } from 'react-router-dom';
import logo from '../../images/logo/logo.png'
// Renders the Logo of the App at the top.
export default function Header() {
    return (
        <header className='bg-white w-full items-center flex  h-[100px] px-5 py-[5px] shadow-lg'>
            <Link to={'/'} >
                <img src={logo} className="h-[60px]   cursor-pointer"  alt="Logo" />
            </Link>
        </header>
    );
}