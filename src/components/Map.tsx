import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = () => {
  const location = [55.676098, 12.568337];
  return (
    <MapContainer center={location} zoom={13} style={{ height: "400px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>Note: Pop data can be added here</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
