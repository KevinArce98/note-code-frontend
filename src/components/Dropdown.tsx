import { useState } from 'react';

interface DropdownProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export const Dropdown = ({ value, onChange, options }: DropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center rounded-3xl bg-gray px-3 py-1 text-sm text-charcoal gap-2"
        onClick={() => setOpen(!open)}
      >
        {value}
        <img
          src="/images/down-arrow.svg"
          alt="arrow dropdown"
          className={`transition-all duration-300 ${open ? '-rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul className="absolute bottom-10 mt-2 max-h-80 w-40 overflow-y-auto rounded-xl bg-white text-sm shadow-lg">
          {options.map((option, index) => (
            <li
              key={index}
              className={`cursor-pointer px-4 py-2 capitalize hover:bg-gray ${value === option ? 'cursor-default bg-gray' : 'bg-white'}`}
              onClick={() => {
                if (value === option) return;
                setOpen(false);
                onChange(option);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
