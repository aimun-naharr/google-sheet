import React, { useEffect, useState } from "react";
import { getRows } from "../services/actions";
import useSheetLink from "./useSheetLink";

export default function useFetchData() {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const sheetId = localStorage.getItem("sheet-id");
  console.log("sheetId", sheetId);
  const fetchData = async () => {
    setIsFetching(true);
    try {
      const response = await getRows(sheetId);
      setData(response.data);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
    }
  };
  useEffect(() => {
    if (sheetId?.length > 0) {
      fetchData();
    }
  }, [sheetId]);
  return { data, setData, isFetching, setIsFetching };
}
