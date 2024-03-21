import { useState, useEffect, useRef } from "react";

function Dropdown({ options, handleSelect, value }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const refEl = useRef();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const onSelect = (ship) => {
    handleSelect(ship);
    setIsOpen(false);
  };

  useEffect(() => {
    const handler = (event) => {
      if (!refEl.current) {
        return;
      }

      if (!refEl.current.contains(event.target)) {
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
    <div ref={refEl} className="w-48 relative">
      <div
        className="flex justify-between items-center 
        cursor-pointer border rounded p-3 shadow bg-white w-full"
        onClick={handleClick}
      >
        {value?.name || "Select..."}
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
