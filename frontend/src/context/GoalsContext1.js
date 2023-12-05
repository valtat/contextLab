
import { createContext, useContext, useReducer } from "react";
import React from "react";

export const GoalsContext = createContext();


export const goalsReducer = (state, action) => {

  switch (action.type) {

    case "SET_GOALS":

      return {
        goals: action.payload,
      };
      
    case "ADD_GOAL":

      return {
        goals: [...state.goals, action.payload ]
      };
    /* case "REMOVE_GOAL":
      return goals.filter((goal) => goal.id !== action.payload); */
    default:
      return state;
  }
}

export const GoalsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(goalsReducer, { goals: null });

  return (
    <GoalsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GoalsContext.Provider>
  );
};