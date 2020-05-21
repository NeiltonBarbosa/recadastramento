import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  column-gap: 24px;
`;

export const New = styled.section`
  form {
    margin-top: 16px;
  }
`;

export const Message = styled.div`
  padding: 8px;
  margin-bottom: 16px;

  font-size: 14px;

  color: #fff;
  border-radius: 4px;

  background: #f7b71d;

  transition: opacity 2s linear;

  display: ${props => (props.show ? 'block' : 'none')};

  -webkit-animation: slide-down 0.3s ease-out;
  -moz-animation: slide-down 0.3s ease-out;
`;

export const List = styled.section`
  form {
    margin-top: 16px;
  }

  > ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 8px;
  }
`;

export const EmployeesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 8px;
`;

export const Employee = styled.li`
  display: flex;
  flex-direction: column;

  border: 1px solid #eee;
  border-radius: 4px;

  padding: 8px;

  margin-bottom: 8px;

  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
  }
`;

export const Name = styled.p`
  font-size: 14px;
  color: #3e3939;
  text-transform: uppercase;

  margin-bottom: 8px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Cpf = styled.span`
  font-size: 14px;

  margin-right: 8px;

  color: #3e3939;
`;

export const Ug = styled.span`
  font-size: 12px;

  padding: 2px 16px;
  margin-right: 8px;

  border-radius: 4px;

  background: #006999;
  color: #fff;
`;

export const Status = styled.span`
  font-size: 12px;

  padding: 2px 16px;
  margin-right: 8px;

  border-radius: 4px;

  background: #21bf73;
  color: #fff;
`;

export const Trash = styled.button`
  display: flex;
  align-items: center;

  background: none;
  border: none;
  border-radius: 50%;

  padding: 8px;

  &:hover {
    background: #eee;
  }
`;

export const EmployeeDetails = styled.section`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 1}, 1fr);
  column-gap: 8px;

  padding-bottom: 16px;

  + section {
    padding-top: 16px;
    border-top: 1px solid #eee;
  }

  div {
    display: flex;
    flex-direction: column;

    label {
      font-size: 12px;
      color: #3e3939;
      font-weight: bold;
      margin-bottom: 8px;
    }

    span {
      font-size: 14px;
      color: #3e3939;
    }
  }
`;
