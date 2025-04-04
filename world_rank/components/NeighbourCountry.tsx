"use client";
import Image from "next/image";
import Link from "next/link";

export default function NeighbourCountry({ common, svg, cca2 }) {
  return (
    <Link href={cca2}>
      <div className="flex flex-col justify-center">
        <figure className="mx-auto h-auto">
          <Image
            alt={`${common} flag`}
            src={svg}
            width={100}
            height={100}
            className="rounded"
          />
        </figure>
        <p className="text-center text-sm">{common}</p>
      </div>
    </Link>
  );
}
