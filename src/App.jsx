import { useRoutes } from "react-router-dom"
import routers from "./router/routers"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Quan trọng: nhớ import CSS
import LoadingBar from 'react-top-loading-bar';
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function App() {
  const element = useRoutes(routers)
  const { isLoading, error } = useSelector((state) => state.auth);
  const loadingBarRef = useRef(null);
  const { mode } = useSelector((state) => state.theme)
  console.log(mode)
  useEffect(() => {
    if (isLoading) {
      loadingBarRef.current.continuousStart();
    } else {
      loadingBarRef.current.complete();
    }
  }, [isLoading]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [mode]);

  return (
    <>
      <LoadingBar color='#06b6d4' ref={loadingBarRef} height={3} />
      {element}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
