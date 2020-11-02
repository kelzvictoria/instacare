import * as React from "react";
import { options } from "./Options";

export const Select = () => {
  return (
    <select
      name=""
      className="form-control children-age"
      placeholder="Select Age"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
