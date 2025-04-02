"use client";
import searchSVG from "@/assets/Search.svg";
import Image from "next/image";
import { Select, SelectSection, SelectItem } from "@heroui/select";
import SelectComponent from "@/components/Dropbox";
import { useState } from "react";

export default function Page() {
  const [sortBy, setSortBy] = useState<"population" | "area" | "name">(
    "population"
  );

  return (
    <div className=" px-2 py-4 w-[95%] mx-auto rounded-lg space-y-3 shadow-xl shadow-black">
      <div className="flex flex-col gap-y-4">
        <p>Found X countries</p>

        <div className="flex w-full bg-[#282B30] p-2 rounded-lg justify-center">
          <button>
            <Image src={searchSVG} alt="search icon" />
          </button>
          <input
            type="text"
            placeholder="Search by Name, Region..."
            className="px-2 rounded w-full bg-transparent outline-none"
          />
        </div>
      </div>

      <div>
        <div>
          <div>
            <p>Sort by</p>
            <SelectComponent setSortBy={setSortBy} sortBy={sortBy} />
          </div>

          <div>
            <p>region</p>
            <div>
              <span>amercas</span>
              <span>amercas</span>
              <span>amercas</span>
              <span>amercas</span>
              <span>amercas</span>
            </div>
          </div>

          <div>
            status
            <div>cecklist shite cecklist shite</div>
          </div>
        </div>

        <div>table</div>
      </div>
    </div>
  );
}
