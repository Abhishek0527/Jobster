import styled from 'styled-components';

const Wrapper = styled.nav`
  position: sticky;
  top: 0;
  z-index: 20;
  padding: 0.8rem 0;
  background: rgba(246, 244, 255, 0.72);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(181, 186, 206, 0.28);

  .nav-center {
    width: min(1180px, 92vw);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .brand-section h3,
  .brand-section p {
    margin: 0;
  }

  .brand-section p {
    color: var(--grey-500);
    font-size: 0.85rem;
  }

  .nav-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .nav-link {
    padding: 0.52rem 0.82rem;
    border-radius: 999px;
    color: var(--grey-700);
    background: rgba(255, 255, 255, 0.76);
    border: 1px solid rgba(181, 186, 206, 0.3);
    transition: var(--transition);
    font-weight: 700;
    font-size: 0.88rem;
  }

  .nav-link:hover,
  .nav-link.active {
    background: linear-gradient(135deg, var(--primary-500), #8d6cf7);
    color: var(--white);
    box-shadow: var(--shadow-1);
    transform: translateY(-1px);
  }

  .user-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .welcome-text {
    color: var(--grey-600);
    font-weight: 700;
    font-size: 0.9rem;
  }

  .logout-btn {
    min-width: 96px;
  }

  @media (min-width: 992px) {
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 1.5rem;
    }

    .user-actions {
      justify-content: flex-end;
    }
  }
`;

export default Wrapper;
