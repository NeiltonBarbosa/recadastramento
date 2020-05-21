import styled from 'styled-components';

export const Container = styled.div`
  background: #006699;

  display: flex;
  flex-direction: column;

  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;

  width: 240px;
  height: 100%;
`;

export const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  padding: 24px 8px;

  span {
    color: #fff;

    + span {
      margin-top: 16px;
      font-size: 10px;
    }
  }
`;

export const Menu = styled.ul`
  display: flex;
  flex-direction: column;

  li {
    a,
    button {
      color: #ffff;

      font-size: 14px;

      padding: 16px;

      display: flex;

      &:hover:not(.active) {
        color: #ccc;
      }
    }

    button {
      background: none;
      border: none;
    }
  }
`;

export const Logo = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  img {
    width: 64px;
    height: 64px;

    margin-bottom: 64px;
  }
`;

export const Separator = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);

  margin: 16px 0;
`;
