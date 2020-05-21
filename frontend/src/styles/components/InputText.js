import styled from 'styled-components';

const InputText = styled.input`
  height: 40px;
  width: 100%;

  background: #eee;

  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  padding: 0 8px;

  font-size: 14px;

  color: #3e3939;

  &:focus {
    border: 1px solid #006699;
    box-shadow: 0px 0px 5px 1px rgba(0, 102, 153, 0.3);
  }
`;

export default InputText;
