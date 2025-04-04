"use client";
import { useCountriesContext } from "@/context/CountriesContext";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  Skeleton,
} from "@heroui/react";
import Link from "next/link";
import RowSkeleton from "./RowSkeleton";

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
  const { isLoading } = useCountriesContext();

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

      {!isLoading ? (
        <TableBody items={paginatedCountries}>
          {(country: any) => {
            return (
              <Link href="/">
                <TableRow
                  key={country.cca2}
                  // href={country.cca2}
                  className="hover hover:cursor-pointer hover:bg-[#1C1D1F]"
                >
                  <TableCell className="text-2xl sm:text-4xl">
                    {country.flag}
                  </TableCell>

                  <TableCell>
                    <Link href={country.cca2}>{country.name.common}</Link>
                  </TableCell>
                  <TableCell>{country.population.toLocaleString()}</TableCell>
                  <TableCell>{country.area.toLocaleString()}</TableCell>
                </TableRow>
              </Link>
            );
          }}
        </TableBody>
      ) : (
        <TableBody className="space-y-3">
          {Array.from({ length: 10 }, (_, i) => (
            <TableRow key={i}>
              <TableCell className="text-2xl sm:text-4xl">
                <Skeleton className="h-6 w-4/5 rounded-lg" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-6 w-4/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-4/5 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-4/5 rounded-lg" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
}
