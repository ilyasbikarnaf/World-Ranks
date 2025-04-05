import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Bounce, toast } from "react-toastify";

export default function TableError({ errorMessage }: { errorMessage: string }) {
  toast.error("Failed To Fetch Data", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });

  return (
    <Table>
      <TableHeader>
        <TableColumn key="flag">FLAG</TableColumn>
        <TableColumn key="name">NAME</TableColumn>
        <TableColumn key="population">POPULATION</TableColumn>
        <TableColumn key="area">
          AREA (km<sup>2</sup>)
        </TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={4}
            className="pt-4 text-center text-xl text-red-500"
          >
            {errorMessage}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
