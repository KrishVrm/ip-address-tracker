import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./main.css";

const MyMapComponent: React.FC<{ latitude: number; longitude: number }> = ({
  latitude,
  longitude,
}) => {
  const position = [latitude, longitude];

  function ChangeView({ center, zoom }) {
    animate: true;
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (
    <MapContainer
      className="map"
      center={position}
      zoom={13}
      scrollWheelZoom={true}
    >
      <ChangeView center={position} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}></Marker>
    </MapContainer>
  );
};

export default MyMapComponent;
