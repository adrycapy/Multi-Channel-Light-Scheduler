import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
  }

  ha-card {
    padding: 16px;
    background: linear-gradient(160deg, #0f172a 0%, #13243f 55%, #1d3557 100%);
    color: #e5eefc;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  }

  .title {
    font-size: 1.2rem;
    letter-spacing: 0.03rem;
    font-weight: 700;
  }

  .content {
    display: grid;
    gap: 12px;
  }

  .inspector {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 10px;
    padding: 12px;
    border-radius: 12px;
    background: rgba(15, 23, 42, 0.5);
    border: 1px solid rgba(203, 213, 225, 0.2);
  }

  .field {
    display: grid;
    gap: 6px;
  }

  label {
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 0.06rem;
    color: #dbeafe;
  }

  input[type="number"],
  input[type="time"],
  input[type="text"],
  select {
    width: 100%;
    border: 1px solid rgba(203, 213, 225, 0.35);
    border-radius: 8px;
    padding: 8px;
    background: rgba(15, 23, 42, 0.6);
    color: #f8fafc;
  }

  input[type="range"] {
    width: 100%;
  }

  .actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  button {
    border: 0;
    border-radius: 8px;
    padding: 8px 12px;
    font-weight: 600;
    cursor: pointer;
    color: #0b1320;
    background: #93c5fd;
  }

  button.danger {
    background: #fca5a5;
  }

  .helper {
    font-size: 0.8rem;
    color: #bfdbfe;
  }

  @media (max-width: 760px) {
    ha-card {
      padding: 12px;
    }

    .title {
      font-size: 1rem;
    }
  }
`;
