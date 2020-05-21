import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;

  height: 100%;
  width: 100%;

  top: 0;
  left: 0;

  background: #eee;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 64px;
`;

export const ErrorCode = styled.span`
  font-size: 120px;
  color: #3e3939;
`;

export const ErrorDescription = styled.p`
  text-align: center;
  font-size: 16px;
  color: #3e3939;

  margin-bottom: 16px;
`;
