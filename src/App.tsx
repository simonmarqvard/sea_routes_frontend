import dbData from "./DB";
import { useState } from "react";
import Dropdown from "./components/Dropdown";
import Map from "./components/Map";

function App() {
  const [shipSelection, setShipSelection] = useState(null);
  const [destination, setDestination] = useState(null);

  const handleShipSelection = (ship) => {
    setShipSelection(ship);
    console.log(ship);
  };

  const handleDestination = (destination) => {
    setDestination(destination);
    console.log(destination);
  };

  return (
    <div className="flex flex-col grid grid-cols-12">
      <div className="col-span-5">
        <div className="flex">
          <Dropdown
            value={shipSelection}
            options={dbData.vessels}
            handleSelect={handleShipSelection}
          />
          <Dropdown
            value={destination}
            options={dbData.ports}
            handleSelect={handleDestination}
          />
        </div>
        <button>Request route</button>
      </div>
      <div className="col-span-7 h-screen	">
        <Map />
      </div>
    </div>
  );
}

export default App;
