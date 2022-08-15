import { dbService } from "myFirebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import React, {useState, useEffect } from "react";
import { async } from "@firebase/util";

const Tweet = ({tweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);

    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure to delete this tweet?");
        console.log(ok);
        if(ok) {
            // delete tweet
            const tweetTextRef =doc(dbService, "tweets", `${tweetObj.id}`);
            await deleteDoc(tweetTextRef);
        }
    };

    // 반대로 토글
    const toggleEditing = () => setEditing((prev) => !prev);

    // Edit submit
    const onSubmit = async (event) => {
        event.preventDefault();
        // console.log(tweetObj, newTweet);
        // tweetObj.id로 받은 text를 newTweet으로 update
        const tweetTextRef =doc(dbService, "tweets", `${tweetObj.id}`);
        await updateDoc(tweetTextRef, {
            text: newTweet,
        });
        // 수정이 끝났으므로 false
        setEditing(false);
    }

    const onChange = (event) => {
        const { 
            target:{value},
        } = event;
        setNewTweet(value);
    }



    return (
        <div> 
            {
                editing ? (
                    <>
                        <form onSubmit={onSubmit}>
                            <input 
                                type="text"
                                placeholder="Edit yout tweet"
                                value={newTweet} required
                                onChange={onChange}
                            />
                            <input 
                                type="submit"
                                value="Update Tweet"
                            />
                        </form>
                        <button onClick={toggleEditing}>Cancel</button>
                    </>

                ) : (
                    <>
                        <h4>{tweetObj.text}</h4>
                        {tweetObj.attachmentURL && 
                            <img src={tweetObj.attachmentURL} width="50px" height="50px" />
                        }
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>Delete Tweet</button>
                                <button onClick={toggleEditing}>Edit Tweet</button>
                            </>
                        )}
                    </>
                )
            }
        </div>
    );
};

export default Tweet;