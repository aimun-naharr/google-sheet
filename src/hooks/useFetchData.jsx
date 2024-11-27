import React, { useEffect, useState } from "react";
import { getRows } from "../services/actions";

export default function useFetchData() {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const sheetId = localStorage.getItem("sheet-id");
  const fetchData = async () => {
    try {
      setIsFetching(true);
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
