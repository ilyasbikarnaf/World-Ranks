"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { createContext } from "react";

type CountriesContextProps = {
  isLoading: boolean;
  fetchedCountries: any;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setFetchedCountries: Dispatch<SetStateAction<string[]>>;
};

const CountriesContext = createContext<null | CountriesContextProps>(null);

export function CountriesContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [fetchedCountries, setFetchedCountries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <CountriesContext.Provider
      value={{ setIsLoading, isLoading, fetchedCountries, setFetchedCountries }}
    >
      {children}
    </CountriesContext.Provider>
  );
}

export function useCountriesContext() {
  const value = useContext(CountriesContext);

  if (!value) {
    throw new Error("This hook must be used inside a CountriesContextProvider");
  }

  return value;
}
