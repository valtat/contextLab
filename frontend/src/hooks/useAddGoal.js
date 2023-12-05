import { useState } from "react";
export default function useAddGoal(url){
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const addGoal = async (object) => {
        setIsLoading(true);
        setError(null);
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json","Authorization":`Bearer ${localStorage.getItem("token")}`},
          body: JSON.stringify(object),
        });
        const goal = await response.json();
    
        if (!response.ok) {
          setError(goal.error);
          setIsLoading(false);
          return error;
        }
        setIsLoading(false);
      };

      return { addGoal, isLoading, error };
}