import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import NavbarMainLayout from 'views/user-view/layout/MainLayout';

// login option 3 routing

const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const HomeRoute = {
    path: '/home',
    element: <NavbarMainLayout />,
    children: [
        {
            path: '/home-page',
            element: <AuthLogin3 />
        },
        {
            path: '/pages/register/register3',
            element: <AuthRegister3 />
        }
    ]
};

export default HomeRoute;
