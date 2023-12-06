import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Polygon, Marker, Popup } from "react-leaflet";
import { seoul_gu2 } from "./data/seoul_municipalities_geo_simple_nowon";
import hos_nowon from "./data/hos_nowon_info_.json";

const center = [37.64204, 127.075711];

function GetIcon(_iconSize) {
  return L.icon({
    iconUrl: require("./data/hospin.png"),
    iconSize: [_iconSize],
  });
}
const Maps = () => {
  return (
    //minzoom을 주어 더 넓게 줌이 되도록 방지했습니다.
    <MapContainer
      center={center}
      zoom={13}
      minZoom={13}
      style={{ display: "flex", flexDirection: "row" }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=Qw6XogZhQmbzCfPnpqjm"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      {hos_nowon.map((v, idx) => (
        <Marker
          position={[v.lat + 0.001, v.lon + 0.003]}
          key={idx}
          icon={GetIcon(30)}
        >
          <Popup>
            <h3>
              <b> {v.name} </b>
              <br />
            </h3>
            <br /> <b> {"진료 과목 : " + v.index} </b>
            <hr />
            <b> {"의료인 수 : " + v.dec + "명"} </b>
            <br />
            <b> {"병실 : " + v.bed + "개"} </b>
            <br />
            <b>{"주소 : " + v.address}</b> <br />
            <b> {"전화번호 : " + v.phone} </b>
          </Popup>
        </Marker>
      ))}

      {seoul_gu2.features.map((gu) => {
        const coordinates = gu.geometry.coordinates[0].map((item) => [
          item[1] + 0.0028,
          item[0] - 0.0025,
        ]);

        return (
          <Polygon
            pathOptions={{
              fillColor: "#green",
              fillOpacity: 0.1,
              weight: 3,
              opacity: 0.7,
              dashArray: 2,
              color: "green",
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.2,
                  weight: 4,
                  dashArray: 3,
                  color: "green",
                  fillColor: "pink",
                });
              },
              // 위와 동일하게 설정하여 over시 바뀌었던 걸 수정
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillColor: "green",
                  fillOpacity: 0.1,
                  weight: 3,
                  opacity: 0.7,
                  dashArray: 2,
                  color: "green",
                });
              },
            }}
          />
        );
      })}
    </MapContainer>
  );
};

export default Maps;
