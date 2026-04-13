import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Navbar';
import { logoutuser } from '../features/user/userSlice';

const navItems = [
  { label: 'Stats', path: '/' },
  { label: 'All Jobs', path: '/all-jobs' },
  { label: 'Add Job', path: '/add-job' },
  { label: 'Profile', path: '/profile' },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  return (
    <Wrapper>
      <div className='nav-center'>
        <div className='brand-section'>
          <h3>Jobster</h3>
          <p>Simple job tracker</p>
        </div>
        <div className='nav-links'>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className='user-actions'>
          <span className='welcome-text'>Hi, {user?.name || 'User'}</span>
          <button type='button' className='btn logout-btn' onClick={() => dispatch(logoutuser())}>
            Logout
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
