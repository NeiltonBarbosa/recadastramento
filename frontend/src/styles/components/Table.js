import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;

  width: 100%;

  font-size: 14px;

  color: #3e3939;

  thead {
    font-weight: bold;
    border-bottom: 1px solid #eee;

    tr > td {
      padding: 8px 0;
    }
  }

  tbody {
    tr {
      &:hover {
        color: #006699;
        cursor: pointer;
      }
    }

    tr > td {
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }
  }
`;

const Actions = styled.td`
  text-align: right;

  button {
    border: none;
    background: none;

    &:hover {
      opacity: 0.8;
    }

    + button {
      margin-left: 8px;
    }
  }
`;

export { Table, Actions };
