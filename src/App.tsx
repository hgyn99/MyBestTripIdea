import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-accont";
import Chat from "./routes/chat";
import { createGlobalStyle } from "styled-components";
import { useState, useEffect} from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import { styled} from "styled-components";
import ProtectedRoute from "./components/protected-route";
import ChatRooms from "./routes/chatrooms";
const router = createBrowserRouter ([
  /*{
    path:"/",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
    ],
  },*/
  {
    path:"/login",
    element:<Login />
  },
  {path: "/create-account", element:<CreateAccount />},
  {
    path: "",
    element: <Home />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "chat",
    element: <Chat />,
  },
  {
    path: "chatrooms",
    element: <ChatRooms/>,
  },
]);


const GlobalStyles = createGlobalStyle`
  
  * {
    box-sizing: border-box;
  }
  body {
    background-color: white;
    color:white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    overflow-y:hidden;
  }
`;


const Wrapper =styled.div`
    height: 100vh;
    display:flex;
    overflow-y:hidden;
`;


function App() {
  const [isLoading, setLoading] =useState(true);
  const init = async() => {
    //wait for firebase
    await auth.authStateReady();
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);
  return ( 
  <Wrapper>
    <GlobalStyles />
    {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
  </Wrapper>
  );
}

export default App;