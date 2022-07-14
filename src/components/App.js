import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "myFirebase";

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
    <AppRouter isLoggedIn={isLoggedIn} />
    <footer>&copy; {new Date().getFullYear()} PONZ</footer>
    </>
  );
}

export default App;
