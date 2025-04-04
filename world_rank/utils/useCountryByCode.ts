import { useCountriesContext } from "@/context/CountriesContext";

export function useCountryByCode(countryCode: string) {
  const { fetchedCountries } = useCountriesContext();
  return fetchedCountries.find((country) => country.cca2 === countryCode);
}
