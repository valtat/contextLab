// components
import GoalDetails from "../components/GoalDetails";
import GoalForm from "../components/GoalForm";
import { useEffect } from "react";
import { useGoalsContext} from "../hooks/useGoalsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {

  const { goals, dispatch } = useGoalsContext();
  const { user} = useAuthContext();
  
  
  useEffect(() => {

    const getGoals = async () => {

      //const response = await fetch("localhost:5000/api/goals");

      const response = await fetch("/api/goals", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_GOALS", payload: data });  
      }
    };
    
      if (user) {
        getGoals();
      }
      
    }, [dispatch, user, goals]);


  return (
    <>
      <div className="home">
        <div className="goals">
          {goals &&
            goals.map((goal) => <GoalDetails key={goal._id} goal={goal} />)}
        </div>
        <GoalForm key="Form"/>
      </div>
    </>
  );
};

export default Home;
