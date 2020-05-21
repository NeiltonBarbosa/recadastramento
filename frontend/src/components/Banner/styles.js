import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  background: #006699;
`;

export const Content = styled.div`
  height: 320px;
  margin: 0 auto;
  max-width: 1120px;

  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    width: 500px;

    margin-top: 32px;

    text-align: center;

    ${media.lessThan('medium')`
      width: 300px;
    `}

    span {
      color: #eee;
      font-size: 36px;
      font-weight: bold;

      ${media.lessThan('medium')`
        font-size: 24px;
      `}
    }
  }
`;
