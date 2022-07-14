import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "myFirebase";

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
    <AppRouter isLoggedIn={isLoggedIn} />
    <footer>&copy; {new Date().getFullYear()} PONZ</footer>
    </>
  );
}

export default App;
