import React, { useEffect, useState } from "react";
import { dbService } from "myFirebase";
import { addDoc, collection, getDocs, orderBy, query, onSnapshot } from "firebase/firestore";
import Tweet from "components/Tweet";

// for Home import
const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    const [attachment, setAttachment] = useState();

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

    const onFileChange = (event) => {
        const {
            target:{ files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();

        // 파일 로딩이 끝남을 받는 event listener
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        } 
        reader.readAsDataURL(theFile);
    };

    const onClearAttachment = () => setAttachment(null);

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
            <input
                onChange={onFileChange}
                type="file"
                accept="image/*"
            />
            {
                attachment && (
                <div>
                    <img src={attachment} width="100px" height="100px" />
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
                )
            }
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
