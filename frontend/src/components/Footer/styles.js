import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  border-top: 1px solid #e4e4e4;

  padding: 24px 0;
`;

export const Content = styled.div`
  margin: 0 auto;
  max-width: 1120px;

  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    color: #333;

    font-size: 16px;

    margin-bottom: 8px;
  }

  img {
    width: 80px;
  }
`;
