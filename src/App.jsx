import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import LoginForm from "./components/LoginForm";

function App() {
  const CLIENT_ID =
    "839002591508-fbqvcg2r9l9tic12g3sn67eeeavdqust.apps.googleusercontent.com";
  return (
    <>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <LoginForm />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
