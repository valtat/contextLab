// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGoalsContext } from "../hooks/useGoalsContext";




const GoalDetails = ({ goal }) => {

  const { user } = useAuthContext();
  const { dispatch } = useGoalsContext();

  const goalDelete = async () => {  

    if (!user) {
      return;
    }
    const data = await fetch('/api/goals/'+ goal._id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const response = await data.json();
    

    if (response.ok) {
      dispatch({ type: "REMOVE_GOAL", payload: goal._id });
    }

    // window.location.reload();
  };



  return (
    <div className="goal-details">
      <h4>{goal.title}</h4>
      <p>
        {formatDistanceToNow(new Date(goal.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={goalDelete}>delete</span>
    </div>
  );
};

export default GoalDetails;
