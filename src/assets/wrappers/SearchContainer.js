import styled from 'styled-components'

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
    padding: 1.2rem 1.3rem;
  }
  .form-input,
  .form-select,
  .btn-block {
    min-height: 40px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 1rem;
    row-gap: 0.7rem;
  }
  h5 {
    font-weight: 700;
    margin-bottom: 0.9rem;
  }
  .btn-block {
    align-self: end;
    margin-top: 0.6rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`

export default Wrapper
