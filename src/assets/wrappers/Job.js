import styled from 'styled-components';

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-2);
  min-height: 100%;

  header {
    padding: 0.85rem 1rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }
  .main-icon {
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.15rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 1rem;
  }
  .info {
    h5 {
      margin-bottom: 0.15rem;
      font-size: 1rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
      font-size: 0.88rem;
    }
  }
  .pending {
    background: #fcefc7;
    color: #e9b949;
  }
  .interview {
    background: #e0e8f9;
    color: #647acb;
  }
  .declined {
    color: #d66a6a;
    background: #ffeeee;
  }
  .content {
    padding: 0.9rem 1rem 1rem;
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.85rem;
  }
  .job-description {
    margin: 0;
    max-width: 100%;
    min-height: 4.3rem;
    color: var(--grey-700);
    line-height: 1.5;
    overflow: hidden;
    font-size: 0.9rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.35rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
    margin-top: 0.5rem;
  }
  footer {
    margin-top: auto;
  }
  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 34px;
    min-width: 96px;
    font-size: 0.84rem;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }
  &:hover .actions {
    visibility: visible;
  }
`;

export default Wrapper;
