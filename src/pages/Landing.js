import React from 'react'
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';

const Landing = () => {

  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <span className='eyebrow'>Modern job tracking, built for focus</span>
          <h1>
            Track every opportunity with a cleaner workflow
          </h1>
          <p>
            Save the jobs you care about, explore live openings, and keep your application journey organized in one calm, modern dashboard.
          </p>
          <div className='hero-actions'>
            <Link to='/Register' className='btn btn-hero'>Get Started</Link>
            <Link to='/Register' className='btn btn-hero secondary-link'>Open Dashboard</Link>
          </div>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  )
}

export default Landing
