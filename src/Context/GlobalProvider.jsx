import React, { useReducer, useState } from "react";
export const SignInContext = React.createContext();
export const MovieSeatsContext = React.createContext();
const SignInContextProvider = ({ children }) => {
  function reducer(signInState, action) {
    switch (action.action) {
      case "LogIn":
        return { action: "LogOut", name: action.name };
      case "LogOut":
        return { action: "LogIn", name: "" };
      default:
        return signInState;
    }
  }
  const [signInState, dispatchSignIn] = useReducer(reducer, {
    action: "LogIn",
    name: ""
  });
  return (
    <SignInContext.Provider value={{ signInState, dispatchSignIn }}>
      {children}
    </SignInContext.Provider>
  );
};
export const MovieSeatsContextProvider = ({ children }) => {
  const [movieSeats, setMovieSeats] = useState(new Map());
  return (
    <MovieSeatsContext.Provider value={{ movieSeats, setMovieSeats }}>
      {children}
    </MovieSeatsContext.Provider>
  );
};
export default SignInContextProvider;
