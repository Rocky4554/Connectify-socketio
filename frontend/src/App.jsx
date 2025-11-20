import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import UserProvider from "./components/UserProvider.jsx";
import { useSelector } from "react-redux";
import { selectTheme } from "./store/themeSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import { setOnlineUsers } from "./store/userSlice";

const socket = io(import.meta.env.VITE_API_URL, {
  withCredentials: true,
});

// Lazy load page components
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const SignUpPage = lazy(() => import("./pages/SignUpPage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage.jsx"));
const CallPage = lazy(() => import("./pages/CallPage.jsx"));
const ChatPage = lazy(() => import("./pages/ChatPage.jsx"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage.jsx"));
const Friends = lazy(() => import("./pages/friends.jsx"));
const ChatBox = lazy(()=>import("./pages/Chatbox.jsx"));

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const theme = useSelector(selectTheme);
   const dispatch = useDispatch();

  useEffect(() => {
    if (!authUser) return;

    // Emit that user is online
    socket.emit("user-connected", authUser._id);

    // Listen for online users list update from server
    socket.on("get-online-users", (users) => {
      dispatch(setOnlineUsers(users));
    });

    // Disconnect handler when user leaves
    return () => {
      socket.emit("user-disconnected", authUser._id);
      socket.off("get-online-users");
    };
  }, [authUser, dispatch]);

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-screen" data-theme={theme}>
      <UserProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
          <Route
            path="/"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSidebar={true}>
                  <HomePage />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/friends"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSidebar={true}>
                  <Friends />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              !isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            }
          />
          <Route
            path="/notifications"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSidebar={true}>
                  <NotificationsPage />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/call/:id"
            element={
              isAuthenticated && isOnboarded ? (
                <CallPage />
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/chat/:id"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSidebar={false}>
                  <ChatPage />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/onboarding"
            element={
              isAuthenticated ? (
                !isOnboarded ? (
                  <OnboardingPage />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/chatbox"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSidebar={true}>
                  <ChatBox />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          </Routes>
        </Suspense>
        <Toaster />
      </UserProvider>
    </div>
  );
};

export default App;