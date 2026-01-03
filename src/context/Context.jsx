import { createContext, useEffect } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const onSent = async (prompt) => {
    const response = await runChat(prompt);
    console.log("Gemini Response:", response);
  };

  useEffect(() => {
    onSent("what is React JS");
  }, []);

  const contextValue = {
    onSent, // Optional: expose this to children
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
