// components
//import { set } from "mongoose";
import GoalDetails from "../components/GoalDetails";
import GoalForm from "../components/GoalForm";
import { useEffect } from "react";
import { useGoals } from "../context/GoalsContext1";

const Home = () => {
  // const [goalsArray, setGoalsArray] = useState([]);
  const { goals, dispatch } = useGoals();
  // const { dispatch } = useGoalsDispatch();
  const getGoals = async () => {
    //const response = await fetch("localhost:5000/api/goals");
    const response = await fetch("/api/goals", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await response.json();
    if (!response.ok) {
      console.log(data.error);
      // dispatch({ type: "SET_GOALS", payload: [] });
      return;
    }
    dispatch({ type: "SET_GOALS", payload: data });
  };
  useEffect(() => {
    getGoals();
    // const interval = setInterval(getGoals, 1000);
    // return () => ); clearInterval(interval
  }, [getGoals]);
  return (
    <>
      <div className="home">
        <div className="goals">
          {/* {goals.length === 0 && <h2>No Goals Found</h2>} */}

          {goals &&
            goals.map((goal) => <GoalDetails key={goal._id} goal={goal} />)}
        </div>
        <GoalForm />
      </div>
    </>
  );
};

export default Home;
