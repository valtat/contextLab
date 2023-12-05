import { add } from "date-fns";
import { createContext, useContext, useReducer } from "react";
import React from "react";
import useAddGoal from "../hooks/useAddGoal";

export const GoalsContext = createContext();

// export const GoalsDispatchContext = createContext();

export function GoalsReducer(state, action) {
  const { addGoal, isLoading, error } = useAddGoal("/api/goals");

  switch (action.type) {
    case "SET_GOALS":
      return {
        goals: action.payload,
      };
    case "ADD_GOAL":
      addGoal(action.payload);
      return [...state.goals, action.payload];
    /* case "REMOVE_GOAL":
      return goals.filter((goal) => goal.id !== action.payload); */
    default:
      return state;
  }
}

export const GoalsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GoalsReducer, { goals: null });

  return (
    <GoalsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GoalsContext.Provider>
  );
};

export function useGoals() {
  return useContext(GoalsContext);
}

/* export function useGoalsDispatch() {
  return useContext(GoalsDispatchContext);
} */

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
