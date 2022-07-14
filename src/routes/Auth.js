import React, {useEffect, useState} from "react";

// for auth import
const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
    // form 제출 값이 default인 것을 방지
    const onSubmit = (event) => {
        event.preventDefault();
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
                <input type="submit" value="Log In" />
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
