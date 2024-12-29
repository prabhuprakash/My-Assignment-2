import { useContext } from "react";
import styled from "styled-components";
import { SignInContext } from "../../Context/GlobalProvider";
import LogIn from "./LogIn";
import LogOut from "./LogOut";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  background-color: #00509e;
  color: #ffffff;
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

const Header = () => {
  const { signInState, dispatchSignIn } = useContext(SignInContext);

  const handleLogIn = (userName) => {
    dispatchSignIn({ action: "LogIn", name: userName });
  };

  const handleLogOut = () => {
    dispatchSignIn({ action: "LogOut", name: "" });
  };

  return (
    <Container>
      <Left>My Theater</Left>
      <Right $loginstatus={signInState.action}>
        {signInState.action === "LogOut" ? (
          <LogOut userName={signInState.name} onLogOut={handleLogOut} />
        ) : (
          <LogIn onLogIn={handleLogIn} />
        )}
      </Right>
    </Container>
  );
};

export default Header;
