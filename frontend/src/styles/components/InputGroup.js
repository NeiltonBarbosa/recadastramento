import styled, { css } from 'styled-components';

const templates = {
  2: css`
    grid-template-columns: repeat(2, 1fr);
  `,
  3: css`
    grid-template-columns: repeat(3, 1fr);
  `,
  default: css`
    grid-template-columns: 32.9% 66.2%;
  `,
};

const InputGroup = styled.div`
  /* display: flex;
  flex-direction: row;
  justify-content: space-between; */

  display: grid;
  ${props => templates[props.columns || 'default']}
  column-gap: 8px;
`;

export default InputGroup;
