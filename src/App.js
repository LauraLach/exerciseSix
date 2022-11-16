import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import './App.css';
import CreateUserPage from "./pages/CreateUser";
import LoginPage from "./pages/Login";
import UserProfilePage from "./pages/UserProfile";
import Header from "./components/Header";

const firebaseConfig = {
  apiKey: "AIzaSyAkjHGnocTF2bZ9JStUPw-mxM1CFTwXWzA",
  authDomain: "exercise-six.firebaseapp.com",
  projectId: "exercise-six",
  storageBucket: "exercise-six.appspot.com",
  messagingSenderId: "197364424098",
  appId: "1:197364424098:web:a730d538b2a379de4526fb",
  measurementId: "G-42XX2G6R6N"
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProfilePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/create",
    element: <CreateUserPage />,
  },
]);

function App() {
  const [appInitialized, setAppInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInformation, setUserInformation] = useState();

  useEffect(() => {
    initializeApp(firebaseConfig);
    setAppInitialized(true);
  }, []);

  useEffect(() => {
    if(appInitialized) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if(user) {
          setUserInformation(user);
          setIsLoggedIn(true);
        } else {
          setUserInformation({});
          setIsLoggedIn(false);
        }
        setIsLoading(false);
      });
    }
  }, [appInitialized]);

  return (
    <div className="App">
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
