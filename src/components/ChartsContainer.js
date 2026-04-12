import { useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/ChartsContainer';

const ChartsContainer = () => {
  const { monthlyApplications } = useSelector((store) => store.allJobs);

  if (!monthlyApplications.length) {
    return (
      <Wrapper>
        <h4>monthly applications</h4>
        <p>No chart data available yet.</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h4>monthly applications</h4>
      <div>
        {monthlyApplications.map((item) => (
          <div key={item.date}>
            <strong>{item.date}</strong>: {item.count}
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default ChartsContainer;
