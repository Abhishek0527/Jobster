import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(15, 23, 42, 0.48);
  backdrop-filter: blur(8px);

  .modal-shell {
    width: min(920px, 100%);
    max-height: min(90vh, 780px);
    overflow-y: auto;
    border-radius: 1.35rem;
    background: rgba(255, 255, 255, 0.96);
    border: 1px solid rgba(255, 255, 255, 0.9);
    box-shadow: 0 28px 70px rgba(15, 23, 42, 0.2);
    padding: 1.2rem;
  }

  .modal-topbar {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .modal-title h3 {
    margin: 0 0 0.25rem;
  }

  .modal-title p {
    margin: 0;
    color: var(--grey-500);
    font-size: 0.92rem;
  }

  .close-btn {
    width: 2.4rem;
    height: 2.4rem;
    border: none;
    border-radius: 999px;
    background: var(--grey-100);
    color: var(--grey-700);
    font-size: 1.35rem;
    line-height: 1;
    cursor: pointer;
    transition: var(--transition);
  }

  .close-btn:hover {
    background: var(--grey-200);
    color: var(--black);
  }

  @media (min-width: 768px) {
    padding: 1.5rem;

    .modal-shell {
      padding: 1.4rem 1.5rem 1.5rem;
    }
  }
`;

export default Wrapper;
