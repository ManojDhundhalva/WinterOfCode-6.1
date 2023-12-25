import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuIcon from '@mui/icons-material/Menu';
//new
import { useFirebase } from '../Context/Firebase';


function NavBar() {
    const firebase = useFirebase();

    const navbarStyle = {
        position: 'sticky',
        top: '0%',
        zIndex: 100,
        backgroundColor: '#20247B',
        margin: 0,
    };
    console.log('inNav : ', firebase.isLoggedIn);

    return (
        <nav className=" navbar navbar-expand-lg p-2" style={navbarStyle}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home" style={{ color: 'white', fontWeight: 'bold', fontSize: 'x-large' }}>
                    YATRA
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <MenuIcon style={{ color: 'white' }} />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <div className="my-button">
                                <Link className="nav-link active" to="/" style={{ color: 'white' }}>
                                    Home
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="my-button">
                                <Link className="nav-link" to="/booklist" style={{ color: 'white' }}>
                                    Booklist
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="my-button">
                                <Link className="nav-link" to="/about" style={{ color: 'white' }}>
                                    AboutUS
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            {/* <div className="my-button"> */}
                            {firebase.isLoggedIn ?
                                <Link className="nav-link" to="/profile" style={{ color: 'white' }}>
                                    <AccountCircleOutlinedIcon fontSize='large' />
                                </Link>
                                :
                                <Link className="nav-link" to="/login" style={{ color: 'white' }}>
                                    LogIn/SignUP
                                </Link>
                            }
                            {/* </div> */}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
