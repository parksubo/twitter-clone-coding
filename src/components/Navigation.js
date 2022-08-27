import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({userObj}) => {

    //console.log(userObj);

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/Home">Home</Link>
                </li>
                <li>
                    <Link to="/Profile">{userObj.displayName}'s Profile</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;