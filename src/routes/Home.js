import React, { useState } from "react";
import { dbService } from "myFirebase";
import { addDoc, collection } from "firebase/firestore";

// for Home import
const Home = () => {
    const [tweet, setTweet] = useState("");
    
    const onSubmit = async (event) => {
        // 아무것도 입력하지 않는 행위 방지
        event.preventDefault();
        // tweets collction에 tweet내용과 작성시간을 담은 Doc을 add
        await addDoc(collection(dbService, "tweets"), {
            tweet,
            createdAt: Date.now(),
        });
        // add한 이후 tweet을 빈 문자열로 초기화
        setTweet("");
    };

    const onChange = (event) => {
        const {
            target: { value },           
        } = event;
        setTweet(value);
    };

    return (
        <div>
        <form onSubmit={onSubmit}>
            <input
                value={tweet}
                onChange={onChange}
                type="text"
                placeholder="what's on your mind?"
                maxLength={120}
            />
            <input
                type="submit"
                value="Tweet"
            />
        </form>
    </div> 
    );
}    

export default Home;
