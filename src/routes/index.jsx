import { Route, Routes } from "react-router";
import App from "../App";
import GetStarted from "../components/GetStarted";
import GoogleSheetTable from "../components/GoogleSheetTable";
import AppLayout from "../components/layout";
import AuthRoute from "./AuthRoute";
import ProtectedRoute from "./ProtectedRoute";
import GSheetTable from "../pages/GSheetTable";

export default function AllRoutes() {
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route element={<AuthRoute />}>
            <Route path="/" element={<App />} />
          </Route>
        </Route>
        {/* <Route path="about" element={<About />} /> */}
        <Route element={<AppLayout />}>
          <Route path="/get-started" element={<GetStarted />} />
          <Route element={<AuthRoute />}>
            <Route path="/" element={<App />} />
          </Route>
          <Route path="/google-sheet-table" element={<GSheetTable />} />
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
