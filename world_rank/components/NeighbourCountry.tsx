import Image from "next/image";

export default function NeighbourCountry({ common, svg }) {
  return (
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
  );
}
