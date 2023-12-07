import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within a AuthContextProvider");
    }

    return context;

  }