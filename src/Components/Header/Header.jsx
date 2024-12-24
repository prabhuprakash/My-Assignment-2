import { useContext, useState } from "react";
import styled from "styled-components";
import { SignInContext } from "../../Context/SignInStatusProvider";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: space-between;
  align-items: center;
  background-color: #00509e;
  color: #ffffff;
`;
const InputFields = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;
const Left = styled.h1`
  color: #ffffff;
  font-size: 2rem;
  font-weight: bold;
`;
const Right = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.$loginstatus === "LogIn" ? "column" : "row"};
  justify-content: ${(props) =>
    props.$loginstatus === "LogIn" ? "center" : "flex-start"};
  align-items: center;
  gap: 10px;
`;
const P = styled.p``;
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

const Header = () => {
  const [validinput, setValidInput] = useState(true);
  const [user, setUser] = useState("");
  const { signInState, dispatchSignIn } = useContext(SignInContext);
  const logOut = () => {
    return (
      <>
        <InputFields>
          <P>Welcome, {signInState.name}</P>
        </InputFields>
        <Button
          onClick={() => {
            dispatchSignIn({ action: "LogOut", name: "" });
            setUser("");
          }}
        >
          Log Out
        </Button>
      </>
    );
  };
  const logIn = () => {
    return (
      <>
        <InputFields>
          <label htmlFor="userName">User Name : </label>
          <Input
            type="text"
            placeholder="User Name"
            onChange={(e) => {
              setUser(e.target.value);
              setValidInput(true);
            }}
            $bgstatus={validinput}
            id="userName"
          />
          <label htmlFor="password">Password : </label>
          <Input
            type="password"
            placeholder="Password"
            $bgstatus={validinput}
            id="password"
          />
        </InputFields>
        <Button
          onClick={() => {
            if (user !== "") dispatchSignIn({ action: "LogIn", name: user });
            else setValidInput(false);
          }}
        >
          Register/Sign In
        </Button>
      </>
    );
  };
  const renderRight = () => {
    return signInState.action === "LogIn" ? logIn() : logOut();
  };
  return (
    <Container>
      <Left>My Theater</Left>
      <Right $loginstatus={signInState.action}>{renderRight()}</Right>
    </Container>
  );
};
export default Header;
