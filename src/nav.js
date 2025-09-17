import 'bootstrap/dist/css/bootstrap.min.css';
function Nav (){
    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <ul className='navbar-nav'>
                <li className='nav-item'>
                    <a className='nav-link'>Beginers</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link'>Mediems</a>
                </li>
                <li className='nav-item'>                    
                    <a className='nav-link'>Expert</a>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;