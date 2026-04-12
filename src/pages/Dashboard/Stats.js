import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChartsContainer, Loading, StatsContainer } from '../../components';
import { showStats } from '../../features/allJobs/alljobsSlice';

const Stats = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.allJobs);

  useEffect(() => {
    dispatch(showStats());
  }, [dispatch]);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      <ChartsContainer />
    </>
  );
};

export default Stats;
