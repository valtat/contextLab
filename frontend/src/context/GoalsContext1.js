import { createContext, useContext, useReducer } from "react";
import React from "react";

export const GoalsContext = createContext();

export const GoalsDispatchContext = createContext();

export function GoalsProvider({ children }) {
  const [goals, dispatch] = useReducer(GoalsReducer, { goals: null });

  return (
    <GoalsContext.Provider value={{ ...goals }}>
      <GoalsDispatchContext.Provider value={dispatch}>
        {children}
      </GoalsDispatchContext.Provider>
    </GoalsContext.Provider>
  );
}

export function useGoals() {
  return useContext(GoalsContext);
}

export function useGoalsDispatch() {
  return useContext(GoalsDispatchContext);
}

function GoalsReducer(goals, action) {
  switch (action.type) {
    case "SET_GOALS":
      return {
        goals: action.payload,
      };
    case "ADD_GOAL":
      return [...goals, action.payload];
    case "REMOVE_GOAL":
      return goals.filter((goal) => goal.id !== action.payload);
    default:
      return goals;
  }
}

/* async function initialGoals() {
  try {
    const response = await fetch("/api/goals", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await response.json();
    if (!response.ok) {
      console.log(data.error);
      initialGoals = [];
      return;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
} */

export default GoalsContext;
