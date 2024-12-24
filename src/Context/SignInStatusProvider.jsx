import React, { useReducer } from "react";
export const SignInContext = React.createContext();

const SignInContextProvider = ({ children }) => {

  const initialState = {
    isLoggedIn: false,
    name: "",
    error: ""
  };
  
  const PASSWORD = "ashwith";

  function reducer(signInState, action) {
    switch (action.type) {
      case "LogIn":
        if(action.password === PASSWORD){
          return{ isLoggedIn: true, name: action.name, error:""};
        } 
        else{
          return { signInState, error:"Invalid password"};
        }
      case "LogOut":
        return {isLoggedIn: false, name: "", error: ""};  
      default:
        return signInState;
    }
  }
  const [signInState, dispatchSignIn] = useReducer(reducer, initialState);
  return (
    <SignInContext.Provider value={{ signInState, dispatchSignIn }}>
      {children}
    </SignInContext.Provider>
  );
};
export default SignInContextProvider;
