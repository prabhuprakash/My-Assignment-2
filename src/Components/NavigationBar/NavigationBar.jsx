import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: linear-gradient(90deg, #4caf50, #81c784); /* Green gradient */
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: ${(props) => (props.$isactive ? "#ffffff" : "transparent")};
  color: ${(props) => (props.$isactive ? "#4caf50" : "#ffffff")};
  border: none;
  cursor: pointer;
  &:hover {
    transform: scale(1.25);
  }
`;

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <Nav>
        <Button
          onClick={() => {
            navigate("/");
          }}
          $isactive={location.pathname === "/"}
        >
          Popular Movies
        </Button>
        <Button
          onClick={() => {
            navigate("/TicketBooking",{state:{movieid:""}});
          }}
          $isactive={location.pathname === "/TicketBooking"}
        >
          TicketBooking
        </Button>
      </Nav>
      <Outlet />
    </>
  );
};
export default NavigationBar;
