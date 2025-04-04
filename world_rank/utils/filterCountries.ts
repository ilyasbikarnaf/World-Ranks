export default function filterCountries(
  countries: any,
  searchInput: string,
  regionFilter: string[],
  checkboxFilters: ("unMember" | "independent")[]
) {
  return countries.filter((country) => {
    const matchesSearch =
      searchInput == "" ||
      country.name.common.toLowerCase().includes(searchInput.toLowerCase());

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
