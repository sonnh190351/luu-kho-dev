
import useAuthStore from "../hooks/useAuth.store.ts";
import UtilsService from "../services/utils.ts";
import type {ReactNode} from "react";

const ProtectedRoute = ({ children, level = 0 } : { children: ReactNode[], level: number}) => {
    const { user, isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        window.location.href = "/login"
        return
    }

    if (!user) {
        window.location.href = "/login"
        return
    }

    if(UtilsService.getRoleLevel(user.roles) < level) {
        window.location.href = "/login"
        return
    }

    return children;
};

export default ProtectedRoute;
