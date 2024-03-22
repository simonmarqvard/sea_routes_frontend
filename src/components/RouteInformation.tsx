import prettyMilliseconds from "pretty-ms";
import type { RouteTextInfo } from "../api/RouteTextInfo";
import type { Ship } from "../api/Ship";
import type { Destination } from "../api/Destination";

interface RouteInformationProps {
  routeTextInfo: RouteTextInfo | {};
  shipSelection: Ship | null;
  destination: Destination | null;
}

const RouteInformation = ({
  routeTextInfo,
  shipSelection,
  destination,
}: RouteInformationProps) => {
  const { duration } = routeTextInfo as RouteTextInfo;

  const showShipInfo = shipSelection && (
    <div className="flex flex-col justify-center items-center p-2">
      <div>{`Position of ${shipSelection.name} is:`}</div>
      <div>
        {`lat: ${shipSelection.latitude} - lng: ${shipSelection.longitude}`}
      </div>
    </div>
  );

  // duplicated code could be reusable component
  const showDestinationInfo = destination && (
    <div className="flex flex-col justify-center items-center p-2">
      <div>{`Destination is ${destination.name}:`}</div>
      <div>
        {`lat: ${destination.latitude} - lng: ${destination.longitude}`}
      </div>
    </div>
  );

  const showDuration = duration && (
    <div className="flex justify-center items-center p-2">
      <div>{`Estimated travel time is ${prettyMilliseconds(duration)}`}</div>
    </div>
  );

  return (
    <div>
      <div>
        {showShipInfo}
        {showDestinationInfo}
        {showDuration}
      </div>
    </div>
  );
};

export default RouteInformation;
