import { useEffect, useState } from "react";
import { generateFormattedData, generateHeaders } from "../lib/utils";
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

  const tableHeaders = generateHeaders(data?.values[0]);
  const tableRows = generateFormattedData(data?.values.slice(1));
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
                    key={`${header.name}-${i + 1}`}
                  >
                    {header.value}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tableRows?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {tableHeaders?.map((header) => {
                  const head = header.name.split("")[0];
                  const rowKey = Object.keys(row).find((itm) =>
                    itm.includes(head)
                  );
                  console.log(rowKey);
                  return (
                    <td
                      key={rowKey}
                      className="border border-gray-300 px-4 py-2"
                    >
                      {row[rowKey]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
