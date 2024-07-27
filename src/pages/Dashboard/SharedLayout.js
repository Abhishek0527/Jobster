import React from 'react'
import Wrapper from '../../assets/wrappers/SharedLayout'
import BigSidebar from '../../components/BigSidebar'
import SmallSidebar from '../../components/SmallSidebar'
import Navbar from '../../components/Navbar'
import { Outlet } from 'react-router-dom';

const SharedLayout = () => {
    return (
        <Wrapper>
            <main className='dashboard'>
                <BigSidebar />
                <SmallSidebar />
                <div>
                    <Navbar />
                    <div className='dashboard-page'>
                        <Outlet />
                    </div>
                </div>

            </main>
        </Wrapper>
    )
}

export default SharedLayout