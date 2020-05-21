import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  padding: 0 16px;
`;

export const Content = styled.div`
  height: 80px;
  margin: 0 auto;
  max-width: 1120px;

  display: flex;
  flex-direction: row;
  align-items: center;

  justify-content: space-between;
`;

export const SUPER = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-weight: bold;

    color: #3e3939;

    ${media.lessThan('medium')`
      font-size: 14px;
    `}
  }
`;

export const SEFIN = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-weight: bold;

    color: #3e3939;

    ${media.lessThan('medium')`
      font-size: 14px;
    `}
  }
`;

export const Logo = styled.img`
  ${media.lessThan('medium')`
    width: 32px;
  `}
`;
