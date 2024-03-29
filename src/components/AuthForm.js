import React, {useState} from "react";
import { createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         getAuth
} from "firebase/auth";


const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);
    const [error, setError] = useState("");

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
            // 에러탐지시 메시지 설정
            setError(error.message);
        }
        
    };

    // newAccount의 이전 값을 가져와서 반대되는 값을 리턴
    const toggleAccount = () => setNewAccount((prev) => !prev);

    return (
        <>
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
                {error}
            </form>
            <span 
                onClick={toggleAccount}
                style={{ color: "#3F51B5" }}>
                {newAccount ? "Do you want to Log In?" : "Do you want to Create Account?"}
            </span>
        </>
    );
};

export default AuthForm;