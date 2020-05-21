import styled, { css } from 'styled-components';
import { darken } from 'polished';

const sizes = {
  default: css`
    height: 40px;
    width: 100%;
  `,
  small: css`
    height: 32px;
    width: 116px;
  `,
};

const backgroundHover = color => {
  return css`
    background: ${darken(0.03, color || '#006699')};
  `;
};

const Button = styled.button`
  ${props => sizes[props.size || 'default']}

  border: none;
  border-radius: 4px;

  background: ${props => props.color || '#006699'};
  color: #fff;

  font-weight: bold;
  font-size: 14px;

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }

  &:hover,
  &:focus {
    ${props => backgroundHover(props.color)}
  }

  div {
    display: flex;
    justify-content: center;
  }
`;

export default Button;
