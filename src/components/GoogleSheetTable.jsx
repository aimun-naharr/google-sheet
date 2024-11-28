import { useEffect, useState } from "react";
import {
  extractSheetId,
  generateFormattedData,
  generateHeaders,
} from "../lib/utils";
import baseAxios from "../services/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import UpdateModal from "./modal/UpdateModal";
import useFetchData from "../hooks/useFetchData";
import DeleteModal from "./modal/DeleteModal";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import useSheetLink from "../hooks/useSheetLink";
import { Button } from "./ui/button";
import AddModal from "./modal/AddModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import TableSkeleton from "./ui/TableSkeleton";
import { getRows } from "../services/actions";

export default function GoogleSheetTable() {
  const { data, setData, isFetching, setIsFetching } = useFetchData(null);
  const { setSheetLink, sheetId } = useSheetLink();
  const [sheetLinkValue, setSheetLinkValue] = useState("");
  const [disableGetBtn, setDisableGetBtn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const tableHeaders =
    data && data.values.length > 0
      ? [{ name: "", value: "#" }, ...generateHeaders(data?.values[0])]
      : null;
  const tableRows =
    data && data.values.length > 0
      ? generateFormattedData(data?.values.slice(1))
      : null;

  const handleGetData = async () => {
    setSheetLink(sheetLinkValue);
    setSheetLinkValue("");
    setIsFetching(true);
    try {
      const id = extractSheetId(sheetLinkValue);
      const response = await getRows(id);
      setData(response.data);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
    }
  };

  const checkIfSheetLinkIsValid = (value) => {
    const match = value.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (match && match[1]) {
      return true;
    } else false;
  };
  const handleOnchange = (e) => {
    const { value } = e.target;
    setSheetLinkValue(value);
    if (checkIfSheetLinkIsValid(value)) {
      setDisableGetBtn(false);
      setErrorMessage("");
    } else {
      setErrorMessage("Please provide a valid link");
    }
  };
  const getLastRow = (obj) => {
    const updatedObj = {};

    Object.keys(obj).forEach((key) => {
      const match = key.match(/^([A-Z]+)(\d+)$/);
      if (match) {
        const column = match[1];
        const row = parseInt(match[2], 10) + 1;
        updatedObj[`${column}${row}`] = "";
      }
    });

    return updatedObj;
  };
  const lastRow = tableRows ? getLastRow(tableRows[tableRows?.length - 1]) : [];

  console.log("tableHeaders", tableHeaders);

  return (
    <div className="mt-20">
      <div className="container">
        <h1 className="font-semibold text-xl">Sheet Table</h1>
        <div className="mt-2">
          <div className="flex gap-4 items-end">
            <div className="w-2/5 shrink-0">
              <Label>Sheet link</Label>
              <Input value={sheetLinkValue} onChange={handleOnchange} />
            </div>

            <div className="">
              <Button disabled={disableGetBtn} onClick={handleGetData}>
                Get Data
              </Button>
            </div>
          </div>
          {errorMessage.length > 0 && (
            <p className="text-sm mt-1 text-red-500">{errorMessage}</p>
          )}
          {data ? (
            <div className="flex justify-end mb-4">
              <AddModal
                row={lastRow}
                setData={setData}
                tableHeaders={tableHeaders}
              />
            </div>
          ) : null}
        </div>
      </div>
      {isFetching ? (
        <div className="container mt-2">
          <TableSkeleton />
        </div>
      ) : data && data?.values.length > 0 ? (
        <div className="container border py-10  rounded">
          <Table className="overflow-x-scroll">
            <TableHeader>
              <TableRow>
                {tableHeaders?.map((header, i) => {
                  if (i === 0) {
                    return (
                      <TableHead
                        className="text-center  w-[30px]"
                        key={`${header.name}-${i + 1}`}
                      >
                        Action
                      </TableHead>
                    );
                  }
                  return (
                    <TableHead
                      className=" min-w-[80px]"
                      key={`${header.name}-${i + 1}`}
                    >
                      {header.value}
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableRows?.map((row, rowIndex) => (
                <TableRow key={`${Object.keys(row).join(":")}`}>
                  {tableHeaders?.map((header, colIndex) => {
                    const head = header.name.split("")[0];
                    const rowKey = Object.keys(row).find((itm) =>
                      itm.includes(head)
                    );
                    if (colIndex == 0) {
                      return (
                        <TableCell
                          key={colIndex}
                          className="flex items-center justify-center  w-max"
                        >
                          <div className="flex gap-3  ">
                            <UpdateModal
                              row={row}
                              setData={setData}
                              tableHeaders={tableHeaders}
                            />

                            <DeleteModal row={row} setData={setData} />
                          </div>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={`${rowKey}`} className="">
                        {row[rowKey]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : null}
    </div>
  );
}
