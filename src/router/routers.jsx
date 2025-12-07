import Layout from "../layout/Layout";
import Home from "../features/Home/Home";
import SignUp from "../features/Auth/SignUp/SignUp";
const routers = [
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Home/>
            }, 
            {
                path: "signup",
                element: <SignUp/>
            }
        ]
    }
]

export default routers