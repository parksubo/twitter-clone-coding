import { authService, dbService } from "myFirebase";
import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// for Profile import
const Profile = ({ userObj }) => {
    // redirect를 위한 navigate
    const navigate = useNavigate();

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    }

    // 컬렉션중 userObj의 uid와 동일한createorId의 모든 문서를 내림차순으로 가져오는 쿼리
    const getMyTweets = async() => {
        const q = query(
            collection(dbService, "tweets"),
            where("creatorId", "==", userObj.uid),
            orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
        });
    };



    useEffect(() => {
        getMyTweets();
    }, [])

    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );

};

export default Profile;
