import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 999;
`;

export const Content = styled.div`
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  width: ${props => (props.size === 'big' ? 600 : 400)}px;
`;

export const Body = styled.div`
  padding: 16px;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 8px;

  border-radius: 5px;

  background: #eee;

  span {
    font-size: 14px;
    color: #3e3939;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    padding: 8px;

    border-radius: 50%;

    &:hover {
      background: #fff;
    }
  }
`;
