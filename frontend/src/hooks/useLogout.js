import { useAuthContext } from './useAuthContext';
import { useNavigate } from "react-router-dom";
import { useGoalsContext } from './useGoalsContext';



export const useLogout = () => {
    const navigate = useNavigate();

    const { dispatch } = useAuthContext();
    const { dispatch: goalsDispatch } = useGoalsContext();

    const logout = () => {
        // remove user from local storage
        localStorage.removeItem('user');

        //dispath logout action
        dispatch({ type: 'LOGOUT' });
        goalsDispatch({ type: 'SET_GOALS', payload: null });

        navigate("/login")
          

    }
    return { logout };
}
