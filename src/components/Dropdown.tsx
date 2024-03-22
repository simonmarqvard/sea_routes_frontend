import { useState, useEffect, useRef } from "react";
import type { Ship } from "../api/Ship";
import type { Destination } from "../api/Destination";

interface DropdownProps {
  options: Destination[];
  handleSelect: (ship: Ship) => void;
  value: Ship | Destination | null;
  placeHolder: string;
}

function Dropdown({
  options,
  handleSelect,
  value,
  placeHolder,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const refEl = useRef<HTMLDivElement>(null);

  const handleClick = (): void => {
    setIsOpen(!isOpen);
  };

  const onSelect = (ship: Ship) => {
    handleSelect(ship);
    setIsOpen(false);
  };

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!refEl.current) {
        return;
      }

      if (!refEl.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const renderedOptions = options.map((ship) => {
    return (
      <div
        className="hover:bg-sky-100 rounded cursor-pointer p-1"
        onClick={() => onSelect(ship)}
        key={ship.name}
      >
        {ship.name}
      </div>
    );
  });

  return (
    <div ref={refEl} className="w-40 relative z-10">
      <div
        className="flex justify-center items-center 
        cursor-pointer border rounded p-3 shadow bg-white w-full"
        onClick={handleClick}
      >
        {value?.name || placeHolder}
      </div>
      {isOpen && (
        <div className="absolute top-full border rounded p-3 shadow bg-white w-full">
          {renderedOptions}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
