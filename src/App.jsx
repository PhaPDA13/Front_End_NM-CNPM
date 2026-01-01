import { useRoutes } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from 'react-top-loading-bar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import routers from "./router/routers";
import { logout, setCredentials } from "./features/Auth/authSlice";
import axiosClient from "./services/axiosClient";

function App() {
  const element = useRoutes(routers);
  const dispatch = useDispatch();
  const loadingBarRef = useRef(null);

  const { isLoading } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await axiosClient.post('/user/refresh');
        if (result && result.accessToken) {
          dispatch(setCredentials({ accessToken: result.accessToken }));
        }
      } catch (error) {
        dispatch(logout());
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkAuth();
  }, [dispatch]);

  useEffect(() => {
    if (loadingBarRef.current) {
      if (isLoading) {
        loadingBarRef.current.continuousStart();
      } else {
        loadingBarRef.current.complete();
      }
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

  if (isCheckingAuth) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary border-blue-500"></div>
      </div>
    );
  }
  return (
    <>
      <LoadingBar color='#06b6d4' ref={loadingBarRef} height={3} shadow={true} />  
      {element}   
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={mode === 'dark' ? 'dark' : 'light'} 
      />
    </>
  );
}

export default App;