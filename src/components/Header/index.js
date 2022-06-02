import './header.css';
import { Link } from 'react-router-dom';

function Header(){
    return (
        <header>
            <Link className='logo' to='/'>Net Filmes</Link>
            <Link className='favoritos' to="/favoritos">Meus Favoritos</Link>
        </header>
    )
}

export default Header;