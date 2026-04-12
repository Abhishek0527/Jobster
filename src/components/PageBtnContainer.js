import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { changePage } from '../features/allJobs/alljobsSlice';

const PageBtnContainer = () => {
  const { numOfPages, page } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  if (numOfPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);
  const maxButtons = 5;
  const start = Math.max(0, Math.min(page - 3, numOfPages - maxButtons));
  const visiblePages = pages.slice(start, start + maxButtons);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > numOfPages || newPage === page) {
      return;
    }
    dispatch(changePage(newPage));
  };

  return (
    <Wrapper>
      <button type='button' className='prev-btn' onClick={() => handlePageChange(page - 1)}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
        {visiblePages.map((pageNumber) => (
          <button
            type='button'
            key={pageNumber}
            className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button type='button' className='next-btn' onClick={() => handlePageChange(page + 1)}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
