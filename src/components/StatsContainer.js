import { FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa';
import { ImStatsBars } from 'react-icons/im';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from './StatItem';

const StatsContainer = ({ trackedJobs }) => {
  const statusCounts = trackedJobs.reduce(
    (acc, job) => {
      acc.total += 1;
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    },
    { total: 0, interested: 0, applied: 0, interview: 0, offer: 0, rejected: 0 }
  );

  const defaultStats = [
    {
      title: 'total tracked jobs',
      count: statusCounts.total,
      color: '#3b82f6',
      bcg: '#dbeafe',
      icon: <FaSuitcaseRolling />,
    },
    {
      title: 'applied jobs',
      count: statusCounts.applied,
      color: '#647acb',
      bcg: '#e0e8f9',
      icon: <FaCalendarCheck />,
    },
    {
      title: 'interviews',
      count: statusCounts.interview,
      color: '#e9b949',
      bcg: '#fcefc7',
      icon: <ImStatsBars />,
    },
    {
      title: 'offers',
      count: statusCounts.offer,
      color: '#0f5132',
      bcg: '#d1e7dd',
      icon: <FaCalendarCheck />,
    },
    {
      title: 'rejected',
      count: statusCounts.rejected,
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
