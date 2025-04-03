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
  paginatedCountries,
  pages,
  page,
  setPage,
}: {
  paginatedCountries: CountriesType[];
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
            <TableRow key={country.ccn3}>
              <TableCell className="text-2xl">{country.flag}</TableCell>
              <TableCell>{country.name}</TableCell>
              <TableCell>{country.population.toLocaleString()}</TableCell>
              <TableCell>{country.area.toLocaleString()}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
