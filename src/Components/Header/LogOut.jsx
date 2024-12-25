import styled from "styled-components";

const InputFields = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const P = styled.p`
  color: inherit;
`;

const Button = styled.button`
  background-color: #00796b;
  color: #ffffff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #004d40;
    transform: scale(1.05);
  }
  &:focus {
    outline: none;
    background-color: #00564d;
  }
`;

const LogOut = ({ userName, onLogOut }) => (
  <>
    <InputFields>
      <P>Welcome, {userName}</P>
    </InputFields>
    <Button onClick={onLogOut}>Log Out</Button>
  </>
);

export default LogOut;
