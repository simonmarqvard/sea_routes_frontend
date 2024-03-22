import { useState, useEffect } from "react";
import Dropdown from "./components/Dropdown";
import Map from "./components/Map";
import RouteInformation from "./components/RouteInformation";
import axios from "axios";

function App() {
  const [shipSelection, setShipSelection] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [routeTextInfo, setRouteTextInfo] = useState({});
  const [ports, setPorts] = useState([]);
  const [vessels, setVessels] = useState([]);

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
      }
    };
    fetchData();
  }, []);

  const handleShipSelection = (ship) => {
    setShipSelection(ship);
    // console.log(ship);
  };

  const handleDestination = (destination) => {
    setDestination(destination);
    // console.log(destination);
  };

  const fetchData = async () => {
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
  };

  const disabled = !shipSelection || !destination;

  return (
    <div className="flex flex-col grid grid-cols-12">
      <div className="col-span-5 border">
        <div className="flex justify-center">
          <div className="p-2 mt-6 text-xl">Vessel Routing</div>
        </div>
        <div className="p-4 m-4">
          Det er en kendsgerning, at man bliver distraheret af læsbart indhold
          på en side, når man betragter dens layout. Meningen med at bruge Lorem
          Ipsum er, at teksten indeholder mere eller mindre almindelig
          tekstopbygning i modsætning til "Tekst her - og mere tekst her", mens
          det samtidigt ligner almindelig tekst. Mange layoutprogrammer og
          webdesignere bruger Lorem Ipsum som fyldtekst. En søgning på Lorem
          Ipsum afslører mange websider, som stadig er på udviklingsstadiet. Der
          har været et utal af variationer, som er opstået enten på grund af
          fejl og andre gange med vilje (som blandt andet et resultat af humor).
        </div>
        <div className="flex flex-col items-center">
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
