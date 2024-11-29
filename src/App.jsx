import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

function App() {
  const [clientId, setClientId] = useState("");
  const [hasClientId, setHasClientId] = useState(false);

  // local
  const CLIENT_ID =
    "839002591508-fbqvcg2r9l9tic12g3sn67eeeavdqust.apps.googleusercontent.com";

  // const CLIENT_ID =
  //   "https://797924800674-gg0ujac93tutnkrrv3undphleev3f3a6.apps.googleusercontent.com";

  // production
  // const CLIENT_ID =
  //   "839002591508-bsvtvm715p2n2o6144kfn2pfaqq7f4ej.apps.googleusercontent.com";

  const handleClientId = (e) => {
    setClientId(e.target.value);
  };
  const sendToLoginPage = () => {
    setHasClientId(true);
  };
  return (
    <>
      {!hasClientId ? (
        <div className="h-screen w-full grid place-items-center">
          <div className="w-[400px] space-y-8">
            <div>
              <Label>Client Id</Label>
              <Input
                placeholder="Your Client ID"
                value={clientId}
                onChange={handleClientId}
              />
              <small>
                Kindly enter a valid client ID, as it&apos;s required to log in.
              </small>
            </div>
            <div>
              <Button
                disabled={clientId.length === 0}
                onClick={sendToLoginPage}
                className="w-full"
              >
                Set Client Id
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <GoogleOAuthProvider clientId={clientId}>
          <LoginForm />
        </GoogleOAuthProvider>
      )}
    </>
  );
}

export default App;
