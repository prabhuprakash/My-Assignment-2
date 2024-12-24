import React, { useReducer } from "react";
export const SignInContext = React.createContext();
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
export default SignInContextProvider;
