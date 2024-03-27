import { useState } from "react";
import Dropdown from "./components/Dropdown";
import Map from "./components/Map";
import RouteInformation from "./components/RouteInformation";
import axios from "axios";
import type { Ship } from "./api/Ship";
import type { Destination } from "./api/Destination";
import type { RouteTextInfo } from "./api/RouteTextInfo";
import { useQuery } from "@tanstack/react-query";
import { DNA } from "react-loader-spinner";

function App() {
  const [shipSelection, setShipSelection] = useState<Ship | null>(null);
  const [destination, setDestination] = useState<Destination | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<number[][]>([]);
  const [routeTextInfo, setRouteTextInfo] = useState<RouteTextInfo | {}>({});
  const [error, setError] = useState<false | true>(false);

  const fetchOptions = async (protocol: string, url: string, postData = {}) => {
    try {
      let data;

      if (protocol === "GET") {
        await new Promise((resolve) => {
          setTimeout(resolve, 2000);
        });
        data = await axios.get(url);
      } else if (protocol === "POST") {
        data = await axios.post(url, postData);
      }

      if (!data) {
        throw new Error("no data returned");
      }

      return data.data;
    } catch (error) {
      setError(true);
    }
  };

  const { data: dbOptions, isLoading } = useQuery({
    queryKey: ["dbOptions"],
    queryFn: () => fetchOptions("GET", "http://localhost:3000/dataOptions"),
  });

  const handleShipSelection = (ship: Ship) => {
    setShipSelection(ship);
    setRouteCoordinates([]);
  };

  const handleDestination = (destination: Destination) => {
    setDestination(destination);
    setRouteCoordinates([]);
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

      const { route, routeInfo } = await fetchOptions(
        "POST",
        "http://localhost:3000/getRoute",
        coordinates
      );

      setRouteCoordinates(route);
      setRouteTextInfo(routeInfo);
    } catch (err) {
      setError(true);
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
          Vessel routing is a routing tool that enables users to select a ship
          and a destination port and find the optimal sea route. When locations
          are selected in the below dropdown it will display your selection on
          the map along with the optimal sea route and estimated travel times
          between the selected locations.
          <div className="mt-3">
            Make your selection from the dropdown to get started:
          </div>
        </div>
        <div className="flex flex-col items-center">
          {isLoading && (
            <DNA
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          )}
          {error && <p>We are experiencing some difficulties</p>}
          {!error && !isLoading && (
            <div>
              <div className="flex">
                <Dropdown
                  value={shipSelection}
                  options={dbOptions?.vessels || []}
                  handleSelect={handleShipSelection}
                  placeHolder={"Select A Vessel..."}
                />
                <Dropdown
                  value={destination}
                  options={dbOptions?.ports || []}
                  handleSelect={handleDestination}
                  placeHolder={"Select A Port..."}
                />
              </div>
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
          )}
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

//Todos:
//Can fetch be done more elegantly ? combined ? usequery for both ? or fine as is ?
//Animate Path
//"Cards" in routeInformation could be reusable components
//TS on backend
