import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Logo from './Logo';
import { toggleSidebar , logoutuser } from '../features/user/userSlice';

const Navbar = () => {
    const user = useSelector((store) => store.user)
    const dispatch = useDispatch()
    const toggle = () => dispatch(toggleSidebar())
    const [showlogout,setShowlogout] = useState(false)
    return (
        <Wrapper>
            <div className='nav-center'>
                <button type='button' className='toggle-btn' onClick={toggle}>
                    <FaAlignLeft />
                </button>
                <div>
                    <Logo />
                    <h3 className='logo-text'>Dashboard</h3>
                </div>
                <div className='btn-container'>
                    <button type='button' className='btn' onClick={ () => setShowlogout(!showlogout)}>
                        <FaUserCircle />
                        {user?.user?.name}
                        <FaCaretDown />
                    </button>
                    <div className= {showlogout ? 'dropdown show-dropdown' : 'dropdown' }>
                        <button type='button' className='dropdown-btn' onClick={ () => dispatch(logoutuser())}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Navbar