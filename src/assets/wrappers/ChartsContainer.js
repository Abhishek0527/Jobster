import styled from 'styled-components'

const Wrapper = styled.section`
  margin-top: 2rem;
  text-align: left;
  button {
    text-transform: capitalize;
    cursor: pointer;
  }
  h4 {
    margin-bottom: 0.65rem;
  }
  .tracked-list {
    display: grid;
    gap: 0.85rem;
  }
  .tracked-card {
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    padding: 1rem;
  }
  .tracked-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }
  .tracked-header h5,
  .tracked-header p {
    margin: 0;
  }
  .tracked-header p {
    color: var(--grey-500);
    font-size: 0.88rem;
  }
  .tracked-status {
    padding: 0.25rem 0.6rem;
    border-radius: 999px;
    background: var(--primary-100);
    color: var(--primary-700);
    font-weight: 700;
    text-transform: capitalize;
    font-size: 0.78rem;
  }
  .tracked-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 0.55rem;
    margin-bottom: 0.75rem;
  }
  .tracked-details p,
  .tracked-notes {
    margin: 0;
    font-size: 0.9rem;
  }
  .tracked-notes {
    color: var(--grey-700);
    margin-bottom: 0.75rem;
  }
  .tracked-actions {
    display: flex;
    gap: 0.55rem;
    flex-wrap: wrap;
  }
`

export default Wrapper
