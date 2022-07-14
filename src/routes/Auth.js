import { createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         getAuth 
       } from "firebase/auth";
import { authService } from "myFirebase";
import React, {useEffect, useState} from "react";

// for auth import
const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);

    // Input Change 감지
    const onChange = (event) => {
        //console.log(event.target.name);
        // 이벤트로부터 name을 받아서 email OR password set하기
        const {target: {name, value}} = event;
        if(name === "email") {
            setEmail(value);
        }
        else if (name === "password") {
            setPassword(value);
        }
    };

    // async로 바꿔주기
    const onSubmit = async (event) => {
        // form 제출 값이 default인 것을 방지
        event.preventDefault();
        try {
            let data;
            const auth = getAuth();
            if(newAccount) {
                // 계정 생성
                data = await createUserWithEmailAndPassword(
                    auth,
                    email, 
                    password
                );
                
            }
            else {
                // 로그인
                data = await signInWithEmailAndPassword(
                    auth,
                    email, 
                    password
                );
            }
            console.log(data);
        }
        catch(error) {
            console.log(error);
        }
        
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    name="email"
                    type="text" 
                    placeholder="Email"
                    required value={email}
                    onChange={onChange}
                />
                <input 
                    name="password"
                    type="password" 
                    placeholder="Password"
                    required value={password}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value={newAccount ? "Create Account" : "Log In"}
                />
            </form>
            <div>
                <button>
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default Auth;
