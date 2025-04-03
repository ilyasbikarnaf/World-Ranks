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
  countries: any;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setCountries: Dispatch<SetStateAction<string[]>>;
};

const CountriesContext = createContext<null | CountriesContextProps>(null);

export function CountriesContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [countries, setCountries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <CountriesContext.Provider
      value={{ setIsLoading, isLoading, countries, setCountries }}
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
