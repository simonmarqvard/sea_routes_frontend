import { useState, useEffect } from "react";
import Dropdown from "./components/Dropdown";
import Map from "./components/Map";
import RouteInformation from "./components/RouteInformation";
import axios from "axios";
import type { Ship } from "./api/Ship";
import type { Destination } from "./api/Destination";
import type { RouteTextInfo } from "./api/RouteTextInfo";

function App() {
  const [shipSelection, setShipSelection] = useState<Ship | null>(null);
  const [destination, setDestination] = useState<Destination | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<number[][]>([]);
  const [routeTextInfo, setRouteTextInfo] = useState<RouteTextInfo | {}>({});
  const [ports, setPorts] = useState<Destination[]>([]);
  const [vessels, setVessels] = useState<Ship[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchDbOptions = await axios.get(
          "http://localhost:3000/dataOptions"
        );

        const { ports, vessels } = fetchDbOptions.data;
        setPorts(ports);
        setVessels(vessels);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      }
    };
    fetchData();
  }, []);

  const handleShipSelection = (ship: Ship) => {
    setShipSelection(ship);
  };

  const handleDestination = (destination: Destination) => {
    setDestination(destination);
  };

  const fetchData = async () => {
    if (!shipSelection || !destination) {
      return;
    }

    try {
      const coordinates = {
        ship: {
          lat: shipSelection.latitude,
          lng: shipSelection.longitude,
        },
        port: {
          lat: destination.latitude,
          lng: destination.longitude,
        },
      };

      const { data } = await axios.post(
        "http://localhost:3000/getRoute",
        coordinates
      );

      setRouteCoordinates(data.route);
      setRouteTextInfo(data.routeInfo);
    } catch (err) {
      setError(err);
    }
  };

  const disabled = !shipSelection || !destination;

  return (
    <div className="flex flex-col grid grid-cols-12">
      <div className="col-span-5 border">
        <div className="flex justify-center">
          <div className="p-2 mt-6 text-2xl">Vessel Routing</div>
        </div>
        <div className="p-4 m-4">
          Vessel routing is a routing tool that enables a user to select a ship
          and a destination port and find the optimal sea route. When locations
          are selected in the below dropdown it will display your selection on
          the map along with the optimal sea route between the selected
          locations.
          <div className="mt-3">
            Make your selection from the dropdown to get started:
          </div>
        </div>
        <div className="flex flex-col items-center">
          {!error ? (
            <div className="flex">
              <Dropdown
                value={shipSelection}
                options={vessels}
                handleSelect={handleShipSelection}
                placeHolder={"Select A Vessel..."}
              />
              <Dropdown
                value={destination}
                options={ports}
                handleSelect={handleDestination}
                placeHolder={"Select A Port..."}
              />
            </div>
          ) : (
            <p>We are experiencing some difficulties</p>
          )}
          <div>
            <button
              className={`bg-blue-400 p-3 m-2 border w-80 border-green-700 hover:bg-blue-600 shadow-sm ${
                disabled && "opacity-50 cursor-not-allowed"
              }`}
              onClick={fetchData}
              disabled={disabled}
            >
              Request route
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-7 h-screen	">
        <Map
          routeCoordinates={routeCoordinates}
          shipSelection={shipSelection}
          destination={destination}
        />
        <RouteInformation
          routeTextInfo={routeTextInfo}
          shipSelection={shipSelection}
          destination={destination}
        />
      </div>
    </div>
  );
}

export default App;
