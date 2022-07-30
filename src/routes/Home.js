import React, { useEffect, useState } from "react";
import { dbService } from "myFirebase";
import { addDoc, collection, getDocs, orderBy, query, onSnapshot } from "firebase/firestore";
import Tweet from "components/Tweet";

// for Home import
const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);

    const getTweets = async () => {
        const dbTweets = await getDocs(collection(dbService, "tweets"));
        dbTweets.forEach((document) => {
            // tweet의 구조
            const tweetObject = {
                ...document.data(),
                id: document.id,
            };
            setTweets((prev) => [tweetObject, ...prev]);
        });
    }

    useEffect(() => {
        //getTweets();
        const q = query(collection(dbService, "tweets"), orderBy("createdAt", "desc"));
        // arr를 만들어준다음 setTweets 하는 방법
        onSnapshot(q, (snapshot) => {
            const tweetArr = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setTweets(tweetArr);
        })
    }, []);
    
    const onSubmit = async (event) => {
        // 아무것도 입력하지 않는 행위 방지
        event.preventDefault();
        // tweets collction에 tweet내용과 작성시간을 담은 Doc을 add
        await addDoc(collection(dbService, "tweets"), {
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
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
        <div>
            {tweets.map((tweet) => (
                <Tweet key={tweet.id} 
                       tweetObj={tweet} 
                       isOwner={tweet.creatorId === userObj.uid}
                />
            ))}
        </div>
    </div> 
    );
};    

export default Home;
