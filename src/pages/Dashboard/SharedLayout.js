import Wrapper from '../../assets/wrappers/SharedLayout';
import Navbar from '../../components/Navbar';
import { Outlet } from 'react-router-dom';

const SharedLayout = () => {
  return (
    <Wrapper>
      <Navbar />
      <main className='dashboard-page'>
        <Outlet />
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
