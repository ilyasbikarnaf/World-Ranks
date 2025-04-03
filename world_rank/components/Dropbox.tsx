import { Select, SelectItem } from "@heroui/react";

export const sortingOptions = [
  { key: "name", label: "Name" },
  { key: "population", label: "Population" },
  { key: "area", label: "Area" },
];

type SelectComponentProps = {
  setSortBy: (value: "population" | "area" | "name") => void;
  sortBy: "population" | "area" | "name";
};

export default function SelectComponent({
  setSortBy,
  sortBy,
}: SelectComponentProps) {
  return (
    <Select
      color="default"
      items={sortingOptions}
      className="max-h-full"
      aria-label="Sort Options"
      selectedKeys={[sortBy]}
      onSelectionChange={(keys) => {
        // trasform keys from set to array and get the first item which represent the value we want
        const selectedKey = Array.from(keys)[0] as
          | "population"
          | "area"
          | "name";

        setSortBy(selectedKey == undefined ? "population" : selectedKey);
      }}
    >
      {sortingOptions.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
}
