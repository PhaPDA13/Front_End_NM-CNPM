import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";

export default function Layout(){
    return (
        <>
            <div className="flex">
                <div>
                    <Nav/>
                </div>
                <div>
                    <Outlet/>
                </div>
            </div>
            <Footer/>
        </>
    )
}