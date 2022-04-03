import { lazy } from 'react';
// project imports
import Loadable from 'ui-component/Loadable';
import DashboardDefault from 'views/user-view/layout/MainLayout';
// import NavbarMainLayout from 'views/user-view/layout';

// login option 3 routing

const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

const HomePage = Loadable(lazy(() => import('views/user-view/layout/home-page/HomePage')));
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const HomeRoute = {
    path: '/home',
    element: <DashboardDefault />,
    children: [
        {
            path: '/',
            element: <HomePage />
        },
        {
            path: '/pages/register/register3',
            element: <AuthRegister3 />
        }
    ]
};

export default HomeRoute;
