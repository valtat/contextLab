// components
import GoalDetails from "../components/GoalDetails";
import GoalForm from "../components/GoalForm";
import { useEffect } from "react";
import { useGoals} from "../hooks/useGoalsContext";

const Home = () => {

  const { goals, dispatch } = useGoals();
  
  
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
    getGoals();
  
  }, []);
  return (
    <>
      <div className="home">
        <div className="goals">
          {goals &&
            goals.map((goal) => <GoalDetails key={goal._id} goal={goal} />)}
        </div>
        <GoalForm />
      </div>
    </>
  );
};

export default Home;
