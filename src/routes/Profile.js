import { authService } from "myFirebase";
import React from "react";
import { useNavigate } from "react-router-dom";

// for Profile import
const Profile = () => {
    // redirect를 위한 navigate
    const navigate = useNavigate();

    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    }

    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );

};

export default Profile;
