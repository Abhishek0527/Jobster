import styled from 'styled-components';

const Wrapper = styled.section`
  border-radius: 1.1rem;
  width: 100%;
  background: rgba(255, 255, 255, 0.84);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.75);
  padding: 1.4rem;
  box-shadow: var(--shadow-2);

  h3 {
    margin-top: 0;
    margin-bottom: 1.1rem;
  }

  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
    background: transparent;
    backdrop-filter: none;
    border: none;
  }

  .form-row {
    margin-bottom: 0;
  }

  .form-center {
    display: grid;
    row-gap: 0.8rem;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.7rem;
    margin-top: 0.3rem;
  }

  .clear-btn {
    background: linear-gradient(135deg, var(--grey-500), var(--grey-700));
  }

  .clear-btn:hover {
    background: linear-gradient(135deg, var(--grey-600), var(--grey-800));
  }

  @media (min-width: 768px) {
    .btn-container {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: start;
      column-gap: 1rem;
    }
  }

  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default Wrapper;
