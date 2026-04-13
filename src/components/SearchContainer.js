import Wrapper from '../assets/wrappers/SearchContainer';
import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';

const SearchContainer = ({ search, provider, onSearchChange, onProviderChange, onClear }) => {
  return (
    <Wrapper>
      <form className='form' onSubmit={(e) => e.preventDefault()}>
        <h5>search jobs</h5>
        <div className='form-center'>
          <FormRow
            type='text'
            name='search'
            labelText='search by title, company or place'
            value={search}
            handleChange={onSearchChange}
          />
          <FormRowSelect
            name='provider'
            labelText='job source'
            value={provider}
            handleChange={onProviderChange}
            list={['all', 'adzuna', 'remotive', 'local']}
          />
          <button type='button' className='btn btn-block' onClick={onClear}>
            clear search
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
