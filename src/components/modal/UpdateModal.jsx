import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import baseAxios from "../../services/api";
import { getRows } from "../../services/actions";
import useFetchData from "../../hooks/useFetchData";
import { Edit } from "lucide-react";

export default function UpdateModal({ row, setData }) {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedVal, setUpdatedVal] = useState(row);
  const rangeKeys = Object.keys(row).join(":");
  const range = `Sheet1!${rangeKeys}`;
  const sheetId = localStorage.getItem("sheet-id");

  const values = Object.values(updatedVal);
  const handleOnChange = (key, value) => {
    setUpdatedVal((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const url = `/${sheetId}/values/${range}?valueInputOption=RAW`;

      const body = {
        values: [values],
      };
      const response = await baseAxios.put(url, body);
      if (response?.status === 200) {
        const allRowsResponse = await getRows(sheetId);
        if (allRowsResponse.status === 200) {
          setData(allRowsResponse.data);
          setIsLoading(false);
          setOpenModal(false);
        }
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger
        className="text-sm flex items-center gap-2  hover:bg-secondary py-3 rounded w-full px-4 "
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <Edit size={14} />
        Edit
      </DialogTrigger>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Row</DialogTitle>
          <DialogDescription>Update row with new data</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 ">
          {Object.keys(updatedVal).map((key) => {
            return (
              <div key={key} className="flex gap-4 items-center">
                <Label>{key}:</Label>
                <Input
                  value={updatedVal[key]}
                  onChange={(e) => handleOnChange(key, e.target.value)}
                />
              </div>
            );
          })}
          <div className="flex justify-end">
            <Button disabled={isLoading} onClick={handleUpdate}>
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}