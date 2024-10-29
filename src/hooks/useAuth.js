import { useEffect } from "react";


export const useAuthCheck = () => {
    const { authData, login } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !authData.token) {
            login(token, null);
        }
    }, [authData, login]);
};