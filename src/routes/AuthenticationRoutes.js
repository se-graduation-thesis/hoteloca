import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const ForgetPassword = Loadable(lazy(() => import('views/pages/authentication/authentication3/ForgetPassword')));
const BlockAccount = Loadable(lazy(() => import('views/BlockAccount')));
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: <AuthLogin3 />
        },
        {
            path: '/register',
            element: <AuthRegister3 />
        },
        {
            path: '/forget-password',
            element: <ForgetPassword />
        },
        {
            path: '/block-account',
            element: <BlockAccount />
        }
    ]
};

export default AuthenticationRoutes;
