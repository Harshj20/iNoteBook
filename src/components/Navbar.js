import React, {useContext} from 'react'
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import darkContext from '../context/darkMode/darkContext'

const Navbar = () => {
    const history = useHistory();
    const a = useContext(darkContext);
    const location = useLocation();
    const handleClick=(e)=>{e.preventDefault(); localStorage.removeItem('token'); history.push('/login')}
    return (
        <nav className={`navbar navbar-expand-lg navbar-${a.mode} bg-${a.mode}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">INoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/'?'active':''}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/TextArea'?'active':''}`} to="/TextArea">TextUtils</Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        {localStorage.getItem('token')?<button type="button" className="btn btn-sm btn-secondary mx-2" onClick={handleClick}>Log-out</button>:<>
                        <Link type="button" className="btn btn-sm btn-secondary" to="/login">Login</Link>
                        <Link type="button" className="btn btn-sm btn-secondary mx-2" to="/signin">Sign-up</Link>
                         </>}
                    


                        <div className="form-check form-switch" style={{color:a.mode === 'light'?'black':'white'}}>
                            <input className="form-check-input" type="checkbox" role="switch" onClick={a.update} id="flexSwitchCheckDefault" />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dark Mode</label>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
