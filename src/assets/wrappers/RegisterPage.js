import styled from 'styled-components';

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  padding: 2rem 0;

  .form {
    max-width: 460px;
    position: relative;
    overflow: hidden;
  }

  .form::before {
    content: '';
    position: absolute;
    inset: 0 0 auto 0;
    height: 6px;
    background: linear-gradient(90deg, var(--primary-500), var(--accent-500));
  }

  .logo {
    display: block;
    margin: 0 auto 1.5rem;
  }

  h3 {
    text-align: center;
    margin-bottom: 1.75rem;
  }

  p {
    margin: 0;
    margin-top: 1.2rem;
    text-align: center;
  }

  .btn {
    margin-top: 0.75rem;
  }

  .member-btn {
    background: transparent;
    border: none;
    color: var(--primary-600);
    cursor: pointer;
    font-weight: 800;
    margin-left: 0.35rem;
    padding: 0;
  }
`;

export default Wrapper;
