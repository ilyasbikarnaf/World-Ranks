import { CountriesType } from "./fetchCountries";

export default function sortCountries(
  countries: CountriesType[],
  sortBy: "population" | "area" | "name"
) {
  return [...countries].sort((countryA, countryB) => {
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
