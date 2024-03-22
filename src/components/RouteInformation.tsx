import prettyMilliseconds from "pretty-ms";

const RouteInformation = ({ routeTextInfo, shipSelection, destination }) => {
  const { duration } = routeTextInfo;

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
