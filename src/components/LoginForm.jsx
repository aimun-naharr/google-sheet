import React, { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const [token, setToken] = useState("");
  let navigate = useNavigate();
  const handleLogin = useGoogleLogin({
    onSuccess: (response) => {
      console.log("Login Response:", response);

      try {
        // Extract the access token from the response
        const { access_token } = response;
        console.log("Access Token:", access_token);
        navigate("/google-sheet-table");

        // Store the access token
        localStorage.setItem("token", access_token);
        setToken(access_token);

        // Optionally, you can now use the token to make API requests
        // For example: Fetch Google Sheets data
        axios
          .get(
            "https://sheets.googleapis.com/v4/spreadsheets/1rWSZDHbINnCV0rS6G5aAbMnPLHd0_HoN9rIsYh33MCQ/values/Sheet1",
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          )
          .then((response) => {
            console.log("Sheet data:", response.data);
          })
          .catch((error) => {
            console.error("Error fetching sheet data:", error);
          });
      } catch (error) {
        console.error("Error:", error);
      }
    },
    onError: (error) => {
      console.error("Login Error:", error);
    },
    scope:
      "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive",
  });
  return (
    <div>
      {" "}
      <Button onClick={handleLogin}>Log in with google</Button>
    </div>
  );
}
