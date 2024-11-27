import React, { useEffect, useState } from "react";
import { getRows } from "../services/actions";

export default function useFetchData() {
  const [data, setData] = useState(null);
  const sheetId = localStorage.getItem("sheet-id");
  const fetchData = async () => {
    const response = await getRows(sheetId);
    setData(response.data);
  };
  useEffect(() => {
    if (sheetId?.length > 0) {
      fetchData();
    }
  }, [sheetId]);
  return { data, setData };
}
