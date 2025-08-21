"use client";

import { useEffect, useState } from "react";

export const useFormEffects = () => {};

// Custom Select Component (for the filter)
export const CustomSelect = ({ options, defaultValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    defaultValue || options[0]?.value
  );
  const [selectedLabel, setSelectedLabel] = useState(
    defaultValue || options[0]?.label
  );

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value, label) => {
    setSelectedValue(value);
    setSelectedLabel(label);
    setIsOpen(false);
    if (onChange) onChange(value);
  };

  return (
    <div className="select">
      <div
        className={`select-styled ${isOpen ? "active" : ""}`}
        onClick={toggleSelect}
      >
        {selectedLabel}
      </div>
      {isOpen && (
        <ul className="select-options">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value, option.label)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
