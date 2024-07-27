import React from 'react'
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import  Logo  from '../components/Logo';
import { Link } from 'react-router-dom';

const Landing = () => {

  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Your all-in-one job application management companion designed to streamline your job search journey.Experience the future of job application management with JobTrackr today.
          </p>
          <Link to='/Register' className='btn btn-hero'>Login/Register</Link>

        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  )
}

export default Landing