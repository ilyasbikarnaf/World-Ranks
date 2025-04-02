"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@heroui/react";
import fetchCountries, { CountriesType } from "@/utils/fetchCountries";
import Image from "next/image";

export default function TableComponent({
  countries,
  pages,
}: {
  countries: CountriesType;
  pages: number;
}) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [countries, setCountries] = useState<CountriesType[]>([]);

  useEffect(() => {
    fetchCountries()
      .then((data) => {
        console.log(data);
        setCountries(data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const pages = Math.ceil(countries.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return countries.slice(start, end);
  }, [page, countries]);

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
        {items.map((item) => {
          return (
            <TableRow key={item.ccn3}>
              <TableCell className="text-2xl">{item.flag}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.population.toLocaleString()}</TableCell>
              <TableCell>{item.area}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
