import { useState } from "react";
import styled from "styled-components";

const InputFields = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const Input = styled.input`
  background-color: ${(props) => (props.$bgstatus ? "#e0f7fa" : "#f94848")};
  border: 1px solid #00796b;
  padding: 5px;
  border-radius: 4px;
  color: #004d40;
  &:focus {
    outline: none;
    border-color: #004d40;
    background-color: #ffffff;
  }
`;

const P = styled.p`
  color: ${(props) => (props.error ? "red" : "inherit")};
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

const LogIn = ({ onLogIn }) => {
  const [validInput, setValidInput] = useState(true);
  const [user, setUser] = useState("");

  const handleLogIn = () => {
    if (user !== "") {
      onLogIn(user);
      setValidInput(true);
    } else {
      setValidInput(false);
    }
  };

  return (
    <>
      <InputFields>
        <label htmlFor="userName">User Name:</label>
        <Input
          type="text"
          placeholder="User Name"
          onChange={(e) => {
            setUser(e.target.value);
            setValidInput(true);
          }}
          $bgstatus={validInput}
          id="userName"
        />
        <label htmlFor="password">Password:</label>
        <Input
          type="password"
          placeholder="Password"
          $bgstatus={validInput}
          id="password"
        />
      </InputFields>
      {!validInput && <P error>User Name is required!</P>}
      <Button onClick={handleLogIn}>Register/Sign In</Button>
    </>
  );
};

export default LogIn;
