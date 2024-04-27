/**
 * @module Header
 * @description header component that has navigation links
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return(
        <div className='header-container'>
            <div>
                <Link to='/'>Travelotl</Link>
            </div>
            <div>
                <Link to='/register'>Register</Link>
            </div>
            <div>
                <Link to='/login'>Login</Link>
            </div>
        </div>
    );
};

export default Header;
