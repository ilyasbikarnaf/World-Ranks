import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flag,population,area,ccn3,independent,unMember,region"
    );

    if (!res.ok) throw new Error("Failed to fetch data");

    const data = await res.json();

    const countries = data.map((country: any) => ({
      area: country.area,
      ccn3: country.ccn3,
      flag: country.flag,
      name: country.name.common,
      population: country.population,
      region: country.region,
      unMember: country.unMember,
    }));

    return NextResponse.json(countries);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
