import styled from 'styled-components';

const Wrapper = styled.section`
  display: grid;
  gap: 1.2rem;

  .chatbot-grid {
    display: grid;
    gap: 1rem;
  }

  .panel {
    background: rgba(255, 255, 255, 0.88);
    border: 1px solid rgba(255, 255, 255, 0.78);
    border-radius: 1.1rem;
    box-shadow: var(--shadow-2);
    padding: 1.25rem;
  }

  .panel h3,
  .panel h4 {
    margin-bottom: 0.85rem;
  }

  .panel-intro {
    margin: 0 0 1rem;
    color: var(--grey-600);
    max-width: 100%;
  }

  .form-grid {
    display: grid;
    gap: 0.85rem;
  }

  .file-note {
    display: block;
    margin-top: 0.35rem;
    color: var(--grey-500);
    font-size: 0.82rem;
  }

  .textarea-lg {
    min-height: 180px;
  }

  .action-row {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .results-grid {
    display: grid;
    gap: 0.85rem;
  }

  .score-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    background: linear-gradient(135deg, rgba(105, 65, 198, 0.08), rgba(15, 157, 132, 0.08));
    border-radius: 1rem;
    padding: 1rem;
  }

  .score-value {
    font-family: var(--headingFont);
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary-600);
    line-height: 1;
  }

  .result-card {
    background: var(--white);
    border: 1px solid var(--grey-100);
    border-radius: 1rem;
    padding: 1rem;
  }

  .result-card h5 {
    margin-bottom: 0.6rem;
  }

  .result-card ul {
    display: grid;
    gap: 0.45rem;
    margin: 0;
  }

  .result-card li {
    color: var(--grey-700);
    font-size: 0.92rem;
    line-height: 1.55;
  }

  .summary-box {
    background: rgba(247, 247, 251, 0.9);
    border-radius: 0.9rem;
    padding: 0.9rem;
    color: var(--grey-700);
    line-height: 1.6;
    white-space: pre-wrap;
  }

  .status-pill {
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    padding: 0.3rem 0.65rem;
    background: rgba(232, 228, 255, 0.95);
    color: var(--primary-700);
    font-size: 0.8rem;
    font-weight: 700;
  }

  @media (min-width: 992px) {
    .chatbot-grid {
      grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
      align-items: start;
    }

    .results-grid {
      grid-template-columns: 1fr 1fr;
    }

    .results-grid .wide {
      grid-column: 1 / -1;
    }
  }
`;

export default Wrapper;
