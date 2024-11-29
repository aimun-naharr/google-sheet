import React from "react";
import { Route, Routes } from "react-router";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import GoogleSheetTable from "../components/GoogleSheetTable";
import AuthRoute from "./AuthRoute";
import GetStarted from "../components/GetStarted";

export default function AllRoutes() {
  return (
    <>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/" element={<App />} />
        </Route>
        {/* <Route path="about" element={<About />} /> */}
        <Route element={<ProtectedRoute />}>
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/google-sheet-table" element={<GoogleSheetTable />} />
        </Route>
        {/*

      <Route path="concerts">
        <Route index element={<ConcertsHome />} />
        <Route path=":city" element={<City />} />
        <Route path="trending" element={<Trending />} />
      </Route> */}
      </Routes>
    </>
  );
}
