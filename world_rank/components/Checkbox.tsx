"use client";
import React from "react";
import { CheckboxGroup, Checkbox } from "@heroui/react";

const checkboxFilters = [
  {
    key: "unMember",
    value: "Member of the United Nations",
  },
  {
    key: "independent",
    value: "Independent",
  },
];

type CheckBoxComponentTypes = {
  selected: ("unMember" | "independent")[];
  setSelected: (selectedCheckboxes: ("unMember" | "independent")[]) => void;
};

export default function CheckBoxComponent({
  selected,
  setSelected,
}: CheckBoxComponentTypes) {
  return (
    <div className="flex flex-col gap-3">
      <CheckboxGroup
        color="primary"
        onValueChange={(value) =>
          setSelected(value as ("unMember" | "independent")[])
        }
        value={selected}
      >
        {checkboxFilters.map((checkboxFilter) => (
          <Checkbox key={checkboxFilter.key} value={checkboxFilter.key}>
            {checkboxFilter.value}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
}
