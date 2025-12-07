import Layout from "../layout/Layout";
import Home from "../pages/Home";
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
                path: ""
            }
        ]
    }
]

export default routers