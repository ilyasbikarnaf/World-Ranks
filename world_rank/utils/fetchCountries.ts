export default async function fetchCountries() {
  const res = await fetch("https://restcountries.com/v3.1/all", {
    cache: "force-cache",
  });

  if (!res.ok) throw new Error("failed to fetch data");

  return res.json();
}
