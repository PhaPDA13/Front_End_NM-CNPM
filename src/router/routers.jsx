import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import SignIn from "../features/Auth/SignIn/SignIn";
import SignUp from "../features/Auth/SignUp/SignUp";
import DashBoard from "../features/DashBoard/DashBoard";
import Layout from "../layout/Layout";

const routers = [
    {
        element: <PublicRoute />, 
        children: [
            {
                path: '/signin',
                element: <SignIn />
            },
            {
                path: '/signup',
                element: <SignUp />
            }
        ]
    },

    {
        path: '/',
        element: <ProtectedRoute />, 
        children: [
            {
                element: <Layout />, 
                children: [
                    {
                        index: true, 
                        element: <DashBoard />
                    }
                ]
            }
        ]
    },

   
];

export default routers;