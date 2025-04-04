export default function sortCountries(
  countries: any,
  sortBy: "population" | "area" | "name"
) {
  return [...countries].sort((countryA, countryB) => {
    if (sortBy === "area") {
      return countryB.area - countryA.area;
    } else if (sortBy === "population") {
      return countryB.population - countryA.population;
    } else if (sortBy === "name") {
      return countryA.name.common.localeCompare(countryB.name.common);
    }
    return 0;
  });
}
