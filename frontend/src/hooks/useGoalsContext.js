import { GoalsContext } from "../context/GoalsContext1";
import { useContext } from "react";


export function useGoalsContext() {
    const context = useContext(GoalsContext);

    if (!context) {
        throw new Error("useGoals must be used within a GoalsContextProvider");
    }

    return context;

  }