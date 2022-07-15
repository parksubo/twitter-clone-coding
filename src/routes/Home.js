import React, { useState } from "react";

// for Home import
const Home = () => {
    const [tweet, setTweet] = useState("");
    
    const onSubmit = (event) => {
        // 아무것도 입력하지 않는 행위 방지
        event.preventDefault();
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
