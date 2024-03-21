import { format, parse } from "date-fns";

const RouteInformation = ({ routeTextInfo }) => {
  const { departure, arrival, duration, distance } = routeTextInfo;

  // fix display of these

  return (
    <div className="bg-blue-300">
      Select a Vessel and a Port from the dropdown to get more information
    </div>
  );
};

export default RouteInformation;
