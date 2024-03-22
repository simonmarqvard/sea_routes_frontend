import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import type { Ship } from "../api/Ship";
import type { Destination } from "../api/Destination";

interface RouteCoordinates {
  routeCoordinates: number[][];
  shipSelection: Ship | null;
  destination: Destination | null;
}

const Map = ({
  routeCoordinates,
  shipSelection,
  destination,
}: RouteCoordinates) => {
  const latLng: number[][] = routeCoordinates.map((coord) => [
    coord[1],
    coord[0],
  ]);

  //set central africa to center
  const location: number[] = [15.446105, 18.7350005];

  return (
    <MapContainer
      center={[location[0], location[1]]}
      zoom={1.5}
      style={{ height: "400px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline positions={latLng} />
      {shipSelection && (
        <Marker position={[shipSelection.latitude, shipSelection.longitude]}>
          <Popup>{`${shipSelection.name}, ${shipSelection.latitude}, ${shipSelection.longitude}`}</Popup>
        </Marker>
      )}
      {destination && (
        <Marker position={[destination.latitude, destination.longitude]}>
          <Popup>{`${destination.name}, ${destination.latitude}, ${destination.longitude}`}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;
