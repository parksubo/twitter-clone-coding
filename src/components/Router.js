import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Navigation from "components/Navigation";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Profile from "routes/Profile";

const AppRouter = ({isLoggedIn, userObj}) => {
    return (
        <BrowserRouter>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? (
                        <>
                        <Route path ="/Home" element={<Home userObj={userObj} />}/>
                        <Route path ="/Profile" element={<Profile />}/>
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



