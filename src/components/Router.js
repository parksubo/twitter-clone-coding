import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Navigation from "components/Navigation";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Profile from "routes/Profile";

const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
    return (
        <BrowserRouter>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Routes>
                {isLoggedIn ? (
                        <>
                        <Route path ="/Home" element={<Home userObj={userObj}S/>}/>
                        <Route path ="/Profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />}/>
                        </>
                    ) : (
                        <>
                        <Route path ="/" element={<Auth />}/>
                        </>
                    )
                }
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;



