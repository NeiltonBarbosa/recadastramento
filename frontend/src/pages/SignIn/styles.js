import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  width: 324px;

  background: #fff;

  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 64px;
    height: 64px;

    margin-top: 24px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 24px;

  a {
    margin-top: 8px;

    font-size: 14px;
    text-align: center;

    color: #006699;

    &:hover {
      color: ${lighten(0.08, '#006699')};
    }
  }
`;

export const System = styled.div`
  margin-top: 8px;

  display: flex;
  flex-direction: column;

  align-items: center;

  color: #3e3939;

  span {
    font-size: 14px;

    + span {
      margin-top: 4px;
    }
  }
`;
