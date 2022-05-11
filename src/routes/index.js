import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import HomeRoute from './HomeRoute'
import config from 'config';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    if (!localStorage.getItem("user_authenticated") || localStorage.getItem("user_authenticated") === "undefined") {
        return useRoutes([HomeRoute, AuthenticationRoutes], config.basename);
    } else {
        let acc = JSON.parse(localStorage.getItem("user_authenticated"))
        if (acc.role === 1) {
            return useRoutes([HomeRoute], config.basename);
        } else {
            return useRoutes([MainRoutes], config.basename);
        }
    }
}
