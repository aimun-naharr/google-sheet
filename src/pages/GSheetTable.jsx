import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useState } from "react";
import GoogleSheetTable from "../components/GoogleSheetTable";
import LoginForm from "../components/LoginForm";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const GSheetTable = () => {
  const accessToken = localStorage.getItem("token");
  const [token, setToken] = useState(accessToken);
  const [hasClientId, setHasClientId] = useState(false);
  const cachedClientId = localStorage.getItem("client-id");
  console.log("cache", cachedClientId);
  const [clientId, setClientId] = useState(cachedClientId);
  console.log("clientId", clientId);

  useEffect(() => {
    setToken(accessToken);
  }, [accessToken]);

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
    localStorage.setItem("client-id", clientId);
    setHasClientId(true);
    // setClientId(true);
    setToken("");
  };
  console.log("hasClientId", hasClientId);
  return (
    <>
      {token ? (
        <GoogleSheetTable setHasClientId={setHasClientId} setToken={setToken} />
      ) : (
        <div>
          {!hasClientId ? (
            <div className="h-screen w-full grid place-items-center">
              <div className="w-[400px] space-y-8">
                <div>
                  <Label>Client Id</Label>
                  <Input
                    placeholder="Your Client ID"
                    value={clientId ?? ""}
                    onChange={handleClientId}
                  />
                  <small>
                    Kindly enter a valid client ID, as it&apos;s required to log
                    in.
                  </small>
                </div>
                <div>
                  <Button
                    disabled={!clientId}
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
              <LoginForm setToken={setToken} />
            </GoogleOAuthProvider>
          )}
        </div>
      )}
    </>
  );
};

export default GSheetTable;
