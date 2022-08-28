import AuthForm from "components/AuthForm";
import { createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         getAuth, 
         GoogleAuthProvider,
         signInWithPopup
       } from "firebase/auth";
//import { authService } from "myFirebase";
import React, {useEffect, useState} from "react";

// for auth import
const Auth = () => {

    // 소셜 로그인을 위한 onClick
    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;

        let provider;
        const auth = getAuth();

        if(name === "google") {
            provider = new GoogleAuthProvider();
        }

        const data = await signInWithPopup(auth, provider);
        console.log(data);
    }

    return (
        <div>
            <AuthForm/>
            <div>
                <button onClick={onSocialClick} name="google">
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default Auth;
