import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

const Map = ({ routeCoordinates }) => {
  const latLng = routeCoordinates.map((coord) => [coord[1], coord[0]]);
  let location = [55.676098, 12.568337];

  return (
    <MapContainer center={location} zoom={2} style={{ height: "400px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline positions={latLng} />
    </MapContainer>
  );
};

export default Map;
