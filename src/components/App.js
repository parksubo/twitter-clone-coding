import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "myFirebase";

function App() {
  // firebase가 프로그램을 초기화 하길 기다리기 위한 state
  const [init, setInit] = useState(false);
  // 로그인 여부 state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // user 정보 state
  const [userObj, setUserObj] = useState(null);

  // user의 변화를 듣고 listen
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
        setUserObj(user);
      }
      else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);


  return (
    <>
    {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..."}
    <footer>&copy; {new Date().getFullYear()} PONZ</footer>
    </>
  );
}

export default App;
