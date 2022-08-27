import { authService, dbService } from "myFirebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

// for Profile import
const Profile = ({ userObj }) => {
    // redirect를 위한 navigate
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    // 클릭하면 로그아웃
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event)=> {
        // 미 입력 방지
        event.preventDefault();
        // 변화가 있을 때만 업데이트
        if(userObj.displayName !== newDisplayName) {
            await updateProfile(userObj, {displayName: newDisplayName});
        }
    };

    // 컬렉션중 userObj의 uid와 동일한createorId의 모든 문서를 내림차순으로 가져오는 쿼리
    const getMyTweets = async() => {
        const q = query(
            collection(dbService, "tweets"),
            where("creatorId", "==", userObj.uid),
            orderBy("createdAt", "desc")
        );

        // 쿼리 결과값 가져오기
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
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="Display Name"
                    value={newDisplayName}
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );

};

export default Profile;
