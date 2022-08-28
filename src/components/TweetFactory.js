import React, {useState} from "react";
import { dbService, storageService } from "myFirebase";
import { v4 as uuidv4 } from "uuid";
import { uploadString, getDownloadURL, ref } from '@firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

const TweetFactory = ({userObj}) => {
    const [tweet, setTweet] = useState("");
    const [attachment, setAttachment] = useState("");
    
    const onSubmit = async (event) => {
        // 아무것도 입력하지 않는 행위 방지
        event.preventDefault();
        let attachmentURL ="";

        if(attachment !== "")  {
            // 파일 경로 참조 만들기
            const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            // 스토리지 참조경로로 파일 업로드하기
            const response = await uploadString(fileRef, attachment, "data_url");
            // 스토리지 참조 경로에 있는 파일의 URL을 다운로드해서 변수에 넣고 업데이트
            attachmentURL = await getDownloadURL(fileRef);
        }
             
        // tweets collction에 tweet내용과 작성시간을 담은 Doc을 add
        const tweetObject = {
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentURL,
        };

        await addDoc(collection(dbService, "tweets"), tweetObject);
        // add한 이후 tweet을 빈 문자열로 초기화
        setTweet("");
        // 파일 미리보기 img 비우기
        setAttachment("");
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

    
    return (
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
    );
};

export default TweetFactory;

