"use client";
import { useCountriesContext } from "@/context/CountriesContext";
import fetchCountries from "@/utils/fetchCountries";
import { useCountryByCode } from "@/utils/useCountryByCode";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
import backArrow from "@/assets/back_arrow.svg";
import Link from "next/link";
import NeighbourCountry from "@/components/NeighbourCountry";
import CountryLoading from "@/components/CountryLoading";

export default function Country() {
  const { countryCode }: { countryCode: string } = useParams();
  const { fetchedCountries, setFetchedCountries, isLoading, setIsLoading } =
    useCountriesContext();

  useLayoutEffect(() => {
    if (fetchedCountries.length === 0) {
      setIsLoading(true);
      fetchCountries()
        .then(setFetchedCountries)
        .catch((err) => alert(err.message))
        .finally(() => setIsLoading(false));
    }
  }, [fetchedCountries, setFetchedCountries, setIsLoading]);

  const country = useCountryByCode(countryCode);
  console.log();

  return (
    <>
      <div className="relative z-10 -mt-11 mb-6 flex h-full w-full flex-col gap-6 gap-y-5 bg-[#1C1D1F] sm:mx-auto sm:w-full sm:max-w-[800px] sm:rounded-xl sm:p-3 sm:shadow-lg">
        {/* isLoading || !country  */}
        {isLoading || !country ? (
          <CountryLoading />
        ) : (
          <>
            <Link href="/">
              <Image
                src={backArrow}
                alt="back arrow"
                className="absolute left-4 top-2"
                width={50}
              />
            </Link>
            <div className="-my-10 mb-1 flex flex-col items-center gap-y-5 sm:-mt-16">
              <figure className="h-auto w-44">
                <Image
                  src={`${country.flags.svg}`}
                  alt={`${country.name.common} flag`}
                  width={200}
                  height={300}
                  className="rounded"
                />
              </figure>
              <div className="text-center">
                <h2 className="text-2xl">{country.name.common}</h2>
                <p className="text-lg">{country.name.official}</p>
              </div>
            </div>

            <div className="flex justify-center gap-x-3 *:grid *:grid-cols-[auto,1fr] *:grid-rows-1 *:gap-x-2 *:divide-x-1 *:rounded-lg *:bg-[#282B30] *:px-4 *:py-2.5 sm:gap-x-9">
              <div className="*:justify-self-center">
                <p className="text-xs">population</p>
                <p className="pl-3 text-xs">
                  {country.population.toLocaleString()}
                </p>
              </div>

              <div className="">
                <p className="text-xs">
                  Area (km<sup>2</sup>)
                </p>
                <p className="pl-3 text-xs">{country.area.toLocaleString()}</p>
              </div>
            </div>

            <div className="*:flex *:h-16 *:items-center *:justify-between *:border-y-1 *:border-[#26292D] *:*:p-5">
              <div>
                <p>capital</p>
                <p>{country.capital[0]}</p>
              </div>

              <div>
                <p>Subregion</p>
                <p>{country.subregion}</p>
              </div>
              <div>
                <p>Language</p>
                <p>{Object.values(country.languages).join(", ")}</p>
              </div>
              <div>
                <p>Currencies</p>
                {/* @ts-expect-error name exists */}
                <p>{Object.values(country.currencies)[0].name}</p>
              </div>
              <div>
                <p>Continents</p>
                <p>{country.continents[0]}</p>
              </div>
            </div>

            {country.borders?.length > 0 && (
              <div className="flex flex-col gap-y-3 px-5">
                <p>Neighbouring Countries</p>
                <div className="flex flex-wrap gap-5">
                  {country.borders.map((neighbourCountryCode) => {
                    const {
                      flags: { svg },
                      name: { common },
                      cca2,
                    } = fetchedCountries.find(
                      (c) => c.cca3 === neighbourCountryCode
                    );
                    return (
                      <NeighbourCountry
                        key={neighbourCountryCode}
                        common={common}
                        svg={svg}
                        cca2={cca2}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
