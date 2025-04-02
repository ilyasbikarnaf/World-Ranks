"use client";
import React from "react";
import { CheckboxGroup, Checkbox } from "@heroui/react";

const checkboxFilters = [
  {
    key: "unMember",
    value: "Member of the United Nations",
  },
  {
    key: "independant",
    value: "Independant",
  },
];

type CheckBoxComponentTypes = {
  selected: string[];
  setSelected: (selectedCheckboxes: string[]) => void;
};

export default function CheckBoxComponent({
  selected,
  setSelected,
}: CheckBoxComponentTypes) {
  return (
    <div className="flex flex-col gap-3">
      <CheckboxGroup
        color="primary"
        onValueChange={setSelected}
        value={selected}
      >
        {checkboxFilters.map((checkboxFilter) => (
          <Checkbox key={checkboxFilter.key} value={checkboxFilter.value}>
            {checkboxFilter.value}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
}
