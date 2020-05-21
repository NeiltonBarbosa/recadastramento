import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 400px;

  padding: 32px;

  background: #fff;
  box-shadow: 0 20px 75px rgba(0, 0, 0, 0.13);
  border-radius: 4px;
`;

export const Title = styled.h1`
  color: #3e3939;

  margin-bottom: 16px;
`;

export const Message = styled.p`
  color: #3e3939;

  margin-bottom: 16px;
`;

export const Actions = styled.div`
  button:first-child {
    background: #006699;

    &:hover {
      background: ${darken(0.03, '#006699')};
    }
  }

  button:last-child {
    background: #ca3e47;

    &:hover {
      background: ${darken(0.03, '#ca3e47')};
    }
  }

  button {
    border: none;

    color: #fff;
    border-radius: 4px;

    padding: 4px 8px;

    & + button {
      margin-left: 8px;
    }
  }
`;
