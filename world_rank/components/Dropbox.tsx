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
      aria-label="Sort Options"
      selectedKeys={[sortBy]}
      onSelectionChange={(keys) => {
        const selectedKey = Array.from(keys)[0] as
          | "population"
          | "area"
          | "name";
        setSortBy(selectedKey);
      }}
    >
      {sortingOptions.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
}
