// single dropdown

"use client";

interface Option {
  id: string;
  name: string;
}

type DropdownProps = {
  options: Option[];
  label: string;
  onSelectAction: (selected: Option) => void;
  selected?: Option
  isOpen: boolean;
  onToggle: () => void;
};

export default function Dropdown({
  options,
  label,
  onSelectAction,
  isOpen,
  onToggle,
}: DropdownProps) {
  const [selected, setSelected] = useState<string>(label);

  const handleSelect = (option: Option) => {
  selected,
  isOpen,
  onToggle,
}: DropdownProps) {
  const handleSelect = (option: Option) => {
    onSelectAction(option);
    onToggle();
  };

  const displayText = selected?.name || label;

  return (
    <div className="flex justify-center">
      <div className="relative">
        <button
          type="button"
          className="min-w-[150px] px-4 py-2 rounded-lg bg-white text-[#1e6091] border-2 border-[#168aad] hover:bg-[#f0f8ff] transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#1e6091] focus:ring-opacity-50 font-medium"
          onClick={onToggle}
        >
          {displayText}
        </button>

        {isOpen && (
          <div className="absolute mt-2 w-full rounded-lg bg-white shadow-xl z-10 max-h-60 overflow-y-auto border border-[#168aad]">
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                className="block w-full text-left px-4 py-2 text-[#1e6091] hover:bg-[#f0f8ff] transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                onClick={() => handleSelect(option)}
              >
                {option.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
