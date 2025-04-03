export type CountriesType = {
  area: number;
  ccn3: string;
  flag: string;
  name: string;
  population: number;
  region: string;
  unMember: boolean;
  independent: boolean;
};

export default async function fetchCountries(): Promise<CountriesType[]> {
  const res = await fetch("https://restcountries.com/v3.1/all");

  if (!res.ok) throw new Error("failed to fetch data");

  const data = await res.json();

  return data.map((country: any) => {
    return {
      area: country.area,
      ccn3: country.ccn3,
      flag: country.flag,
      name: country.name.common,
      population: country.population,
      region: country.region,
      unMember: country.unMember,
      independent: country.independent,
    };
  });
}
