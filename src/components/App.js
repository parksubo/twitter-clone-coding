import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "myFirebase";

function App() {
  // firebase가 프로그램을 초기화 하길 기다리기 위한 state
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // user의 변화를 듣고 listen
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
      }
      else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

/*
  console.log(authService.currentUser);
  setInterval(() => {
    console.log.authService(authService.currentUser);
  }, 2000);
  */
  return (
    <>
    {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
    <footer>&copy; {new Date().getFullYear()} PONZ</footer>
    </>
  );
}

export default App;
