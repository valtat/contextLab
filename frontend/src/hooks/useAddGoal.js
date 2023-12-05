import { useState } from "react";
import { useGoals} from "./useGoalsContext";




export default function useAddGoal(url) {

  const { goals, dispatch } = useGoals();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);



  const addGoal = async (object) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(object),
    });
    const goal = await response.json();

    if (!response.ok) {
      setError(goal.error);
      setIsLoading(false);
      return error;
    }
    setIsLoading(false);
    dispatch({ type: "ADD_GOAL", payload: goal });
  };

  return { addGoal, isLoading, error };
}
