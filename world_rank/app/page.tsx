"use client";
import searchSVG from "@/assets/Search.svg";
import Image from "next/image";
import { Select, SelectSection, SelectItem } from "@heroui/select";
import SelectComponent from "@/components/Dropbox";
import { useEffect, useMemo, useState } from "react";
import cc from "@/utils/cc";
import CheckBoxComponent from "@/components/Checkbox";
import TableComponent from "@/components/Table";
import fetchCountries, { CountriesType } from "@/utils/fetchCountries";

const regions = [
  "Antarctic",
  "Americas",
  "Europe",
  "Asia",
  "Africa",
  "Oceania",
];

export default function Page() {
  const [sortBy, setSortBy] = useState<"population" | "area" | "name">(
    "population"
  );
  const [checkboxFilters, setCheckboxFilters] = useState<string[]>([]);
  const [regionFilter, setRegionFilter] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  function handleRegionFilterClick(newRegion: string) {
    setRegionFilter((prevFilter) => {
      if (prevFilter.includes(newRegion)) {
        return prevFilter.filter((regions) => regions !== newRegion);
      }

      return [...prevFilter, newRegion];
    });
  }

  const rowsPerPage = 10;
  const [fetchedCountries, setFetchedCountries] = useState<CountriesType[]>([]);

  useEffect(() => {
    fetchCountries()
      .then((data) => {
        setFetchedCountries(data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const pages = Math.ceil(fetchedCountries.length / rowsPerPage);

  const paginatedCountries = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return fetchedCountries.slice(start, end);
  }, [page, fetchedCountries]);

  return (
    <div className=" px-2 py-4 w-[95%] mx-auto rounded-lg space-y-8 shadow-xl shadow-black h-full my-4">
      <div className="flex flex-col gap-y-4">
        <p>Found X countries</p>

        <div className="flex w-full bg-[#282B30] p-2 rounded-lg justify-center">
          <button>
            <Image src={searchSVG} alt="search icon" />
          </button>
          <input
            type="text"
            placeholder="Search by Name, Region..."
            className="px-2 rounded w-full bg-transparent outline-none placeholder:text-white placeholder:text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-7">
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-3">
            <p className="text-xs">Sort by</p>
            <SelectComponent setSortBy={setSortBy} sortBy={sortBy} />
          </div>

          <div className="flex flex-col gap-y-2 ">
            <p className="text-xs">Region</p>
            <div className="flex flex-wrap gap-x-4   ">
              {regions.map((region) => (
                <span
                  key={region}
                  className={`px-3 py-1 hover:cursor-pointer transition-all rounded-xl ${cc(
                    regionFilter.includes(region) && "bg-[#292B30]"
                  )}`}
                  onClick={() => handleRegionFilterClick(region)}
                >
                  {region}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <p className="text-xs">Status</p>
            <CheckBoxComponent
              selected={checkboxFilters}
              setSelected={setCheckboxFilters}
            />
          </div>
        </div>

        <TableComponent
          page={page}
          pages={pages}
          paginatedCountries={paginatedCountries}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
