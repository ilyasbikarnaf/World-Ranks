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
  Skeleton,
} from "@heroui/react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  function handleRowClick(cca2: string) {
    router.push(`/${cca2}`);
  }

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="default"
            page={page}
            total={pages || 1}
            onChange={(newPage) => setPage(newPage)}
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
              <TableRow
                onClick={() => handleRowClick(country.cca2)}
                key={country.cca2}
                className="hover hover:cursor-pointer hover:bg-[#1C1D1F]"
              >
                <TableCell className="text-2xl sm:text-4xl">
                  {country.flag}
                </TableCell>

                <TableCell>{country.name.common}</TableCell>

                <TableCell>{country.population.toLocaleString()}</TableCell>
                <TableCell>{country.area.toLocaleString()}</TableCell>
              </TableRow>
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
