"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@heroui/react";
import Link from "next/link";

export default function TableComponent({
  paginatedCountries,
  pages,
  page,
  setPage,
}: {
  paginatedCountries: any;
  pages: number;
  page: number;
  setPage: (e: number) => void;
}) {
  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        <TableColumn key="flag">FLAG</TableColumn>
        <TableColumn key="name">NAME</TableColumn>
        <TableColumn key="population">POPULATION</TableColumn>
        <TableColumn key="area">
          AREA (km<sup>2</sup>)
        </TableColumn>
      </TableHeader>
      <TableBody>
        {paginatedCountries.map((country) => {
          return (
            <TableRow
              key={country.cca2}
              // href={country.cca2}
              className="hover hover:cursor-pointer hover:bg-[#1C1D1F]"
            >
              <TableCell className="text-2xl sm:text-4xl">
                {country.flag}
              </TableCell>

              <TableCell>
                <Link href={country.cca2}>{country.name.common}</Link>{" "}
              </TableCell>
              <TableCell>{country.population.toLocaleString()}</TableCell>
              <TableCell>{country.area.toLocaleString()}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
