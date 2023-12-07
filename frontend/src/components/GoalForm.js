import useField from "../hooks/useField";
import { useState} from "react";
import ClipLoader from "react-spinners/ClipLoader";
import useAddGoal from "../hooks/useAddGoal";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGoalsContext } from "../hooks/useGoalsContext";

const GoalForm = () => {

  const { inputProps, clear } = useField("text");
  const [popupOpen, setPopup] = useState(false);
  const { addGoal, isLoading, error } = useAddGoal("/api/goals");
  const { user } = useAuthContext();
  const { dispatch } = useGoalsContext();


  const handleFormSubmit = async (e) => {   
    e.preventDefault();

    if (!user) {
      alert("Please log in to add goals");
      return;
    }
    const response = await addGoal({ title: inputProps.value, createdAt: new Date()});
    
    // console.log(response);

    dispatch({ type: "ADD_GOAL", payload: response });

    clear();

   
    
  };


  

  return (
    <>
      <form onSubmit={handleFormSubmit} className="create">
        <h3>Add a New Goal</h3>

        <label>Text:</label>
        <input {...inputProps} className="" />
        <button>Add Goal</button>
      </form>
      {popupOpen && (
        <>
          <div className="overlay"></div>
          <div className="popup">
            <button
              className={"back-btn"}
              onClick={() => {
                setPopup(!popupOpen);
              }}
            >
              <i className="fa-solid fa-arrow-left"></i> Back
            </button>
            <ClipLoader
              color={"#36d7b7"}
              loading={isLoading}
              size={70}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            {!isLoading && error && (
              <>
                <h2>Something went wrong!</h2>
                <p>{error}</p>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default GoalForm;
