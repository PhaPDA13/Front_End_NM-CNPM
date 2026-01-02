import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";

export default function Layout() {
    return (
        <div className="min-h-screen flex">
            {/* NAV */}
            <aside className="fixed top-0 left-0 h-screen w-20 lg:w-64 z-50">
                <Nav />
            </aside>

            {/* CONTENT */}
            <div className="ml-20 lg:ml-64 flex flex-col flex-1 min-h-screen">
                {/* Main content */}
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}
