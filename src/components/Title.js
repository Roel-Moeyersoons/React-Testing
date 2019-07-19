import React from 'react';
import {Link} from 'react-router-dom';

let Title = (props) => {
    return (
        <nav className="nav" style={{ paddingBottom: "1em", fontSize: "20px"}}>
            <Link to="/" className="nav-link">List</Link>
            <Link to="/about" className="nav-link">About</Link>
        </nav>
    );
}

export default Title;