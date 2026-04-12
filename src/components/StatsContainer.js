import { FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa';
import { ImStatsBars } from 'react-icons/im';
import { useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from './StatItem';

const StatsContainer = () => {
  const { stats } = useSelector((store) => store.allJobs);

  const defaultStats = [
    {
      title: 'pending applications',
      count: stats.pending || 0,
      color: '#e9b949',
      bcg: '#fcefc7',
      icon: <FaSuitcaseRolling />,
    },
    {
      title: 'interviews scheduled',
      count: stats.interview || 0,
      color: '#647acb',
      bcg: '#e0e8f9',
      icon: <FaCalendarCheck />,
    },
    {
      title: 'jobs declined',
      count: stats.declined || 0,
      color: '#d66a6a',
      bcg: '#ffeeee',
      icon: <ImStatsBars />,
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item) => (
        <StatItem key={item.title} {...item} />
      ))}
    </Wrapper>
  );
};

export default StatsContainer;
