import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import media from 'styled-media-query';

export const Container = styled.div`
  padding: 0 16px;
  margin-bottom: 64px;
`;

export const Content = styled.div`
  margin: 0 auto;
  max-width: 1120px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Steps = styled.div`
  margin-top: -150px;

  width: 100%;

  background: #fff;

  border-radius: 4px;

  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);

  display: flex;
  flex-direction: column;

  ${media.greaterThan('1124px')`
    flex-direction: row;
  `}

  a {
    text-align: left;
  }
`;

export const StepNav = styled.div`
  background: #eee;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 16px;
  justify-items: center;
  padding: 24px;

  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  ${media.greaterThan('1124px')`
    display: flex;
    flex-direction: column;
    border-top-right-radius: none;
    border-bottom-left-radius: 4px;
  `}
`;

export const StepButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  cursor: pointer;

  ${media.greaterThan('1124px')`
    & ~ div {
      margin-top: 32px;
    }
  `}

  ${props =>
    props.valid &&
    css`
      span:first-child {
        background: #4e9525;
      }
    `}
`;

export const Icon = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  height: 40px;
  width: 40px;

  background: #006699;
  border-radius: 50%;
`;

export const Title = styled.span`
  margin-left: 16px;
  color: #3e3939;
`;

export const Step = styled.div`
  flex: 1;
  padding: 32px;
  display: ${props => (props.visible ? 'flex' : 'none')};
  flex-direction: column;

  > span {
    color: #3e3939;
    font-size: 24px;
    font-weight: bold;

    padding-bottom: 8px;

    border-bottom: 1px solid #eee;
  }

  form {
    margin-top: 24px;
  }
`;

export const Details = styled.div`
  margin-top: 16px;
`;

export const Detail = styled.section`
  span {
    font-size: 12px;
    font-weight: bold;
    color: #3e3939;
  }

  p {
    font-size: 12px;
    color: #3e3939;
    text-transform: uppercase;
  }

  & + section {
    border-top: 1px solid #eee;
    padding-top: 8px;
  }
`;

export const RestrictArea = styled.div`
  width: 100%;
  margin-top: 8px;
  text-align: right;

  a {
    font-size: 14px;

    color: #006699;

    &:hover {
      color: ${lighten(0.08, '#006699')};
    }
  }
`;
