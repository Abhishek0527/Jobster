import styled from 'styled-components';

const Wrapper = styled.main`
  position: relative;
  overflow: hidden;
  padding-bottom: 2rem;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    filter: blur(40px);
    opacity: 0.6;
    z-index: 0;
  }

  &::before {
    width: 320px;
    height: 320px;
    top: -90px;
    right: -70px;
    background: rgba(141, 108, 247, 0.22);
  }

  &::after {
    width: 280px;
    height: 280px;
    left: -80px;
    bottom: 20px;
    background: rgba(15, 157, 132, 0.16);
  }

  nav,
  .page {
    position: relative;
    z-index: 1;
  }

  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    min-height: var(--nav-height);
    display: flex;
    align-items: center;
  }

  .logo {
    width: 128px;
  }

  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    gap: 2.5rem;
    padding: 2rem 0 3rem;
  }

  .info {
    max-width: 620px;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    padding: 0.45rem 0.9rem;
    border-radius: 999px;
    background: rgba(232, 228, 255, 0.92);
    color: var(--primary-700);
    font-weight: 700;
    margin-bottom: 1.35rem;
  }

  h1 {
    font-weight: 700;
    margin-bottom: 1.25rem;

    span {
      background: linear-gradient(135deg, var(--primary-500), var(--accent-500));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  p {
    font-size: 1.05rem;
    color: var(--grey-600);
    margin-bottom: 1.75rem;
  }

  .hero-actions {
    display: flex;
    gap: 0.9rem;
    flex-wrap: wrap;
  }

  .secondary-link {
    color: var(--primary-700);
    background: rgba(255, 255, 255, 0.82);
    border: 1px solid rgba(181, 186, 206, 0.45);
  }

  .main-img {
    display: none;
    max-width: 540px;
    justify-self: end;
    filter: drop-shadow(0 34px 70px rgba(61, 48, 114, 0.18));
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
      column-gap: 4rem;
    }

    .main-img {
      display: block;
    }
  }
`;

export default Wrapper;
