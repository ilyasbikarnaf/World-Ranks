import { CountriesType } from "./fetchCountries";

export default function filterCountries(
  countries: CountriesType[],
  searchInput: string,
  regionFilter: string[],
  checkboxFilters: ("unMember" | "independent")[]
) {
  return countries.filter((country) => {
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
}
