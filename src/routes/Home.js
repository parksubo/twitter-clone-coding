import React, { useEffect, useState } from "react";
import { dbService, storageService } from "myFirebase";
import { addDoc, collection, getDocs, orderBy, query, onSnapshot } from "firebase/firestore";
//import {getDownloadURL, ref, uploadString} from "@firebase/storage";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";

// for Home import
const Home = ({ userObj }) => {
    
    const [tweets, setTweets] = useState([]);
    
    /*
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
    */

    useEffect(() => {
        //getTweets();
        const q = query(collection(dbService, "tweets"), orderBy("createdAt", "desc"));
        // arr를 만들어준다음 setTweets 하는 방법
        onSnapshot(q, (snapshot) => {
            // snapshot은 listener라고 생각하면 됨
            const tweetArr = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setTweets(tweetArr);
        })
    }, []);

    return (
        <div>
            <TweetFactory userObj={userObj} />
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
