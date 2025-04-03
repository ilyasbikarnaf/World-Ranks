"use client";
import searchSVG from "@/assets/Search.svg";
import Image from "next/image";
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

  const rowsPerPage = 20;
  const [fetchedCountries, setFetchedCountries] = useState<CountriesType[]>([]);

  useEffect(() => {
    fetchCountries()
      .then((data) => {
        setFetchedCountries(data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const filteredCountries = useMemo(() => {
    return fetchedCountries.filter((country) => {
      const matchesSearch =
        searchInput == "" ||
        country.name.toLowerCase().includes(searchInput.toLowerCase());

      const matchesRegion =
        regionFilter.length === 0 || regionFilter.includes(country.region);

      const matchedCheckbox =
        checkboxFilters.length === 0 ||
        checkboxFilters.some((checkbox) => {
          if (country[checkbox] == true) {
            return true;
          }
        });

      return matchesSearch && matchesRegion && matchedCheckbox;
    });
  }, [searchInput, regionFilter, fetchedCountries, checkboxFilters]);

  const sortedCountries = useMemo(() => {
    if (filteredCountries.length > 0) {
      return [...filteredCountries].sort((countryA, countryB) => {
        if (sortBy === "area") {
          return countryB.area - countryA.area;
        } else if (sortBy === "population") {
          return countryB.population - countryA.population;
        } else if (sortBy === "name") {
          return countryA.name.localeCompare(countryB.name);
        }
        return 0;
      });
    }

    return filteredCountries;
  }, [sortBy, filteredCountries]);

  const paginatedCountries = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedCountries.slice(start, end);
  }, [page, sortedCountries]);

  const pages = Math.ceil(sortedCountries.length / rowsPerPage);

  useEffect(() => {
    if (page > pages) {
      setPage(1);
    }
  }, [pages, page]);

  return (
    <div className="inset-shadow-2xs mx-auto my-4 h-full w-[95%] space-y-8 rounded-xl p-4 shadow-xl shadow-black">
      <div className="flex flex-col gap-y-4">
        <p>Found {sortedCountries.length} countries</p>

        <div className="flex w-full justify-center rounded-lg bg-[#282B30] p-2">
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

      <div className="flex flex-col gap-y-7">
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
