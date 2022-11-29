import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";

function LoginPage({ isLoggedIn, setIsLoggedIn, setUserInformation }) {
    const [errors, setErrors] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedIn) return navigate('/');
    }, [isLoggedIn, navigate]);

    const loginUser = useCallback((e) => {
        e.preventDefault();

        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;

        console.log({email, password});

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setIsLoggedIn(true);
                setUserInformation({
                    email: user.email,
                    displayName: user.displayName,
                    uid: user.uid,
                    accessToken: user.accessToken,
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.warn({ error, errorCode, errorMessage });
                setErrors(errorMessage);
            });
    }, [setIsLoggedIn, setUserInformation]);

    return ( 
    <>
        <Header 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setUserInformation={setUserInformation}
            />
        <div className="PageWrapper">
            <h1>Login</h1>
            <LoginForm loginUser={loginUser}/>
            <p>{errors}</p>
        </div>
    </>
    );
}

export default LoginPage;