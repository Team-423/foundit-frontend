// single dropdown

"use client";

import { useState } from "react";

type DropdownProps = {
  options: string[];
  label: string;
  onSelectAction: (selected: string) => void;
};
export default function Dropdown({
  options,
  label,
  onSelectAction,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(label);

  const toggleDropdown = () => {
    setIsOpen((currentState) => !currentState);
  };

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelectAction) onSelectAction(option);
  };

  return (
    <div className="flex justify-center">
      <div className="relative">
        <button
          type="button"
          className="border rounded px-3 py-1 bg-white text-black w-35"
          onClick={toggleDropdown}
        >
          {selected}
        </button>

        {isOpen && (
          <div className="absolute mt-1 w-full rounded bg-gray-100 shadow z-10">
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                className="block w-full text-left px-3 py-1 text-black hover:bg-gray-300"
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
