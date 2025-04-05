"use client";
import searchSVG from "@/assets/Search.svg";
import Image from "next/image";
import SelectComponent from "@/components/Dropbox";
import { useEffect, useMemo, useState } from "react";
import cc from "@/utils/cc";
import CheckBoxComponent from "@/components/Checkbox";
import TableComponent from "@/components/Table";
import fetchCountries from "@/utils/fetchCountries";
import filterCountries from "@/utils/filterCountries";
import sortCountries from "@/utils/sortCountries";
import { useCountriesContext } from "@/context/CountriesContext";

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
  const [checkboxFilters, setCheckboxFilters] = useState<
    ("unMember" | "independent")[]
  >([]);

  const [regionFilter, setRegionFilter] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  function handleRegionFilterClick(newRegion: string) {
    setRegionFilter((prevFilter) => {
      if (prevFilter.includes(newRegion)) {
        return prevFilter.filter((regions) => regions !== newRegion);
      }

      return [...prevFilter, newRegion];
    });
  }

  const rowsPerPage = 10;
  const { fetchedCountries, setFetchedCountries, setIsLoading, setIsError } =
    useCountriesContext();

  useEffect(() => {
    const fetchData = async () => {
      if (fetchedCountries.length > 0) {
        return;
      }

      try {
        setIsLoading(true);
        setIsError("");
        const data = await fetchCountries();
        setFetchedCountries(data);
      } catch (err) {
        setIsError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setFetchedCountries, setIsLoading, fetchedCountries, setIsError]);

  const filteredCountries = useMemo(() => {
    return filterCountries(
      fetchedCountries,
      searchInput,
      regionFilter,
      checkboxFilters
    );
  }, [searchInput, regionFilter, fetchedCountries, checkboxFilters]);

  const sortedCountries = useMemo(() => {
    if (filteredCountries.length > 0) {
      return sortCountries(filteredCountries, sortBy);
    }

    return filteredCountries;
  }, [sortBy, filteredCountries]);

  const paginatedCountries = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedCountries.slice(start, end);
  }, [page, sortedCountries]);

  const pages = useMemo(
    () => Math.ceil(sortedCountries.length / rowsPerPage),
    [sortedCountries]
  );

  useEffect(() => {
    if (page > pages) {
      setPage(1);
    }
  }, [pages, page]);

  return (
    <div className="inset-shadow-2xs z-10 mx-auto my-4 -mt-24 h-full w-[95%] space-y-8 rounded-xl bg-[#1C1D1F] p-4 shadow shadow-black sm:-mt-20 sm:h-[900px] sm:p-5">
      <div className="flex flex-col gap-y-4 sm:flex-row sm:justify-between">
        <p className="sm:self-center">
          Found {sortedCountries.length} countries
        </p>

        <div className="flex w-full justify-center rounded-lg bg-[#282B30] p-2 sm:w-1/2 sm:items-center">
          <button>
            <Image src={searchSVG} alt="search icon" />
          </button>
          <input
            type="text"
            value={searchInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchInput(e.target.value)
            }
            placeholder="Search by Name"
            className="w-full rounded bg-transparent px-2 outline-none placeholder:text-sm placeholder:text-white"
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-7 sm:flex-row sm:gap-2">
        <div className="flex flex-col gap-y-6">
          <div className="flex h-24 flex-col gap-y-3">
            <p className="text-xs">Sort by</p>
            <SelectComponent setSortBy={setSortBy} sortBy={sortBy} />
          </div>

          <div className="flex flex-col gap-y-2">
            <p className="text-xs">Region</p>
            <div className="flex flex-wrap gap-3">
              {regions.map((region) => (
                <span
                  key={region}
                  className={`px-3 py-1 hover:cursor-pointer transition-all rounded-xl text-lg ${cc(
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
