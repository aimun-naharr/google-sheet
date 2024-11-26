import React, { useEffect, useState } from "react";
import baseAxios from "../services/api";

export default function GoogleSheetTable() {
  const [data, setData] = useState(null);
  const getRows = async () => {
    const url = `/values/Sheet1`;
    const response = await baseAxios.get(url);
    console.log("table response", response.data);
    setData(response.data);
    return response.data;
  };
  useEffect(() => {
    getRows();
  }, []);

  const tableHeaders = data?.values[0];
  const tableRows = data?.values.slice(1);
  console.log(tableHeaders, tableRows);
  return (
    <div>
      GoogleSheetTable
      <div>
        <table>
          <thead>
            <tr>
              {tableHeaders?.map((header, i) => {
                return (
                  <th
                    className="font-semibold px-4 py-3 border min-w-[200px]"
                    key={`${header}-${i + 1}`}
                  >
                    {header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {tableHeaders.map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {row[colIndex] || "N/A"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
